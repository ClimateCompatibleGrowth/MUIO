import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYCTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYCTs {
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
                    const RYCTsdata = Osemosys.getResultData(casename, "RYCTs.json");
                    promise.push(RYCTsdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RYCTs.refreshPage.bind(RYCTs));
                }
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYCTsdata] = data;
                let model = new Model(casename, genData, resData, RYCTsdata, group, PARAMETERS, param);
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
        Html.ddlCases(model.cases, model.case);
        Html.ddlComms(model.comms, model.comm);
        Html.ddlParams(model.PARAMETERS['RYCTs'], model.param);
        //Html.ddlTimeslices($('#osy-timeslices1'), model.timeslices);

        let $divGrid = $('#osy-gridRYCTs');
        let $divChart = $('#osy-chartRYCTs');

        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYCTs", model.series);
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
                const RYCTsdata = Osemosys.getResultData(casename, "RYCTs.json");
                promise.push(RYCTsdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYCTsdata] = data;
                let model = new Model(casename, genData, resData, RYCTsdata, 'RYCTs', PARAMETERS, PARAMETERS['RYCTs'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYCTs');
        let $divChart = $('#osy-chartRYCTs');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYCTs.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {

            model.param = this.value;
            model.srcGrid.localdata = model.gridData[this.value][model.case];
            //model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');

            
            var configChart = $divChart.jqxChart('getInstance');
            // var comm = $("#osy-comms").val();
            // var ts = $("#osy-timeslices1").val();
            configChart.source.records = model.chartData[this.value][model.case][model.comm];
            configChart.update();
            //$('#definition').html(`${DEF[model.group][model.param].definition}`);
        });

        $('#osy-cases').on('change', function () {
            model.case = this.value;
            model.srcGrid.localdata = model.gridData[model.param][this.value];
            $divGrid.jqxGrid('updatebounddata');

            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][this.value][model.comm];
            configChart.update();
        });

        $("#osy-comms").off('change');
        $('#osy-comms').on('change', function () {
            model.comm = model.commName[this.value];
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][model.case][model.comm];
            configChart.update();
        });

        // $("#osy-timeslices1").off('change');
        // $('#osy-timeslices1').on('change', function () {
        //     var param = $("#osy-ryt").val();
        //     var comm = $("#osy-comms").val();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     configChart.source.records = model.chartData[param][comm][this.value];
        //     configChart.update();
        // });

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
            $divChart.jqxChart('saveAsPNG', 'RYCTs.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").click(function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Comm');
                $divGrid.jqxGrid('autoresizecolumn', 'Timeslice');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYCTs").jqxGrid('exportdata', 'xls', 'RYCTs');
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