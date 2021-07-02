import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RT.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
// import { Sidebar } from "./Sidebar.js";

export default class RT {
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
                const RTdata = Osemosys.getData(casename, 'RT.json');
                // const RTdata = fetch('../../DataStorage/'+casename+'/RT.json')
                // .then(response => {
                //     return response.json();
                // })
                promise.push(RTdata); 
                return Promise.all(promise);
            }else{
                MessageSelect.init(RT.refreshPage.bind(RT));
            }
        })
        .then(data => {
            let [casename, genData, PARAMETERS, RTdata] = data;
            let model = new Model(casename, genData, RTdata, group, PARAMETERS, param);
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

        let $divGrid = $('#osy-gridRT');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true)

        if (model.scenariosCount>1){
            $('#scCommand').show();
            Html.ddlScenarios( model.scenarios, model.scenarios[1]['ScenarioId']);
            Grid.applyRTFilter( $divGrid, model.techs );
        }

        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRT');
        Chart.Chart($divChart, daChart, "RT", model.series, 'Tech');
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
            const RTdata = Osemosys.getData(casename, 'RT.json');
            promise.push(RTdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, PARAMETERS,RTdata] = data;
            let model = new Model(casename, genData, RTdata, 'RT', PARAMETERS, PARAMETERS['RT'][0]['id']);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){

        let $divGrid = $('#osy-gridRT');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RT.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveRYTdata").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let param = $( "#osy-ryt" ).val();
            let rtData = $('#osy-gridRT').jqxGrid('getboundrows');
            //console.log('rytData save ', rtData)
            let data = JSON.parse(JSON.stringify(rtData,['ScId'].concat(model.techIds)));
            console.log('data save ', data)

            let saveData = {};
            $.each(data, function (id, obj) {
                if(!saveData[obj.ScId]){ saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });
            console.log('data save ', saveData)

            Osemosys.updateData(saveData, param, "RT.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
                //sync S3
                if (Base.AWS_SYNC == 1){
                    Base.updateSync(model.casename, "RT.json");
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            let $divGrid = $('#osy-gridRT');
            model.srcGrid.root = this.value;
            $divGrid.jqxGrid('updatebounddata');

            Grid.applyRTFilter( $divGrid, model.techs );
            var configChart = $('#osy-chartRT').jqxChart('getInstance');
            configChart.source.records = model.chartData[this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var param = $( "#osy-ryt" ).val();
            console.log(sc, param, model.PARAMNAMES[param])
            // let group = $divGrid.jqxGrid('getgroup', 0);
            // console.log('group ', group)
            Grid.applyRTFilter( $divGrid, model.techs, sc, model.PARAMNAMES[param] );
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var param = $( "#osy-ryt" ).val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                //console.log(obj)
                if (obj.Sc== sc && obj.Param == model.PARAMNAMES[param]){
                    $.each(model.techs, function (i, tech) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, tech.TechId, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRTFilter( $divGrid, model.techs );
        });

        let pasteEvent = false;
        $('#osy-gridRT').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRT').jqxGrid('getboundrows');
                    let param = $( "#osy-ryt" ).val();
                    let chartData = [];
                    $.each(model.techs, function (id, tech) { 
                        let chunk = {};
                        chunk['TechId'] = tech.TechId;
                        chunk['Tech'] = tech.Tech;
                        $.each(gridData, function (id, rtDataObj) {
                            chunk[rtDataObj.ScId] = rtDataObj[tech.TechId]; 
                        });
                        chartData.push(chunk);
                        model.chartData[param] =  chartData;
                    });
                    model.gridData[param] = gridData;

                    var configChart = $('#osy-chartRT').jqxChart('getInstance');
                    configChart.source.records = model.chartData[param];
                    configChart.update();
                }, 1000);
            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                //Pace.restart();
                var args = event.args;
                var tech = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;
                var techId = $('#osy-gridRT').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                var scId = $('#osy-gridRT').jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $( "#osy-ryt" ).val();

                $.each(model.chartData[param], function (id, obj) {
                    //console.log('tech ', tech, obj)
                    if(obj.TechId == tech){
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
                            obj[tech] = value;
                        }else{
                            obj[tech] = 0;
                        }
                    }
                });

                var configChart = $('#osy-chartRT').jqxChart('getInstance');
                configChart.source.records = model.chartData[param];
                configChart.update();
            }
        });

        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $('#osy-chartRT').jqxChart('getInstance');
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
            var configChart = $('#osy-chartRT').jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });
    
        $("#exportPng").click(function() {
            $("#osy-chartRT").jqxChart('saveAsPNG', 'RT.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRT').jqxGrid('autoresizecolumn', 'Param');
                $('#osy-gridRT').jqxGrid('autoresizecolumn', 'Sc');
            }
            else{
                $('#osy-gridRT').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRT").jqxGrid('exportdata', 'xls', 'RT');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRT').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRT').jqxGrid('refresh');
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