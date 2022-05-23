import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTM.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

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
                    const PARAMETERS = Osemosys.getParamFile();
                    promise.push(PARAMETERS);
                    //const RYTMdata = Osemosys.getData(casename, "RYTM.json");
                    const RYTMdata = fetch('../../DataStorage/'+casename+'/RYTM.json', {cache: "no-store"})
                    // .then(response => {
                    //     return response.json();
                    // })

                    promise.push(RYTMdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RYTM.refreshPage.bind(RYTM));
                }
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYTMdata] = data;
                let model = new Model(casename, genData, RYTMdata, group, PARAMETERS, param);
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
        Html.ddlTechs(model.techs, model.techs[0]['TechId']);
        Html.ddlMods($('#osy-mods1'), model.mods);

        let $divGrid = $('#osy-gridRYTM');
        let $divChart = $('#osy-chartRYTM');

        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        if (model.scenariosCount > 1) {
            $('#scCommand').show();
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlTechNames(model.techs, model.techs[0]['TechId']);
            Html.ddlMods($('#osy-mods2'), model.mods);
            Grid.applyRYTMFilter($divGrid, model.years);
        }

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
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS);
                const RYTMdata = Osemosys.getData(casename, 'RYTM.json');
                promise.push(RYTMdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYTMdata] = data;
                let model = new Model(casename, genData, RYTMdata, 'RYTM', PARAMETERS, PARAMETERS['RYTM'][0]['id']);
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

        $("#osy-saveRYTMdata").off('click');
        $("#osy-saveRYTMdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let param = $("#osy-ryt").val();
            let rytData = $divGrid.jqxGrid('getboundrows');
            let data = JSON.parse(JSON.stringify(rytData, ['ScId', 'TechId', 'MoId'].concat(model.years)));

            let saveData = {};
            $.each(data, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });


            Osemosys.updateData(saveData, param, "RYTM.json")
                .then(response => {
                    //model.gridData[model.param] = JSON.parse(RYTmodel);
                    Message.bigBoxSuccess('Model message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYTM.json");
                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        //change of ddl parameters
        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $divChart.jqxChart('getInstance');
            var tech = $("#osy-techs").val();
            var mo = $("#osy-mods1").val();
            model.param = this.value;
            configChart.source.records = model.chartData[this.value][tech][mo];
            configChart.update();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
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
            var param = $("#osy-ryt").val();
            var tech = $("#osy-techs").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][tech][this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var mo = $("#osy-mods2").val();
            var tech = $("#osy-techNames").val();
            Grid.applyRYTMFilter($divGrid, model.years, sc, tech, mo);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var mo = $("#osy-mods2").val();
            var tech = $("#osy-techNames").val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc == sc && obj.MoId == mo && obj.Tech == tech) {
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRYTMFilter($divGrid, model.years);
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
                    let tech = $("#osy-techs").val();
                    var mo = $("#osy-mods1").val();

                    //update grid model
                    model.gridData[param] = gridData;

                    //update chart model
                    $.each(model.techs, function (idT, tech) {
                        $.each(model.mods, function (idT, mo) {
                            let chartData = [];
                            $.each(model.years, function (idY, year) {
                                let chunk = {};
                                chunk['Year'] = year;
                                $.each(gridData, function (id, obj) {
                                    if (obj.TechId == tech.TechId && obj.MoId == mo) {
                                        chunk[obj.ScId] = obj[year];
                                    }
                                });
                                chartData.push(chunk);
                            });
                            model.chartData[param][tech['TechId']][mo] = chartData;
                        });
                    });
                    var configChart = $divChart.jqxChart('getInstance');
                    configChart.source.records = model.chartData[model.param][tech][mo];
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

                var techId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                var moId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'MoId');
                var ScId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');

                let param = $("#osy-ryt").val();
                let tech = $("#osy-techs").val();
                var mo = $("#osy-mods1").val();


                //update chart model
                $.each(model.chartData[param][techId][moId], function (id, obj) {
                    if (obj.Year == year) {
                        if (value) {
                            obj[ScId] = value;
                        } else {
                            obj[ScId] = 0;
                        }
                    }
                });

                var configChart = $divChart.jqxChart('getInstance');
                configChart.source.records = model.chartData[model.param][tech][mo];
                configChart.update();
                //update chart model

                $.each(model.gridData[model.param], function (id, obj) {
                    if (obj.TechId == techId && obj.MoId == moId && obj.ScId == ScId) {
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