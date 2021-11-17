import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RT.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"
// import { Sidebar } from "./Sidebar.js";

export default class RT {
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
                    const RTdata = Osemosys.getResultData(casename, 'RT.json');
                    promise.push(RTdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RT.refreshPage.bind(RT));
                }
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RTdata] = data;
                let model = new Model(casename, genData, resData, RTdata, group, PARAMETERS, param);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams(model.PARAMETERS[model.group], model.param);
        Html.ddlCases(model.cases, model.case);

        let $divGrid = $('#osy-gridRT');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true)

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRT');
        Chart.Chart($divChart, daChart, "RT", model.series, 'Tech');
        //pageSetUp();
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
                const RTdata = Osemosys.getResultData(casename, 'RT.json');
                promise.push(RTdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RTdata] = data;
                let model = new Model(casename, genData, resData, RTdata, 'RT', PARAMETERS, PARAMETERS['RT'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRT');
        let $divChart = $('#osy-chartRT');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RT.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function () {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            model.srcGrid.root = this.value;
            model.param = this.value;
            model.srcGrid.localdata = model.gridData[this.value][model.case];

            $divGrid.jqxGrid('updatebounddata');
            $.each(model.techs, function (idT, tech) {
                $divGrid.jqxGrid('setcolumnproperty', tech.TechId, 'text', tech.Tech + ' <small style="color:darkgrey">[ ' + model.techUnit[this.value][tech.TechId] + ' ]</small>');
            });
            

            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
        });

                //change of ddl techs
        $('#osy-cases').on('change', function () {
            model.case = this.value;
            model.srcGrid.localdata = model.gridData[model.param][this.value];
            $divGrid.jqxGrid('updatebounddata');

            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][this.value];
            configChart.update();
        });

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
        });

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

        $("#exportPng").click(function () {
            $divChart.jqxChart('saveAsPNG', 'RT.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").click(function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc', "cells");
                $divGrid.jqxGrid('autoresizecolumn', 'Param', "all");
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $divGrid.jqxGrid('exportdata', 'xls', 'RT');
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

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
            $('#definition').toggle('slow');
        });
    }
}