import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYE.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { PARAMETERS } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYE {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYEdata = Osemosys.getData(casename, 'RYE.json');
            promise.push(RYEdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYEdata] = data;
            let model = new Model(casename, genData, RYEdata, PARAMETERS['RYE'][0]['id']);
            if(casename){
                this.initPage(model);
                this.initEvents(model);
                ;
            }else{
                MessageSelect.init(RYE.refreshPage.bind(RYE));
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
        Html.ddlRYT( PARAMETERS['RYE'], model.defaultParam);

        let $divGrid = $('#osy-gridRYE');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)
        
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYE');
        Chart.chartRYT($divChart, daChart, "RYE", model.series);
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYEdata = Osemosys.getData(casename, 'RYE.json');
            promise.push(RYEdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYEdata] = data;
            let model = new Model(casename, genData, RYEdata,  PARAMETERS['RYE'][0]['id']);
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
            RYE.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYEdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $( "#osy-ryt" ).val();
            let rytData = $('#osy-gridRYE').jqxGrid('getrows');
            let daRYTData = JSON.stringify(rytData,['EmisId'].concat(model.years));
            Osemosys.updateData(JSON.parse(daRYTData), param, "RYE.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            let $divGrid = $('#osy-gridRYE');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $('#osy-chartRYE').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
        });

        let pasteEvent = false;
        $('#osy-gridRYE').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYE').jqxGrid('getrows');
                    let param = $( "#osy-ryt" ).val();
                    let chartData = [];
                    $.each(model.years, function (idY, year) {
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(gridData, function (id, obj) {
                            chunk[obj.EmisId] = obj[year]; 
                        });
                        chartData.push(chunk);
                    });

                    //update model
                    model.chartData[param] = chartData;
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRYE').jqxChart('getInstance');
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
                var emisId = $('#osy-gridRYE').jqxGrid('getcellvalue', rowBoundIndex, 'EmisId');
                let param = $( "#osy-ryt" ).val();

                //update model chart
                $.each(model.chartData[param], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[emisId] = value;
                        }else{
                            obj[emisId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.EmisId == emisId){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRYE').jqxChart('getInstance');
                configChart.source.records = model.chartData[param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYE').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRYE').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYE").jqxChart('saveAsPNG', 'RYE.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYE').jqxGrid('autoresizecolumn', 'Emis');
            }
            else{
                $('#osy-gridRYE').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYE").jqxGrid('exportdata', 'xls', 'RYE');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYE').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYE').jqxGrid('refresh');
        });
    }
}