import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYC.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { PARAMETERS } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYC {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYCdata = Osemosys.getData(casename, 'RYC.json');
            promise.push(RYCdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYCdata] = data;
            let model = new Model(casename, genData, RYCdata, PARAMETERS['RYC'][0]['id']);
            if(casename){
                this.initPage(model);
                this.initEvents(model);
                ;
            }else{
                MessageSelect.init(RYC.refreshPage.bind(RYC));
            }
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        //Navbar.initPage(model.casename);

        Html.title(model.casename);
        Html.ddlRYT( PARAMETERS['RYC'], model.defaultParam);

        let $divGrid = $('#osy-gridRYC');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)
        
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYC');
        Chart.chartRYT($divChart, daChart, "RYC", model.series);
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYCdata = Osemosys.getData(casename, 'RYC.json');
            promise.push(RYCdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYCdata] = data;
            let model = new Model(casename, genData, RYCdata,  PARAMETERS['RYC'][0]['id']);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
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
            let param = $( "#osy-ryt" ).val();
            let rycData = $('#osy-gridRYC').jqxGrid('getrows');
            let daRYCData = JSON.stringify(rycData,['CommId'].concat(model.years));
            Osemosys.updateData(JSON.parse(daRYCData), param, "RYC.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            let $divGrid = $('#osy-gridRYC');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
        });

        let pasteEvent = false;
        $('#osy-gridRYC').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYC').jqxGrid('getrows');
                    let param = $( "#osy-ryt" ).val();
                    let chartData = [];
                    $.each(model.years, function (idY, year) {
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(gridData, function (id, rytDataObj) {
                            chunk[rytDataObj.CommId] = rytDataObj[year]; 
                        });
                        chartData.push(chunk);
                    });

                    //update model
                    model.chartData[param] = chartData;
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRYC').jqxChart('getInstance');
                    configChart.source.records = model.chartData[param];
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
                let param = $( "#osy-ryt" ).val();

                //update model chart
                $.each(model.chartData[param], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[commId] = value;
                        }else{
                            obj[commId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.CommId == commId){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRYC').jqxChart('getInstance');
                configChart.source.records = model.chartData[param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            var chartType = $(this).attr('data-chartType');
            configChart.seriesGroups[0].type = chartType;
            if(chartType == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.update();  
        });

        $(".toggleLabels").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYC').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYC").jqxChart('saveAsPNG', 'RYC.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYC').jqxGrid('autoresizecolumn', 'Comm');
            }
            else{
                $('#osy-gridRYC').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYC").jqxGrid('exportdata', 'xls', 'RYC');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYC').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYC').jqxGrid('refresh');
        });
    }
}