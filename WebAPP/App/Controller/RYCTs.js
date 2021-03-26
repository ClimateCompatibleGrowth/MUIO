import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYCTs.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";

export default class RYCTs {
    static onLoad(group, param){
        Base.getSession()
        .then(response =>{
            let casename = response['session']
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS); 
            const RYCTsdata = Osemosys.getData(casename, "RYCTs.json");
            promise.push(RYCTsdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, PARAMETERS, RYCTsdata] = data;
            let model = new Model(casename, genData, RYCTsdata, group, PARAMETERS, param);
            if(casename){
                this.initPage(model);
                this.initEvents(model);
            }else{
                MessageSelect.init(RYCTs.refreshPage.bind(RYCTs));
            }
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlComms( model.comms, model.comms[0]['CommId']);
        
        let $divGrid = $('#osy-gridRYCTs');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true);

        let $divChart = $('#osy-chartRYCTs');
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        Chart.Chart($divChart, daChart, "RYCTs", model.series);        
        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData); 
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS); 
            const RYCTsdata = Osemosys.getData(casename, 'RYCTs.json');
            promise.push(RYCTsdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, PARAMETERS, RYCTsdata] = data;
            let model = new Model(casename, genData, RYCTsdata, 'RYCTs', PARAMETERS, PARAMETERS['RYCTs'][0]['id']);
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
            RYCTs.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYCTsdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let rytData = $('#osy-gridRYCTs').jqxGrid('getrows');
            let daRYTData = JSON.stringify(rytData,['CommId', 'Timeslice'].concat(model.years));
            Osemosys.updateData(JSON.parse(daRYTData), model.param, "RYCTs.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
                //sync S3
                if (Base.AWS_SYNC == 1){
                    Base.updateSync(model.casename, "RYCTs.json");
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl techs
        $('#osy-comms').on('change', function() {
            var configChart = $('#osy-chartRYCTs').jqxChart('getInstance');
            configChart.source.records = model.chartData[model.param][this.value];
            configChart.update();
        });

        let pasteEvent = false;
        $('#osy-gridRYCTs').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;

                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYCTs').jqxGrid('getrows');
                    let comm = $( "#osy-comms" ).val();
                    //update chart model
                    $.each(model.comms, function (idT, comm) {
                        let chartData = [];
                        $.each(model.years, function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(gridData, function (id, obj) {
                                if(obj['CommId'] == comm['CommId']){
                                    chunk[obj.Timeslice] = obj[year]; 
                                }
                            });
                            chartData.push(chunk);
                        });
                        model.chartData[model.param][comm['CommId']] =  chartData;
                    });
                    //update grid model
                    model.gridData[model.param] = gridData;
                    var configChart = $('#osy-chartRYCTs').jqxChart('getInstance');
                    configChart.source.records = model.chartData[model.param][comm];
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
                var commId = $('#osy-gridRYCTs').jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var timeslice = $('#osy-gridRYCTs').jqxGrid('getcellvalue', rowBoundIndex, 'Timeslice');
                let comm = $( "#osy-comms" ).val();

                //update chart model
                $.each(model.chartData[model.param][commId], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[timeslice] = value;
                        }else{
                            obj[timeslice] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRYCTs').jqxChart('getInstance');
                configChart.source.records = model.chartData[model.param][comm];
                configChart.update();
                //update chart model
                $.each(model.gridData[model.param], function (id, obj) {
                    if(obj.TechId == commId && obj.Timeslice == timeslice){
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
            var configChart = $('#osy-chartRYCTs').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRYCTs').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRYCTs").jqxChart('saveAsPNG', 'RYCTs.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYCTs').jqxGrid('autoresizecolumn', 'Comm', 'Timeslice');
            }
            else{
                $('#osy-gridRYCTs').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYCTs").jqxGrid('exportdata', 'xls', 'RYCTs');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYCTs').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYCTs').jqxGrid('refresh');
        });
    
    }
}