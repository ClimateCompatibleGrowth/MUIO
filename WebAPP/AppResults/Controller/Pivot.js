import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/Pivot.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "../../App/Controller/MessageSelect.js"
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";


export default class Pivot {
    static onLoad() {
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
                    const DATA = Osemosys.getResultData(casename, 'RYT.json');
                    promise.push(DATA);
                    return Promise.all(promise);
                } else {
                    let er = {
                        "message": 'There is no model selected!',
                        "status_code": "CaseError"
                    }
                    return Promise.reject(er);
                    // MessageSelect.init(Pivot.refreshPage.bind(Pivot));
                    // throw new Error('No model selected');
                }
            })
            .then(data => {      
                let [casename, genData, resData, PARAMETERS, DATA] = data;
                let model = new Model(casename, genData, resData, PARAMETERS, DATA);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                if (error.status_code == 'CaseError') {
                    MessageSelect.init(Pivot.refreshPage.bind(Pivot));
                }
                else if (error.status_code == 'ActivityError') {
                    MessageSelect.activity(Pivot.refreshPage.bind(Pivot), error.casename);
                }
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        console.log('model ', model);

        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.group][model.param], 'pivot');

        Html.ddlParamsAll(model.PARAMETERS, model.param);
        Grid.pivotGrid(model.pivotData);
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
                const DATA = Osemosys.getResultData(casename, 'RT.json');
                promise.push(DATA);
                return Promise.all(promise);
            })
            .then(data => {
                
                let [casename, genData, resData, PARAMETERS, DATA] = data;
                let model = new Model(casename, genData, resData, PARAMETERS, DATA);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                setTimeout(function () {
                    if (error.status_code == 'CaseError') {
                        MessageSelect.init(Pivot.refreshPage.bind(Pivot));
                    }
                    else if (error.status_code == 'ActivityError') {
                        MessageSelect.activity(Pivot.refreshPage.bind(Pivot), error.casename);
                    }
                    Message.warning(error.message);
                }, 500);
            });
    }

    static initEvents(model) {

        let $divGrid = $('#osy-gridPivot');
        let $divChart = $('#osy-chartPivot');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Pivot.refreshPage(casename);
            Html.updateCasePicker(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        
        $("#osy-params").off('change');
        $('#osy-params').on('change', function () {
            Message.clearMessages();
            model.group = model.VARGROUPS[this.value]['group'];
            model.param = this.value;
            console.log('model.param ', model.param);
            console.log('param change')
            // $('#osy-pivotGrid').jqxPivotGrid('destroy');
            // $('#osy-pivotGridDesigner').empty();
            // $('#osy-pivotGrid').empty();

            Osemosys.getResultData(model.casename, model.group+'.json')
            .then(DATA => {

                Html.title(model.casename, model.PARAMNAMES[model.group][model.param], 'pivot');

                console.log('DATA ', DATA);
                let pivotData = DataModelResult.getPivot(DATA[model.param], model.genData['osy-years']);
                console.log('pivotData ', pivotData);

                model.pivotData = pivotData;
                
                Grid.pivotGrid(model.pivotData);
                //$('#osy-pivotGrid').jqxPivotGrid('refresh');


            //     $('#osy-pivotGrid').on('pivotitemselectionchanged', function (event) {
            //         console.log('Pivot item: ' + event.args.pivotItem + ' , selected:' + event.args );
            //    });

            //    var myPivotGridRows = $('#osy-pivotGrid').jqxPivotGrid('getPivotRows');
            //     console.log('rows ', myPivotGridRows.items);

                // var myPivotGridRows = $('#osy-pivotGrid').jqxPivotGrid('getSelectedCells');
                // console.log('The pivot grid has ',myPivotGridRows );

            })
            .catch(error => {
                Message.danger(error.message);
            });            
        });




        $("#btnGridParam").off('click');
        $("#btnGridParam").on('click', function (e) {
            e.preventDefault();
            var myPivotGridRows = $('#osy-pivotGrid').jqxPivotGrid('getPivotRows');
            console.log('rows ', myPivotGridRows.items);
            var myPivotGridCells = $('#osy-pivotGrid').jqxPivotGrid('getPivotCells');
            console.log(myPivotGridCells)
        });








        //////////////////////////////////////////////////////////
        $("#osy-ryt").off('change');
        $('#osy-ryt').on('change', function () {
            Message.clearMessages();
            //console.log('model.RYTCdata ',model.RYTCdata[this.value])
            if (model.RYTCdata[this.value][model.case].length === 0) {
                MessageSelect.activity(RYTC.refreshPage.bind(Pivot), model.casename);
                Message.warning(`There is no data definded for ${model.PARAMNAMES[this.value]} for model ${model.casename}!`);
            } else {
                Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
                model.param = this.value;

                // model.srcGrid.root = this.value;
                model.srcGrid.localdata = model.gridData[this.value][model.case];
                $divGrid.jqxGrid('updatebounddata');
                
                Html.ddlTechsArray(model.techs[model.param][model.case])

                var configChart = $divChart.jqxChart('getInstance');
                var tech = $("#osy-techs").val();
                // var comm = $("#osy-comms").val();
                configChart.source.records = model.chartData[this.value][model.case][tech];
                configChart.update();
                // /$('#definition').html(`${DEF[model.group][model.param].definition}`);
            }
        });

        $('#osy-cases').on('change', function () {
            model.case = this.value;
            model.srcGrid.localdata = model.gridData[model.param][this.value];
            $divGrid.jqxGrid('updatebounddata');

            var tech = $("#osy-techs").val();
            var configChart = $divChart.jqxChart('getInstance');
            console.log(model.param,this.value,model.tech)
            configChart.source.records = model.chartData[model.param][this.value][model.tech];
            configChart.update();
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function () {
            model.tech = this.value;
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
        $("#exportPng").on('click', function () {
            $("#osy-chartPivot").jqxChart('saveAsPNG', 'Pivot.png', 'https://www.jqwidgets.com/export_server/export.php');
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").on('click', function () {
            if (res) {
                // $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                $divGrid.jqxGrid('autoresizecolumn', 'Tech');
                $divGrid.jqxGrid('autoresizecolumn', 'Comm');
            }
            else {
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").on('click', function (e) {
            e.preventDefault();
            $("#osy-gridPivot").jqxGrid('exportdata', 'xls', 'Pivot');
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