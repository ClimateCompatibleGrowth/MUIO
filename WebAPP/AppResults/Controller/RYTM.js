import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTM.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYTM {
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
                    const RYTMdata = Osemosys.getResultData(casename, "RYTM.json");
                    promise.push(RYTMdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RYTM.refreshPage.bind(RYTM));
                }
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTMdata] = data;
                let model = new Model(casename, genData, resData, RYTMdata, group, PARAMETERS, param);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams(model.PARAMETERS['RYTM'], model.param);
        Html.ddlCases(model.cases, model.case);
        //Html.ddlTechs(model.techs, model.techs[0]['TechId']);
        Html.ddlMods($('#osy-mods1'), model.mods);

        let $divGrid = $('#osy-gridRYTM');
        let $divChart = $('#osy-chartRYTM');

        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true, true, false, false);

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYTM", model.series);
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
                const RYTMdata = Osemosys.getResultData(casename, "RYTM.json");
                promise.push(RYTMdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYTMdata] = data;
                let model = new Model(casename, genData, resData, RYTMdata, 'RYTM', PARAMETERS, PARAMETERS['RYTM'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYTM');
        let $divChart = $('#osy-chartRYTM');

        $("#casePicker").off('click');
        //odabir novog Model iz Model pickera
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYTM.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        //change of ddl parameters
        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            model.param = this.value;
            //model.srcGrid.root = this.value;
            model.srcGrid.localdata = model.gridData[this.value][model.case];
            $divGrid.jqxGrid('updatebounddata');

            var configChart = $divChart.jqxChart('getInstance');
            // var tech = $("#osy-techs").val();
            // var mo = $("#osy-mods1").val();
            
            configChart.source.records = model.chartData[this.value][model.mod];
            configChart.update();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
        });

        $('#osy-cases').on('change', function () {
            model.case = this.value;
            model.srcGrid.localdata = model.gridData[model.param][this.value];
            $divGrid.jqxGrid('updatebounddata');

            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][this.value];
            configChart.update();
        });
        //change of ddl techs
        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            var param = $("#osy-ryt").val();
            var mo = $("#osy-mods1").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value][mo];
            configChart.update();
        });

        //change of ddl techs
        $("#osy-mods1").off('change');
        $('#osy-mods1').on('change', function () {
            model.mod = this.value;
            // var param = $("#osy-ryt").val();
            // var tech = $("#osy-techs").val();
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
        $("#exportPng").click(function () {
            $divChart.jqxChart('saveAsPNG', 'RYTM.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").click(function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Tech');
                $divGrid.jqxGrid('autoresizecolumn', 'MoId');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $divGrid.jqxGrid('exportdata', 'xls', 'RYTM');
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