import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYC.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYC {
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
                    const RYCdata = Osemosys.getData(casename, 'RYC.json');
                    promise.push(RYCdata);
                    return Promise.all(promise);
                    ;
                } else {
                    MessageSelect.init(RYC.refreshPage.bind(RYC));
                }

            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYCdata] = data;
                let model = new Model(casename, genData, RYCdata, group, PARAMETERS, param);
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
        Html.ddlComms(model.comms, model.comms[0]['CommId']);

        let $divGrid = $('#osy-gridRYC');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)

        if (model.scenariosCount > 1) {
            $('#scCommand').show();
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlCommNames(model.comms, model.comms[0]['CommId']);
            Grid.applyRYCFilter($divGrid, model.years);
        }

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYC');
        Chart.Chart($divChart, daChart, "RYC", model.series);
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
                const RYCdata = Osemosys.getData(casename, 'RYC.json');
                promise.push(RYCdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYCdata] = data;
                let model = new Model(casename, genData, RYCdata, 'RYC', PARAMETERS, PARAMETERS['RYC'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYC');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYC.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYCdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let param = $("#osy-ryt").val();
            let rycData = $('#osy-gridRYC').jqxGrid('getboundrows');
            let daRYCData = JSON.parse(JSON.stringify(rycData, ['ScId', 'CommId'].concat(model.years)));

            let saveData = {};
            $.each(daRYCData, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYC.json")
                .then(response => {
                    Message.bigBoxSuccess('Case study message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYC.json");
                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function () {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            let $divGrid = $('#osy-gridRYC');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');

            var comm = $("#osy-comms").val();
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value][comm];
            configChart.update();
        });

        //change of ddl comms
        $('#osy-comms').on('change', function () {
            var param = $("#osy-ryt").val();
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var comm = $("#osy-commNames").val();
            Grid.applyRYCFilter($divGrid, model.years, sc, comm);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var comm = $("#osy-commNames").val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc == sc && obj.Comm == comm) {
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRYCFilter($divGrid, model.years);
        });

        let pasteEvent = false;
        $('#osy-gridRYC').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function () {
                    let gridData = $('#osy-gridRYC').jqxGrid('getboundrows');
                    let param = $("#osy-ryt").val();
                    var comm = $("#osy-comms").val();

                    $.each(model.comms, function (idT, comm) {
                        let chartData = [];
                        $.each(model.years, function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(gridData, function (id, rytDataObj) {
                                if (rytDataObj['CommId'] == comm['CommId']) {
                                    chunk[rytDataObj.ScId] = rytDataObj[year];
                                }
                            });
                            chartData.push(chunk);
                        });
                        model.chartData[param][comm['CommId']] = chartData;
                    });

                    //update model
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRYC').jqxChart('getInstance');
                    configChart.source.records = model.chartData[param][comm];
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
                var commId = $('#osy-gridRYC').jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var scId = $('#osy-gridRYC').jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $("#osy-ryt").val();
                var comm = $("#osy-comms").val();

                //update model chart
                $.each(model.chartData[param][commId], function (id, obj) {
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
                    if (obj.CommId == commId && obj.ScId == scId) {
                        if (value) {
                            obj[year] = value;
                        } else {
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRYC').jqxChart('getInstance');
                configChart.source.records = model.chartData[param][comm];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            if (configChart.seriesGroups[0].type == 'column') {
                configChart.seriesGroups[0].labels.angle = 90;
            } else {
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();
        });

        $("#exportPng").click(function () {
            $("#osy-chartRYC").jqxChart('saveAsPNG', 'RYC.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").click(function () {
            if (res) {
                $('#osy-gridRYC').jqxGrid('autoresizecolumn', 'Sc');
                $('#osy-gridRYC').jqxGrid('autoresizecolumn', 'Comm');
            }
            else {
                $('#osy-gridRYC').jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYC").jqxGrid('exportdata', 'xls', 'RYC');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYC').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYC').jqxGrid('refresh');
        });

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