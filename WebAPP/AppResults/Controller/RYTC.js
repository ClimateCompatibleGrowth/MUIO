import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTC.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYTC {
    static onLoad(group, param) {
        Base.getSession()
            .then(response => {
                let casename = response['session'];
                if (casename) {
                    const promise = [];
                    promise.push(casename);
                    const genData = Osemosys.getData(casename, 'genData.json');
                    promise.push(genData);
                    const resData = Osemosys.getResultData(casename, 'resData.json');
                    promise.push(resData);
                    const PARAMETERS = Osemosys.getParamFile('ResultParameters.json');
                    promise.push(PARAMETERS);
                    const RYTCdata = Osemosys.getResultData(casename, "RYTC.json");
                    promise.push(RYTCdata);
                    return Promise.all(promise);
                } else {
                    let er = {
                        "message": 'There is no model selected!',
                        "status_code": "CaseError"
                    }
                    return Promise.reject(er);
                    // MessageSelect.init(RYTC.refreshPage.bind(RYTC));
                    // throw new Error('No model selected');
                }
            })
            .then(data => {
                
                let [casename, genData, resData, PARAMETERS, RYTCdata] = data;
                // console.log('RYTCdata ', RYTCdata)
                // console.log('resData ', resData)
                if (RYTCdata[param][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTCdata, group, PARAMETERS, param);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                if (error.status_code == 'CaseError') {
                    MessageSelect.init(RYTC.refreshPage.bind(RYTC));
                }
                else if (error.status_code == 'ActivityError') {
                    MessageSelect.activity(RYTC.refreshPage.bind(RYTC), error.casename);
                }
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        console.log('model ', model)
        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams(model.PARAMETERS['RYTC'], model.param);
        Html.ddlCases(model.cases, model.case);
        //Html.ddlTechs(model.techs[model.param][model.case], model.techs[model.param][model.case][model.tech]);
        Html.ddlTechsArray(model.techs[model.param][model.case])
        //Html.ddlComms(model.comms[model.param][model.techs[model.param][0]['Tech']], model.comms[model.param][model.techs[model.param][0]['Tech']][0]['Comm']);
        
        
        let $divGrid = $('#osy-gridRYTC');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true, true, false, false);

        let $divChart = $('#osy-chartRYTC');
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYTC", model.series);
    }

    static refreshPage(casename) {
        Base.setSession(casename)
            .then(response => {
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const resData = Osemosys.getResultData(casename, 'resData.json');
                promise.push(resData);
                const PARAMETERS = Osemosys.getParamFile('ResultParameters.json');
                promise.push(PARAMETERS);
                const RYTCdata = Osemosys.getResultData(casename, "RYTC.json");
                promise.push(RYTCdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTCdata] = data;
                if (RYTCdata[PARAMETERS['RYTC'][0]['id']][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTCdata, 'RYTC', PARAMETERS, PARAMETERS['RYTC'][0]['id']);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                setTimeout(function () {
                    if (error.status_code == 'CaseError') {
                        MessageSelect.init(RYTC.refreshPage.bind(RYTC));
                    }
                    else if (error.status_code == 'ActivityError') {
                        MessageSelect.activity(RYTC.refreshPage.bind(RYTC), error.casename);
                    }
                    Message.warning(error.message);
                }, 500);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYTC');
        let $divChart = $('#osy-chartRYTC');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            RYTC.refreshPage(casename);
            Html.updateCasePicker(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            Message.clearMessages();
            //console.log('model.RYTCdata ',model.RYTCdata[this.value])
            if (model.RYTCdata[this.value][model.case].length === 0) {
                MessageSelect.activity(RYTC.refreshPage.bind(RYTC), model.casename);
                Message.warning(`There is no data definded for ${model.PARAMNAMES[this.value]} for model ${model.casename}!`);
            } else {
                Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
                model.param = this.value;

                // model.srcGrid.root = this.value;
                model.srcGrid.localdata = model.gridData[this.value][model.case];
                $divGrid.jqxGrid('updatebounddata');
                
                Html.ddlTechsArray(model.techs[model.param][model.case])

                var configChart = $divChart.jqxChart('getInstance');
                var tech = $("#osy-techs").val();
                // var comm = $("#osy-comms").val();
                configChart.source.records = model.chartData[this.value][model.case][tech];
                configChart.update();
                // /$('#definition').html(`${DEF[model.group][model.param].definition}`);
            }
        });

        $('#osy-cases').on('change', function () {
            model.case = this.value;
            model.srcGrid.localdata = model.gridData[model.param][this.value];
            $divGrid.jqxGrid('updatebounddata');

            var tech = $("#osy-techs").val();
            var configChart = $divChart.jqxChart('getInstance');
            console.log(model.param,this.value,model.tech)
            configChart.source.records = model.chartData[model.param][this.value][model.tech];
            configChart.update();
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            model.tech = this.value;
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][this.value];
            configChart.update();
        });

        $(".switchChart").off('click');
        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $divChart.jqxChart('getInstance');
            var chartType = $(this).attr('data-chartType');
            configChart.seriesGroups[0].type = chartType;
            if (chartType == 'column') {
                configChart.seriesGroups[0].labels.angle = 90;
            } else {
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.update();
            // $('button a').switchClass( "green", "grey" );
            // $('#'+chartType).switchClass( "grey", "green" );
        });

        $(".toggleLabels").off('click');
        $(".toggleLabels").on('click', function (e) {
            e.preventDefault();
            var configChart = $divChart.jqxChart('getInstance');
            if (configChart.seriesGroups[0].type == 'column') {
                configChart.seriesGroups[0].labels.angle = 90;
            } else {
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();
        });

        $("#exportPng").off('click');
        $("#exportPng").on('click', function () {
            $("#osy-chartRYTC").jqxChart('saveAsPNG', 'RYTC.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").on('click', function () {
            if (res) {
                // $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Tech');
                $divGrid.jqxGrid('autoresizecolumn', 'Comm');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").on('click', function (e) {
            e.preventDefault();
            $("#osy-gridRYTC").jqxGrid('exportdata', 'xls', 'RYTC');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $divGrid.jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $divGrid.jqxGrid('refresh');
        });

        $("#showLog").off('click');
        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
            $('#definition').toggle('slow');
        });
    }
}