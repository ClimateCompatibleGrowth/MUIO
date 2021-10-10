import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYCTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

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
                    const PARAMETERS = Osemosys.getParamFile();
                    promise.push(PARAMETERS);
                    const RYCTsdata = Osemosys.getData(casename, "RYCTs.json");
                    promise.push(RYCTsdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RYCTs.refreshPage.bind(RYCTs));
                }
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYCTsdata] = data;
                let model = new Model(casename, genData, RYCTsdata, group, PARAMETERS, param);
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
        Html.ddlComms(model.comms, model.comms[0]['CommId']);
        Html.ddlParams(model.PARAMETERS['RYCTs'], model.param);
        Html.ddlTimeslices($('#osy-timeslices1'), model.timeslices);

        let $divGrid = $('#osy-gridRYCTs');
        let $divChart = $('#osy-chartRYCTs');

        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        if (model.scenariosCount > 1) {
            $('#scCommand').show();
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlCommNames(model.comms, model.comms[0]['CommId']);
            Html.ddlTimeslices($('#osy-timeslices2'), model.timeslices);
            Grid.applyRYCTsFilter($divGrid, model.years);
        }

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
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS);
                const RYCTsdata = Osemosys.getData(casename, 'RYCTs.json');
                promise.push(RYCTsdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYCTsdata] = data;
                let model = new Model(casename, genData, RYCTsdata, 'RYCTs', PARAMETERS, PARAMETERS['RYCTs'][0]['id']);
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
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYCTsdata").off('click');
        $("#osy-saveRYCTsdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $("#osy-ryt").val();
            let rytData = $divGrid.jqxGrid('getboundrows');
            let data = JSON.parse(JSON.stringify(rytData, ['ScId', 'CommId', 'Timeslice'].concat(model.years)));

            let saveData = {};
            $.each(data, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYCTs.json")
                .then(response => {
                    Message.bigBoxSuccess('Case study message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYCTs.json");
                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            let $divGrid = $divGrid;
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $divChart.jqxChart('getInstance');
            var comm = $("#osy-comms").val();
            var ts = $("#osy-timeslices1").val();
            configChart.source.records = model.chartData[this.value][comm][ts];
            configChart.update();
        });

        $("#osy-comms").off('change');
        $('#osy-comms').on('change', function () {
            var configChart = $divChart.jqxChart('getInstance');
            var ts = $("#osy-timeslices1").val();
            configChart.source.records = model.chartData[model.param][this.value][ts];
            configChart.update();
        });

        $("#osy-timeslices1").off('change');
        $('#osy-timeslices1').on('change', function () {
            var param = $("#osy-ryt").val();
            var comm = $("#osy-comms").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][comm][this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var ts = $("#osy-timeslices2").val();
            var comm = $("#osy-commNames").val();
            Grid.applyRYCTsFilter($divGrid, model.years, sc, comm, ts);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var ts = $("#osy-timeslices2").val();
            var comm = $("#osy-commNames").val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc == sc && obj.Timeslice == ts && obj.Comm == comm) {
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRYCTsFilter($divGrid, model.years);
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
                    let comm = $("#osy-comms").val();
                    var ts = $("#osy-timeslices1").val();

                    //update grid model
                    model.gridData[param] = gridData;

                    //update chart model
                    $.each(model.comms, function (idT, comm) {
                        $.each(model.timeslices, function (idT, ts) {
                            let chartData = [];
                            $.each(model.years, function (idY, year) {
                                let chunk = {};
                                chunk['Year'] = year;
                                $.each(gridData, function (id, obj) {
                                    if (obj.CommId == comm.CommId && obj.Timeslice == ts) {
                                        chunk[obj.ScId] = obj[year];
                                    }
                                });
                                chartData.push(chunk);
                            });
                            model.chartData[param][comm.CommId][ts] = chartData;
                        });
                    });
                    var configChart = $divChart.jqxChart('getInstance');
                    configChart.source.records = model.chartData[model.param][comm][ts];
                    configChart.update();
                }, 500);

            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                Pace.restart();
                var args = event.args;
                var year = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;

                var commId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var timeslice = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'Timeslice');
                var ScId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');

                let comm = $("#osy-comms").val();
                let param = $("#osy-ryt").val();
                var ts = $("#osy-timeslices1").val();

                //update chart model
                $.each(model.chartData[model.param][commId][timeslice], function (id, obj) {
                    if (obj.Year == year) {
                        if (value) {
                            obj[ScId] = value;
                        } else {
                            obj[ScId] = 0;
                        }
                    }
                });

                var configChart = $divChart.jqxChart('getInstance');
                configChart.source.records = model.chartData[param][comm][ts];
                configChart.update();

                //update grid model
                $.each(model.gridData[param], function (id, obj) {
                    if (obj.TechId == commId && obj.Timeslice == timeslice && obj.ScId == ScId) {
                        if (value) {
                            obj[year] = value;
                        } else {
                            obj[year] = 0;
                        }
                    }
                });
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
            $("#osy-chartRYCTs").jqxChart('saveAsPNG', 'RYCTs.png', 'https://www.jqwidgets.com/export_server/export.php');
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
            $('#definition').html(`
                <h5>${DEF[model.group].title}</h5>
                ${DEF[model.group].definition}
            `);
            $('#definition').toggle('slow');
        });
    }
}