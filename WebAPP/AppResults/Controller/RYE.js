import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYE.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"

export default class RYE {
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
                    const RYEdata = Osemosys.getResultData(casename, 'RYE.json');
                    promise.push(RYEdata);
                    return Promise.all(promise);
                    ;
                } else {
                    MessageSelect.init(RYE.refreshPage.bind(RYE));
                }

            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYEdata] = data;
                let model = new Model(casename, genData, resData, RYEdata, group, PARAMETERS, param);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        console.log(model)
        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams(model.PARAMETERS[model.group], model.param);
        // Html.ddlEmis(model.emis, model.emis[0]['EmisId']);
        Html.ddlCases(model.cases, model.case);

        let $divGrid = $('#osy-gridRYE');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true, true, false, false)

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYE');
        Chart.Chart($divChart, daChart, "RYE", model.series);
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
                const RYEdata = Osemosys.getResultData(casename, 'RYE.json');
                promise.push(RYEdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData, PARAMETERS, RYEdata] = data;
                let model = new Model(casename, genData, resData, RYEdata, 'RYE', PARAMETERS, PARAMETERS['RYE'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYE');
        let $divChart = $('#osy-chartRYE');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYE.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function () {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);

            model.srcGrid.localdata = model.gridData[this.value][model.case];
            //model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');

            model.param = this.value;

            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value][model.case];
            configChart.update();

            //$('#definition').html(`${DEF[model.group][model.param].definition}`);
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
            $("#osy-chartRYE").jqxChart('saveAsPNG', 'RYE.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").click(function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Emi');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYE").jqxGrid('exportdata', 'xls', 'RYE');
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