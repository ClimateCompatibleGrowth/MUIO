import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { PARAMETERS } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYTs {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTsdata = Osemosys.getData(casename, 'RYTs.json');
            promise.push(RYTsdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTsdata] = data;
            let model = new Model(casename, genData, RYTsdata, PARAMETERS['RYTs'][0]['id']);
            if(casename){
                this.initPage(model);
                this.initEvents(model);
                ;
            }else{
                MessageSelect.init(RYTs.refreshPage.bind(RYTs));
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

        let $divGrid = $('#osy-gridRYTs');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns)
        
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYTs');
        Chart.chartRYT($divChart, daChart, "RYTs", model.series);
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTsdata = Osemosys.getData(casename, 'RYTs.json');
            promise.push(RYTsdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTsdata] = data;
            let model = new Model(casename, genData, RYTsdata, PARAMETERS['RYTs'][0]['id']);
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
            RYTs.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTsdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            let rytsData = $('#osy-gridRYTs').jqxGrid('getrows');
            let daRYTsData = JSON.stringify(rytsData,['YearSplit'].concat(model.years));
            //let RYTsmodel = JSON.stringify(rytsData,['TechId', 'Tech'].concat(model.years));
            //potrebno dodati za koji param vrsimo update
            // Osemosys.updateRYTdata(JSON.parse(daRYTData), param)
            Osemosys.updateData(JSON.parse(daRYTsData), model.param, "RYTs.json")
            .then(response =>{
                model.gridData[model.param] = JSON.parse(daRYTsData);
                Message.bigBoxSuccess('Case study message', response.message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        let pasteEvent = false;
        $('#osy-gridRYTs').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYTs').jqxGrid('getrows');
                    let chartData = [];
                    $.each(model.years, function (idY, year) {
                        let chunk = {};
                        chunk['Year'] = year;
                        $.each(gridData, function (id, rytDataObj) {
                            chunk[rytDataObj.YearSplit] = rytDataObj[year]; 
                        });
                        chartData.push(chunk);
                    });
                    model.chartData[model.param] =  chartData;

                    var configChart = $('#osy-chartRYTs').jqxChart('getInstance');
                    configChart.source.records = model.chartData[model.param];
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
                var YearSplit = $('#osy-gridRYTs').jqxGrid('getcellvalue', rowBoundIndex, 'YearSplit');
                $.each(model.chartData[model.param], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[YearSplit] = value;
                        }else{
                            obj[YearSplit] = 0;
                        }
                    }
                });
                var configChart = $('#osy-chartRYTs').jqxChart('getInstance');
                configChart.source.records = model.chartData[model.param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYTs').jqxChart('getInstance');
            var chartType = $(this).attr('data-chartType');
            configChart.seriesGroups[0].type = chartType;
            if(chartType == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.update();  
            // $('button a').switchClass( "green", "grey" );
            // $('#'+chartType).switchClass( "grey", "green" );
        });

        $(".toggleLabels").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYTs').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYTs").jqxChart('saveAsPNG', 'RYT.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYTs').jqxGrid('autoresizecolumn', 'YearSplit');
            }
            else{
                $('#osy-gridRYTs').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYTs").jqxGrid('exportdata', 'xls', 'RYT');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYTs').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYTs').jqxGrid('refresh');
        });
    
    }
}