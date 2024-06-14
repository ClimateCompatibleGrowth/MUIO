import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYCn.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYCn {
    static onLoad(group, param) {
        Message.loaderStart('Loading data...');
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
                    const RYCdata = Osemosys.getData(casename, 'RYCn.json');
                    promise.push(RYCdata);
                    return Promise.all(promise);
                    ;
                } else {
                    MessageSelect.init(RYCn.refreshPage.bind(RYCn));
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
        Html.ddlCons(model.cons, model.cons[0]['CommId']);

        let $divGrid = $('#osy-gridRYCn');
        //let $divChart = $('#osy-chartRYCn');

        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, {groupable: false, filterable: true, sortable:true})

        // if (model.scenariosCount > 1) {
        //     $('#scCommand').show();
        //     Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
        //     Html.ddlConNames(model.cons, model.cons[0]['CommId']);
        //     Grid.applyRYCnFilter($divGrid, model.years);
        // }

        if (model.scenariosCount > 1) {
            Html.lblScenario( model.scenariosCount);
            Html.ddlScenarios(model.scenarios, model.scenarios[1]['ScenarioId']);
            Grid.applyGridFilter($divGrid, model.years);
            
        }

        //var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        //Chart.Chart($divChart, daChart, "RYCn", model.series);
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
                const RYCdata = Osemosys.getData(casename, 'RYCn.json');
                promise.push(RYCdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, PARAMETERS, RYCdata] = data;
                let model = new Model(casename, genData, RYCdata, 'RYCn', PARAMETERS, PARAMETERS['RYCn'][0]['id']);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridRYCn');
        let $divChart = $("#osy-chartRYCn");

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYCn.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-saveRYCndata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let param = $("#osy-ryt").val();
            let rycData = $divGrid.jqxGrid('getboundrows');
            let daRYCnData = JSON.parse(JSON.stringify(rycData, ['ScId', 'ConId'].concat(model.years)));

            let saveData = {};
            $.each(daRYCnData, function (id, obj) {
                if (!saveData[obj.ScId]) { saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYCn.json")
                .then(response => {
                    Message.bigBoxSuccess('Model message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1) {
                        Base.updateSync(model.casename, "RYCn.json");
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
            // var con = $("#osy-cons").val();
            // var configChart = $divChart.jqxChart('getInstance');
            // configChart.source.records = model.chartData[this.value][con];
            // configChart.update();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
        });

        // //change of ddl cons
        // $('#osy-cons').on('change', function () {
        //     var param = $("#osy-ryt").val();
        //     var configChart = $divChart.jqxChart('getInstance');
        //     configChart.source.records = model.chartData[param][this.value];
        //     configChart.update();
        // });

        $("#osy-scenarios").off('click');
        $("#osy-scenarios").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            //var con = $("#osy-conNames").val();
            Html.lblScenario(sc);
            Grid.applyGridFilter($divGrid, model.years, sc);
            //Grid.applyRYCnFilter($divGrid, model.years, sc, con);
        });

        $("#osy-hideScData").off('click');
        $("#osy-hideScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            Html.lblScenario( model.scenariosCount);
            Grid.applyGridFilter($divGrid, model.years);
            Message.smallBoxInfo('Info', 'Scenario data hidden!', 2000);
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $("#osy-scenarios").val();
            // var con = $("#osy-conNames").val();
            // var rows = $divGrid.jqxGrid('getdisplayrows');
            // $.each(rows, function (id, obj) {
            //     if (obj.Sc == sc && obj.Con == con) {
            //         $.each(model.years, function (i, year) {
            //             $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
            //         });
            //         return false; // breaks
            //     }
            // });
            // Grid.applyRYCnFilter($divGrid, model.years);


            let rows = $divGrid.jqxGrid('getboundrows');

            $.each(rows, function (id, obj) {
                if (obj.Sc == sc) {
                    $.each(model.years, function (i, year) {
                        //$divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                        model.gridData[model.param][id][year] = null;
                    });
                }
            });

            model.srcGrid.localdata = model.gridData;
            $divGrid.jqxGrid('updatebounddata');

            Html.lblScenario( model.scenariosCount);
            Grid.applyGridFilter($divGrid, model.years);
            Message.smallBoxInfo('Info', 'Scenario data removed!', 2000);
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

                    //update model
                    model.gridData[param] = gridData;
                }, 1000);
            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                Pace.restart();
                var args = event.args;
                var year = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;
                var conId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ConId');
                var scId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $("#osy-ryt").val();

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if (obj.ConId == conId && obj.ScId == scId) {
                        if (value) {
                            obj[year] = value;
                        } else {
                            obj[year] = 0;
                        }
                    }
                });
            }
        });




        let res = true;
        $("#resizeColumns").click(function () {
            if (res) {
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Con');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        // $("#xlsAll").click(function (e) {
        //     e.preventDefault();
        //     $divGrid.jqxGrid('exportdata', 'xls', 'RYCn');
        // });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            let rytData = $divGrid.jqxGrid('getdisplayrows');
            let data = JSON.parse(JSON.stringify(rytData, ['Sc', 'Con'].concat(model.years)));
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

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
            $('#definition').toggle('slow');
        });

        Message.loaderEnd();
    }
}