import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYT.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { PARAMETERS } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYT {
    static onLoad(param){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTdata = Osemosys.getData(casename, 'RYT.json');
            promise.push(RYTdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTdata] = data;
            let model = new Model(casename, genData, RYTdata, param);
            if(casename){
                this.initPage(model);
                this.initEvents(model);
                ;
            }else{
                MessageSelect.init(RYT.refreshPage.bind(RYT));
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
        Html.ddlRYT( PARAMETERS['RYT'], model.defaultParam);

        let $divGrid = $('#osy-gridRYT');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)
        
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYT');
        Chart.chartRYT($divChart, daChart, "RYT", model.series);
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTdata = Osemosys.getData(casename, 'RYT.json');
            promise.push(RYTdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTdata] = data;
            let model = new Model(casename, genData, RYTdata,  PARAMETERS['RYT'][0]['id']);
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
            RYT.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $( "#osy-ryt" ).val();
            let rytData = $('#osy-gridRYT').jqxGrid('getrows');
            let daRYTData = JSON.stringify(rytData,['TechId'].concat(model.years));
            Osemosys.updateData(JSON.parse(daRYTData), param, "RYT.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            let $divGrid = $('#osy-gridRYT');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $('#osy-chartRYT').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
        });

        let pasteEvent = false;
        $('#osy-gridRYT').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYT').jqxGrid('getrows');
                    let param = $( "#osy-ryt" ).val();
                    let chartData = [];
                    $.each(model.years, function (idY, year) {
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(gridData, function (id, rytDataObj) {
                            chunk[rytDataObj.TechId] = rytDataObj[year]; 
                        });
                        chartData.push(chunk);
                    });

                    //update model
                    model.chartData[param] = chartData;
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRYT').jqxChart('getInstance');
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
                var techId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                let param = $( "#osy-ryt" ).val();

                //update model chart
                $.each(model.chartData[param], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[techId] = value;
                        }else{
                            obj[techId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.TechId == techId){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRYT').jqxChart('getInstance');
                configChart.source.records = model.chartData[param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYT').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRYT').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYT").jqxChart('saveAsPNG', 'RYT.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'Tech');
            }
            else{
                $('#osy-gridRYT').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYT").jqxGrid('exportdata', 'xls', 'RYT');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYT').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYT').jqxGrid('refresh');
        });
    }
}