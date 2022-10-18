import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTCM.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYTCM {
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
                    const RYTCMdata = Osemosys.getData(casename, "RYTCM.json");
                    promise.push(RYTCMdata);
                    const cases = Base.getCaseStudies();
                    promise.push(cases);
                    return Promise.all(promise);
                } else {
                    let er = {
                        "message": 'There is no model selected!',
                        "status_code": "CaseError"
                    }
                    return Promise.reject(er);
                    // MessageSelect.init(RYTCM.refreshPage.bind(RYTCM));
                    // throw new Error('No Model selected');
                }
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYTCMdata, cases] = data;
                if (RYTCMdata[param]['SC_0'].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, RYTCMdata, group, PARAMETERS, param, cases);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                if (error.status_code == 'CaseError') {
                    MessageSelect.init(RYTCM.refreshPage.bind(RYTCM));
                }
                else if (error.status_code == 'ActivityError') {
                    MessageSelect.activity(RYTCM.refreshPage.bind(RYTCM), error.casename);
                }
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();

        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams(model.PARAMETERS['RYTCM'], model.param);
        // Html.ddlTechs(model.techs[model.param], model.techs[model.param][0]['TechId']);
        // Html.ddlComms(model.comms[model.param][model.techs[model.param][0]['TechId']], model.comms[model.param][model.techs[model.param][0]['TechId']][0]['CommId']);
        // Html.ddlMods($('#osy-mods1'), model.mods);

        let $divGrid = $('#osy-gridRYTCM');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns,  {groupable: true, filterable: true, sortable:true});

        if (model.scenariosCount > 1) {
            $('#scCommand').show();
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlTechNames(model.techs[model.param], model.techs[model.param][0]['TechId']);
            Html.ddlCommNames(model.comms[model.param][model.techs[model.param][0]['TechId']], model.comms[model.param][model.techs[model.param][0]['TechId']][0]['CommId']);
            Grid.applyRYTCFilter($divGrid, model.years);
        }

        // let $divChart = $('#osy-chartRYTCM');
        // var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        // Chart.Chart($divChart, daChart, "RYTCM", model.series);
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
                const RYTCMdata = Osemosys.getData(casename, 'RYTCM.json');
                promise.push(RYTCMdata);
                const cases = Base.getCaseStudies();
                promise.push(cases);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYTCMdata, cases] = data;
                if (RYTCMdata[PARAMETERS['RYTCM'][0]['id']]['SC_0'].length == 0) {
                    let er = {
                        "message": 'There is no activity defined!',
                        "status_code": "ActivityError",
                        "casename": casename
                    }
                    return Promise.reject(er);
                } else {
                    let model = new Model(casename, genData, RYTCMdata, 'RYTCM', PARAMETERS, PARAMETERS['RYTCM'][0]['id'], cases);
                    this.initPage(model);
                    this.initEvents(model);
                }
            })
            .catch(error => {
                setTimeout(function () {
                    if (error.status_code == 'CaseError') {
                        MessageSelect.init(RYTCM.refreshPage.bind(RYTCM));
                    }
                    else if (error.status_code == 'ActivityError') {
                        MessageSelect.activity(RYTCM.refreshPage.bind(RYTCM), error.casename);
                    }
                    Message.warning(error.message);
                }, 500);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYTCM');
        let $divChart = $('#osy-chartRYTCM');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            RYTCM.refreshPage(casename);
            Html.updateCasePicker(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTCMdata").off('click');
        $("#osy-saveRYTCMdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $("#osy-ryt").val();
            let rytData = $divGrid.jqxGrid('getboundrows');
            let data = JSON.parse(JSON.stringify(rytData, ['ScId', 'TechId', 'CommId', 'MoId'].concat(model.years)));

            let saveData = {};
            $.each(data, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYTCM.json")
                .then(response => {
                    Message.bigBoxSuccess('Model message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYTCM.json");
                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            Message.clearMessages();
            if (model.RYTCMdata[this.value]['SC_0'].length === 0) {
                MessageSelect.activity(RYTCM.refreshPage.bind(RYTCM), model.casename);
                //Message.warning(`There is no data definded for ${model.PARAMNAMES[this.value]} for Model ${model.casename}!`);
            } else {
                Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
                model.srcGrid.root = this.value;
                $divGrid.jqxGrid('updatebounddata');
                model.param =  this.value;

                //update za ddl coms i techs za IAR ili OAR
                Html.ddlTechs(model.techs[this.value], model.techs[this.value][0]['TechId']);
                Html.ddlComms(model.comms[this.value][model.techs[this.value][0]['TechId']], model.comms[this.value][model.techs[this.value][0]['TechId']][0]['CommId']);

                Html.ddlTechNames(model.techs[this.value], model.techs[this.value][0]['TechId']);
                Html.ddlCommNames(model.comms[this.value][model.techs[this.value][0]['TechId']], model.comms[this.value][model.techs[this.value][0]['TechId']][0]['CommId']);

                // var configChart = $divChart.jqxChart('getInstance');
                // var tech = $("#osy-techs").val();
                // var comm = $("#osy-comms").val();
                // var mo = $("#osy-mods1").val();
                // configChart.source.records = model.chartData[this.value][tech][comm][mo];
                // configChart.update();
                // $('#definition').html(`${DEF[model.group][model.param].definition}`);
            }
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            var param = $("#osy-ryt").val();
            Html.ddlComms(model.comms[param][this.value], model.comms[param][this.value][0]['CommId']);
            var comm = $("#osy-comms").val();
            var mo = $("#osy-mods1").val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value][comm][mo];
            configChart.update();
        });

        // $("#osy-comms").off('change');
        // $('#osy-comms').on('change', function () {
        //     var param = $("#osy-ryt").val();
        //     var tech = $("#osy-techs").val();
        //     var mo = $("#osy-mods1").val();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     configChart.source.records = model.chartData[param][tech][this.value][mo];
        //     configChart.update();
        // });

        // $("#osy-mods1").off('change');
        // $('#osy-mods1').on('change', function () {
        //     var param = $("#osy-ryt").val();
        //     var tech = $("#osy-techs").val();
        //     var comm = $("#osy-comms").val();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     configChart.source.records = model.chartData[param][tech][comm][this.value];
        //     configChart.update();
        // });

        // $("#osy-techNames").off('change');
        // $('#osy-techNames').on('change', function () {
        //     var param = $("#osy-ryt").val();
        //     let tech = model.techIds[this.value];
        //     Html.ddlCommNames(model.comms[param][tech], model.comms[param][tech][0]['CommId']);
        // });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var comm = $("#osy-commNames").val();
            var tech = $("#osy-techNames").val();
            Grid.applyRYTCFilter($divGrid, model.years, sc, tech, comm);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            var comm = $("#osy-commNames").val();
            var tech = $("#osy-techNames").val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc == sc && obj.Comm == comm && obj.Tech == tech) {
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                }
            });
            Grid.applyRYTCFilter($divGrid, model.years);
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
                    //update grid model
                    model.gridData[param] = gridData;

                    //update chart model
                    // let tech = $("#osy-techs").val();
                    // let comm = $("#osy-comms").val();
                    // var mo = $("#osy-mods1").val();

                    // $.each(model.techs[param], function (idT, tech) {
                    //     $.each(model.comms[param][tech.TechId], function (idT, comm) {
                    //         $.each(model.mods, function (idT, mo) {
                    //             let chartData = [];
                    //             $.each(model.years, function (idY, year) {
                    //                 let chunk = {};
                    //                 chunk['Year'] = year;
                    //                 $.each(gridData, function (id, obj) {
                    //                     if (obj.TechId == tech.TechId && obj.CommId == comm.CommId && obj.MoId == mo) {
                    //                         chunk[obj.ScId] = obj[year];
                    //                     }
                    //                 });
                    //                 chartData.push(chunk);
                    //             });
                    //             model.chartData[param][tech.TechId][comm.CommId][mo] = chartData;
                    //         });
                    //     });
                    // });

                    // var configChart = $divChart.jqxChart('getInstance');
                    // configChart.source.records = model.chartData[param][tech][comm][mo];
                    // configChart.update();
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
                var commId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var moId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'MoId');
                var ScId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');



                //update chart model
                // let param = $("#osy-ryt").val();
                // let tech = $("#osy-techs").val();
                // let comm = $("#osy-comms").val();
                // var mo = $("#osy-mods1").val();

                // $.each(model.chartData[param][techId][commId][moId], function (id, obj) {
                //     if (obj.Year == year) {
                //         if (value) {
                //             obj[ScId] = value;
                //         } else {
                //             obj[ScId] = 0;
                //         }
                //     }
                // });

                // var configChart = $divChart.jqxChart('getInstance');
                // configChart.source.records = model.chartData[param][tech][comm][mo];
                // configChart.update();

                //update grid model
                $.each(model.gridData[model.param], function (id, obj) {
                    if (obj.TechId == techId && obj.CommId == commId && obj.ScId == ScId && obj.MoId == moId) {
                        if (value) {
                            obj[year] = value;
                        } else {
                            obj[year] = 0;
                        }
                    }
                });
            }
        });

        // $(".switchChart").off('click');
        // $(".switchChart").on('click', function (e) {
        //     e.preventDefault();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     var chartType = $(this).attr('data-chartType');
        //     configChart.seriesGroups[0].type = chartType;
        //     if (chartType == 'column') {
        //         configChart.seriesGroups[0].labels.angle = 90;
        //     } else {
        //         configChart.seriesGroups[0].labels.angle = 0;
        //     }
        //     configChart.update();
        //     // $('button a').switchClass( "green", "grey" );
        //     // $('#'+chartType).switchClass( "grey", "green" );
        // });

        // $(".toggleLabels").off('click');
        // $(".toggleLabels").on('click', function (e) {
        //     e.preventDefault();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     if (configChart.seriesGroups[0].type == 'column') {
        //         configChart.seriesGroups[0].labels.angle = 90;
        //     } else {
        //         configChart.seriesGroups[0].labels.angle = 0;
        //     }
        //     configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
        //     configChart.update();
        // });

        // $("#exportPng").off('click');
        // $("#exportPng").on('click', function () {
        //     $divChart.jqxChart('saveAsPNG', 'RYTCM.png', 'https://www.jqwidgets.com/export_server/export.php');
        // });

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

        // $("#xlsAll").off('click');
        // $("#xlsAll").on('click', function (e) {
        //     e.preventDefault();
        //     $divGrid.jqxGrid('exportdata', 'xls', 'RYTCM');
        // });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            console.log('model.param ', model.param)
            console.log('model.gridData[model.param] ',model.gridData[model.param])

            let rytData = $divGrid.jqxGrid('getdisplayrows');
            let data = JSON.parse(JSON.stringify(rytData, ['Sc', 'Tech', 'Comm','MoId'].concat(model.years)));

            Base.prepareCSV(model.casename, data)
            .then(response =>{
                Message.smallBoxInfo('Case study message', response.message, 3000);
                $('#csvDownload').trigger('click');
                window.location = $('#csvDownload').attr('href');
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
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