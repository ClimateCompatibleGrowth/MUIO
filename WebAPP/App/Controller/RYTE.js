import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYTE.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { PARAMETERS } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYTE {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTCdata = Osemosys.getData(casename, "RYTE.json");
            promise.push(RYTCdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTCdata] = data;
            if (RYTCdata['EAR'].length == 0){
                Message.warning('Selected model does not have Emission activity ratio defined for any technology.');
                Message.smallBoxWarning('WARNING', 'Selected model does not have Emission activity ratio defined for any technology.', null);

            }else{
                let model = new Model(casename, genData, RYTCdata, PARAMETERS['RYTE'][0]['id']);
                if(casename){
                    this.initPage(model);
                    this.initEvents(model);
                }else{
                    MessageSelect.init(RYTE.refreshPage.bind(RYTE));
                }
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
        Html.ddlRYT( PARAMETERS['RYTE'], model.defaultParam);
        Html.ddlTechs( model.techs, model.techs[0]['TechId']);
        
        let $divGrid = $('#osy-gridRYTE');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        let $divChart = $('#osy-chartRYTE');
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.chartRYT($divChart, daChart, "RYTE", model.series);        
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const RYTCdata = Osemosys.getData(casename, 'RYTE.json');
            promise.push(RYTCdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, RYTCdata] = data;
            let model = new Model(casename, genData, RYTCdata,  PARAMETERS['RYTE'][0]['id']);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){
        $("#casePicker").off('click');
        //odabir novog case iz case pickera
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RYTE.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTEdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $( "#osy-ryt" ).val();
            let rytData = $('#osy-gridRYTE').jqxGrid('getrows');
            let daRYTData = JSON.stringify(rytData,['TechId', 'EmisId'].concat(model.years));
            //let RYTmodel = JSON.stringify(rytData,['TechId', 'Tech', 'CommId', 'Comm'].concat(model.years));
            //potrebno dodati za koji param vrsimo update
            Osemosys.updateData(JSON.parse(daRYTData), param, "RYTE.json")
            .then(response =>{
                //model.gridData[param] = JSON.parse(RYTmodel);
                Message.bigBoxSuccess('Case study message', response.message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            let $divGrid = $('#osy-gridRYTE');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');
            var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
            var tech = $( "#osy-techs" ).val();
            configChart.source.records = model.chartData[this.value][tech];
            configChart.update();
        });

        //change of ddl techs
        $('#osy-techs').on('change', function() {
            var param = $( "#osy-ryt" ).val();
            var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value];
            configChart.update();
        });

        let pasteEvent = false;
        $('#osy-gridRYTE').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;

                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYTE').jqxGrid('getrows');
                    let param = $( "#osy-ryt" ).val();
                    let tech = $( "#osy-techs" ).val();
                    //update chart model
                    $.each(model.techs, function (idT, tech) {
                        let chartData = [];
                        $.each(model.years, function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(gridData, function (id, obj) {
                                if(obj['TechId'] == tech['TechId']){
                                    chunk[obj.EmisId] = obj[year]; 
                                }
                            });
                            chartData.push(chunk);
                        });
                        model.chartData[param][tech['TechId']] =  chartData;
                    });
                    //update grid model
                    model.gridData[param] = gridData;
                    var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
                    configChart.source.records = model.chartData[param][tech];
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
                var techId = $('#osy-gridRYTE').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                var emisId = $('#osy-gridRYTE').jqxGrid('getcellvalue', rowBoundIndex, 'EmisId');
                let param = $( "#osy-ryt" ).val();
                let tech = $( "#osy-techs" ).val();

                //update chart model
                $.each(model.chartData[param][techId], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[emisId] = value;
                        }else{
                            obj[emisId] = 0;
                        }
                    }
                });
                var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
                configChart.source.records = model.chartData[param][tech];
                configChart.update();
                //update chart model
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.TechId == techId && obj.EmisId == emisId){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRYTE').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYTE").jqxChart('saveAsPNG', 'RYTE.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYTE').jqxGrid('autoresizecolumn', 'Tech');
            }
            else{
                $('#osy-gridRYTE').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYTE").jqxGrid('exportdata', 'xls', 'RYTE');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            console.log('model.d ', model.d)
            $('#osy-gridRYTE').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYTE').jqxGrid('refresh');
        });
    
    }
}