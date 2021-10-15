import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYE.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

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
                    const PARAMETERS = Osemosys.getParamFile();
                    promise.push(PARAMETERS);
                    const RYEdata = Osemosys.getData(casename, 'RYE.json');
                    promise.push(RYEdata);
                    return Promise.all(promise);
                    ;
                } else {
                    MessageSelect.init(RYE.refreshPage.bind(RYE));
                }

            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYEdata] = data;
                let model = new Model(casename, genData, RYEdata, group, PARAMETERS, param);
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
        Html.ddlParams(model.PARAMETERS[model.group], model.param);
        Html.ddlEmis(model.emis, model.emis[0]['EmisId']);

        let $divGrid = $('#osy-gridRYE');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)

        if (model.scenariosCount > 1) {
            $('#scCommand').show();
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlEmiNames(model.emis, model.emis[0]['EmisId']);
            Grid.applyRYEFilter($divGrid, model.years);
        }

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
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS);
                const RYEdata = Osemosys.getData(casename, 'RYE.json');
                promise.push(RYEdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYEdata] = data;
                let model = new Model(casename, genData, RYEdata, 'RYE', PARAMETERS, PARAMETERS['RYE'][0]['id']);
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

        $("#osy-saveRYEdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let param = $("#osy-ryt").val();
            let rycData = $divGrid.jqxGrid('getboundrows');
            let daRYCData = JSON.parse(JSON.stringify(rycData, ['ScId', 'EmisId'].concat(model.years)));

            let saveData = {};
            $.each(daRYCData, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYE.json")
                .then(response => {
                    Message.bigBoxSuccess('Model message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYE.json");
                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function () {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            model.param = this.value;
            var emi = $("#osy-emis").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value][emi];
            configChart.update();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
        });

        //change of ddl emis
        $('#osy-emis').on('change', function () {
            var param = $("#osy-ryt").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var emi = $("#osy-emiNames").val();
            Grid.applyRYEFilter($divGrid, model.years, sc, emi);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var emi = $("#osy-emiNames").val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc == sc && obj.Emis == emi) {
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRYEFilter($divGrid, model.years);
        });

        let pasteEvent = false;
        $divGrid.bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function () {
                    let gridData = $divGrid.jqxGrid('getboundrows');
                    let param = $("#osy-ryt").val();
                    var emi = $("#osy-emis").val();

                    $.each(model.emis, function (idT, emi) {
                        let chartData = [];
                        $.each(model.years, function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(gridData, function (id, rytDataObj) {
                                if (rytDataObj['EmisId'] == emi['EmisId']) {
                                    chunk[rytDataObj.ScId] = rytDataObj[year];
                                }
                            });
                            chartData.push(chunk);
                        });
                        model.chartData[param][emi['EmisId']] = chartData;
                    });

                    //update model
                    model.gridData[param] = gridData;

                    var configChart = $divChart.jqxChart('getInstance');
                    configChart.source.records = model.chartData[param][emi];
                    configChart.update();
                }, 1000);
            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                Pace.restart();
                var args = event.args;
                var year = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;
                var emiId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'EmisId');
                var scId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $("#osy-ryt").val();
                var emi = $("#osy-emis").val();

                //update model chart
                $.each(model.chartData[param][emiId], function (id, obj) {
                    if (obj.Year == year) {
                        if (value) {
                            obj[scId] = value;
                        } else {
                            obj[scId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if (obj.EmisId == emiId && obj.ScId == scId) {
                        if (value) {
                            obj[year] = value;
                        } else {
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $divChart.jqxChart('getInstance');
                configChart.source.records = model.chartData[param][emi];
                configChart.update();
            }
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
                $divGrid.jqxGrid('autoresizecolumn', 'Emis');
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