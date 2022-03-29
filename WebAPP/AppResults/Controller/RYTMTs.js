import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTMTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { RESULTGROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYTMTs {
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
                    const RYTMTsdata = Osemosys.getResultData(casename, "RYTMTs.json");
                    promise.push(RYTMTsdata);
                    return Promise.all(promise);
                } else {
                    let er = {
                        "message": 'There is no model selected!',
                        "status_code": "CaseError"
                    }
                    return Promise.reject(er);
                    // MessageSelect.init(RYTMTs.refreshPage.bind(RYTMTs));
                    // throw new Error('No Model selected');
                }
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTMTsdata, cases] = data;
                //if (RYTMTsdata[param]['CS_0'].length == 0) {
                if (RYTMTsdata[param][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTMTsdata, group, PARAMETERS, param, cases);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                if (error.status_code == 'CaseError') {
                    MessageSelect.init(RYTMTs.refreshPage.bind(RYTMTs));
                }
                else if (error.status_code == 'ActivityError') {
                    MessageSelect.activity(RYTMTs.refreshPage.bind(RYTMTs), error.casename);
                }
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();

        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], RESULTGROUPNAMES[model.group]);
        Html.ddlCases(model.cases, model.case);
        Html.ddlParams(model.PARAMETERS['RYTMTs'], model.param);

        Html.ddlTechs(model.techs, model.techs[0]['TechId']);
        // Html.ddlTechs(model.techs)
        // Html.ddlComms(model.comms)

        // Html.ddlTechs(model.techs[model.param], model.techs[model.param][0]['TechId']);
        // Html.ddlComms(model.comms[model.param][model.techs[model.param][0]['TechId']], model.comms[model.param][model.techs[model.param][0]['TechId']][0]['CommId']);
        Html.ddlMods($('#osy-mods1'), model.mods);

        let $divGrid = $('#osy-gridRYTMTs');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        let $divChart = $('#osy-chartRYTMTs');
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYTMTs", model.series);
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
                const RYTMTsdata = Osemosys.getResultData(casename, "RYTMTs.json");
                promise.push(RYTMTsdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTMTsdata] = data;
                //if (RYTMTsdata[PARAMETERS['RYTMTs'][0]['id']]['CS_0'].length == 0) {
                if (RYTMTsdata[PARAMETERS['RYTMTs'][0]['id']][resData['osy-cases'][0]['Case']].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, resData, RYTMTsdata, 'RYTMTs', PARAMETERS, PARAMETERS['RYTMTs'][0]['id']);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                setTimeout(function () {
                    if (error.status_code == 'CaseError') {
                        MessageSelect.init(RYTMTs.refreshPage.bind(RYTMTs));
                    }
                    else if (error.status_code == 'ActivityError') {
                        MessageSelect.activity(RYTMTs.refreshPage.bind(RYTMTs), error.casename);
                    }
                    Message.warning(error.message);
                }, 500);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYTMTs');
        let $divChart = $('#osy-chartRYTMTs');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            RYTMTs.refreshPage(casename);
            Html.updateCasePicker(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-cases").off('change');
        $('#osy-cases').on('change', function () {
            Message.clearMessages();

            model.case =  this.value;

            model.srcGrid.localdata = model.gridData[model.param][model.case];
            $divGrid.jqxGrid('updatebounddata');
            
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][model.tech][model.mod];
            configChart.update();
            //$('#definition').html(`${DEF[model.group][model.param].definition}`);
        
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            Message.clearMessages();

            Html.title(model.casename, model.PARAMNAMES[this.value], RESULTGROUPNAMES[model.group]);
            model.param =  this.value;
            model.srcGrid.localdata = model.gridData[this.value][model.case];
            $divGrid.jqxGrid('updatebounddata');
                
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value][model.case][model.tech][model.mod];
            configChart.update();
            //$('#definition').html(`${DEF[model.group][model.param].definition}`);
        
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            model.tech = model.techNames[this.value];
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][model.techNames[this.value]][model.mod];
            configChart.update();
        });

        $("#osy-mods1").off('change');
        $('#osy-mods1').on('change', function () {
            model.mod = this.value;
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][model.tech][this.value];
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
            $divChart.jqxChart('saveAsPNG', 'RYTMTs.png', 'https://www.jqwidgets.com/export_server/export.php');
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
            $divGrid.jqxGrid('exportdata', 'xls', 'RYTMTs');
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