import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTCTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { RESULTGROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYTCTs {
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
                    const RYTCTsdata = Osemosys.getResultData(casename, "RYTCTs.json");
                    promise.push(RYTCTsdata);
                    return Promise.all(promise);
                } else {
                    let er = {
                        "message": 'There is no model selected!',
                        "status_code": "CaseError"
                    }
                    return Promise.reject(er);
                    // MessageSelect.init(RYTCTs.refreshPage.bind(RYTCTs));
                    // throw new Error('No Model selected');
                }
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTCTsdata, cases] = data;
                //if (RYTCTsdata[param]['CS_0'].length == 0) {
                if (RYTCTsdata[param][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTCTsdata, group, PARAMETERS, param, cases);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                if (error.status_code == 'CaseError') {
                    MessageSelect.init(RYTCTs.refreshPage.bind(RYTCTs));
                }
                else if (error.status_code == 'ActivityError') {
                    MessageSelect.activity(RYTCTs.refreshPage.bind(RYTCTs), error.casename);
                }
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();

        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], RESULTGROUPNAMES[model.group]);
        Html.ddlCases(model.cases, model.case);
        Html.ddlParams(model.PARAMETERS['RYTCTs'], model.param);
        Html.ddlTechsArray(model.techs)
        Html.ddlCommsArray(model.comms)

        // Html.ddlTechs(model.techs[model.param], model.techs[model.param][0]['TechId']);
        // Html.ddlComms(model.comms[model.param][model.techs[model.param][0]['TechId']], model.comms[model.param][model.techs[model.param][0]['TechId']][0]['CommId']);
        //Html.ddlMods($('#osy-mods1'), model.mods);

        let $divGrid = $('#osy-gridRYTCTs');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        let $divChart = $('#osy-chartRYTCTs');
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYTCTs", model.series);
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
                const RYTCTsdata = Osemosys.getResultData(casename, "RYTCTs.json");
                promise.push(RYTCTsdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTCTsdata] = data;
                //if (RYTCTsdata[PARAMETERS['RYTCTs'][0]['id']]['CS_0'].length == 0) {
                if (RYTCTsdata[PARAMETERS['RYTCTs'][0]['id']][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTCTsdata, 'RYTCTs', PARAMETERS, PARAMETERS['RYTCTs'][0]['id']);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                setTimeout(function () {
                    if (error.status_code == 'CaseError') {
                        MessageSelect.init(RYTCTs.refreshPage.bind(RYTCTs));
                    }
                    else if (error.status_code == 'ActivityError') {
                        MessageSelect.activity(RYTCTs.refreshPage.bind(RYTCTs), error.casename);
                    }
                    Message.warning(error.message);
                }, 500);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYTCTs');
        let $divChart = $('#osy-chartRYTCTs');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            RYTCTs.refreshPage(casename);
            Html.updateCasePicker(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            Message.clearMessages();
            if (model.RYTCTsdata[this.value]['CS_0'].length === 0) {
                MessageSelect.activity(RYTCTs.refreshPage.bind(RYTCTs), model.casename);
                //Message.warning(`There is no data definded for ${model.PARAMNAMES[this.value]} for Model ${model.casename}!`);
            } else {
                Html.title(model.casename, model.PARAMNAMES[this.value], RESULTGROUPNAMES[model.group]);
                model.param =  this.value;

                // model.srcGrid.root = this.value;
                model.srcGrid.localdata = model.gridData[this.value][model.case];
                $divGrid.jqxGrid('updatebounddata');
                

                //update za ddl coms i techs za IAR ili OAR
                // Html.ddlTechs(model.techs[this.value], model.techs[this.value][0]['TechId']);
                // Html.ddlComms(model.comms[this.value][model.techs[this.value][0]['TechId']], model.comms[this.value][model.techs[this.value][0]['TechId']][0]['CommId']);


                var configChart = $divChart.jqxChart('getInstance');
                // var tech = $("#osy-techs").val();
                // var comm = $("#osy-comms").val();
                // var mo = $("#osy-mods1").val();
                configChart.source.records = model.chartData[this.value][model.case][model.tech][model.comm];
                configChart.update();
                //$('#definition').html(`${DEF[model.group][model.param].definition}`);
            }
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            model.tech = this.value;
            var configChart = $divChart.jqxChart('getInstance');
            console.log(model.param,model.case,this.value,model.comm)
            configChart.source.records = model.chartData[model.param][model.case][this.value][model.comm];
            configChart.update();
        });

        $("#osy-comms").off('change');
        $('#osy-comms').on('change', function () {
            model.comm = this.value;
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][model.tech][this.value];
            configChart.update();
        });

        $("#osy-mods1").off('change');
        $('#osy-mods1').on('change', function () {
            var param = $("#osy-ryt").val();
            var tech = $("#osy-techs").val();
            var comm = $("#osy-comms").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][tech][comm][this.value];
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
            $divChart.jqxChart('saveAsPNG', 'RYTCTs.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").on('click', function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Tech');
                $divGrid.jqxGrid('autoresizecolumn', 'Comm');
                $divGrid.jqxGrid('autoresizecolumn', 'ModId');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").on('click', function (e) {
            e.preventDefault();
            $divGrid.jqxGrid('exportdata', 'xls', 'RYTCTs');
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