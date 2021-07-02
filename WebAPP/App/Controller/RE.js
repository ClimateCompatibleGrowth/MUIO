import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RE.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
// import { Sidebar } from "./Sidebar.js";

export default class RE {
    static onLoad(group, param){
        Base.getSession()
        .then(response =>{
            let casename = response['session'];
            if(casename){
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData); 
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS); 
                const REdata = Osemosys.getData(casename, 'RE.json');
                // const REdata = fetch('../../DataStorage/'+casename+'/RE.json')
                // .then(response => {
                //     return response.json();
                // })
                promise.push(REdata); 
                return Promise.all(promise);
            }else{
                MessageSelect.init(RE.refreshPage.bind(RE));
            }
        })
        .then(data => {
            let [casename, genData, PARAMETERS, REdata] = data;
            let model = new Model(casename, genData, REdata, group, PARAMETERS, param);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams( model.PARAMETERS[model.group], model.param);

        let $divGrid = $('#osy-gridRE');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true)

        if (model.scenariosCount>1){
            $('#scCommand').show();
            Html.ddlScenarios( model.scenarios, model.scenarios[1]['ScenarioId']);
            Grid.applyREFilter( $divGrid, model.emis );
        }

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRE');
        Chart.Chart($divChart, daChart, "RE", model.series, 'Emi');
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
            const REdata = Osemosys.getData(casename, 'RE.json');
            promise.push(REdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, PARAMETERS,REdata] = data;
            let model = new Model(casename, genData, REdata, 'RE', PARAMETERS, PARAMETERS['RE'][0]['id']);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){

        let $divGrid = $('#osy-gridRE');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RE.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $( "#osy-ryt" ).val();
            let rtData = $('#osy-gridRE').jqxGrid('getboundrows');
            let data = JSON.parse(JSON.stringify(rtData,['ScId'].concat(model.emiIds)));
            let saveData = {};
            $.each(data, function (id, obj) {
                if(!saveData[obj.ScId]){ saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });
            Osemosys.updateData(saveData, param, "RE.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
                //sync S3
                if (Base.AWS_SYNC == 1){
                    Base.updateSync(model.casename, "RE.json");
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            let $divGrid = $('#osy-gridRE');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');

            Grid.applyREFilter( $divGrid, model.emis );
            var configChart = $('#osy-chartRE').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var param = $( "#osy-ryt" ).val();
            Grid.applyREFilter( $divGrid, model.emis, sc, model.PARAMNAMES[param] );
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var param = $( "#osy-ryt" ).val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc== sc && obj.Param == model.PARAMNAMES[param]){
                    $.each(model.emis, function (i, emi) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, emi.EmisId, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyREFilter( $divGrid, model.emis );
        });

        let pasteEvent = false;
        $('#osy-gridRE').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRE').jqxGrid('getboundrows');
                    let param = $( "#osy-ryt" ).val();
                    let chartData = [];
                    $.each(model.emis, function (id, emi) { 
                        let chunk = {};
                        chunk['EmiId'] = emi.EmisId;
                        chunk['Emi'] = emi.Emis;
                        $.each(gridData, function (id, rtDataObj) {
                            chunk[rtDataObj.ScId] = rtDataObj[emi.EmisId]; 
                        });
                        chartData.push(chunk);
                        model.chartData[param] =  chartData;
                    });
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRE').jqxChart('getInstance');
                    configChart.source.records = model.chartData[param];
                    configChart.update();
                }, 1000);
            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                //Pace.restart();
                var args = event.args;
                var emi = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;
                var techId = $('#osy-gridRE').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                var scId = $('#osy-gridRE').jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $( "#osy-ryt" ).val();

                $.each(model.chartData[param], function (id, obj) {
                    if(obj.EmiId == emi){
                        if(value){
                            obj[scId] = value;
                        }else{
                            obj[scId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.ParamId == param && obj.ScId == scId){
                        if(value){
                            obj[emi] = value;
                        }else{
                            obj[emi] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRE').jqxChart('getInstance');
                configChart.source.records = model.chartData[param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRE').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRE').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRE").jqxChart('saveAsPNG', 'RE.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRE').jqxGrid('autoresizecolumn', 'Param');
                $('#osy-gridRE').jqxGrid('autoresizecolumn', 'Sc');
            }
            else{
                $('#osy-gridRE').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRE").jqxGrid('exportdata', 'xls', 'RE');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRE').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRE').jqxGrid('refresh');
        });

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`
                <h5>${DEF[model.group].title}</h5>
                ${DEF[model.group].definition}
            `);
            $('#definition').toggle('slow');
        });
    }
}