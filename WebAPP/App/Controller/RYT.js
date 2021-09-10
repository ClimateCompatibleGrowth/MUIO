import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RYT.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
import { Functions } from "../../Classes/Functions.Class.js";
// import { Sidebar } from "./Sidebar.js";

export default class RYT {
    static onLoad(group, param){
        Base.getSession()
        .then(response =>{
            let start = performance.now();
            let casename = response['session'];
            if(casename){
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData); 
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS); 
                const RYTdata = Osemosys.getData(casename, 'RYT.json');
                //const RYTdata = Osemosys.getDataDirectly(casename, 'RYT.json');
                // const RYTdata = fetch('../../DataStorage/'+casename+'/RYT.json')
                // const RYTdata = fetch('../../DataStorage/'+casename+'/RYT.json', {cache: "no-store"})
                // .then(response => {
                //     return response.json();
                // })
                promise.push(RYTdata); 
                promise.push(start); 
                //console.log('performance get data from API ', performance.now() - start);
                return Promise.all(promise);
            }else{
                MessageSelect.init(RYT.refreshPage.bind(RYT));
            }
        })
        .then(data => {
            let [casename, genData, PARAMETERS, RYTdata, start] = data;
            // console.log('ryt ', casename, RYTdata)
            // console.log('performance read data from promise ', performance.now() - start);
            let model = new Model(casename, genData, RYTdata, group, PARAMETERS, param);
            //console.log('performance model ', performance.now() - start);
            this.initPage(model);
            //console.log('performance idit page ', performance.now() - start);
            this.initEvents(model);
            //console.log('performance events ', performance.now() - start);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static measure(fn) {
        fn();
        return performance.now() - start;
    }

    static initPage(model){
        Message.clearMessages();
        //Navbar.initPage(model.casename);
        Html.title(model.casename, model.PARAMNAMES[model.param], GROUPNAMES[model.group]);
        Html.ddlParams( model.PARAMETERS[model.group], model.param);
        Html.ddlTechs( model.techs, model.techs[0]['TechId']);

        let $divGrid = $('#osy-gridRYT');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true)

        if (model.scenariosCount>1){
            $('#scCommand').show();
            Html.ddlScenarios( model.scenarios, model.scenarios[1]['ScenarioId']);
            Html.ddlTechNames( model.techs, model.techs[0]['TechId']);
            Grid.applyRYTFilter( $divGrid, model.years );
        }
        
        var daChart = new $.jqx.dataAdapter(model.srcChart, { autoBind: true });
        let $divChart = $('#osy-chartRYT');
        Chart.Chart($divChart, daChart, "RYT", model.series);
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
            const RYTdata = Osemosys.getData(casename, 'RYT.json');
            promise.push(RYTdata); 
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, PARAMETERS,RYTdata] = data;
            let model = new Model(casename, genData, RYTdata, 'RYT', PARAMETERS, PARAMETERS['RYT'][0]['id']);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){

        let $divGrid = $('#osy-gridRYT');
        let $divChart = $('#osy-chartRYT');

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
            let rytData = $('#osy-gridRYT').jqxGrid('getboundrows');

            let data = JSON.parse(JSON.stringify(rytData,['ScId', 'TechId'].concat(model.years)));

            let saveData = {};
            $.each(data, function (id, obj) {
                if(!saveData[obj.ScId]){ saveData[obj.ScId] = []; }
                saveData[obj.ScId].push(obj);
                delete obj.ScId;
            });

            Osemosys.updateData(saveData, param, "RYT.json")
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
                //sync S3
                if (Base.AWS_SYNC == 1){
                    Base.updateSync(model.casename, "RYT.json");
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //change of ddl parameters
        $('#osy-ryt').on('change', function() {
            Html.title(model.casename, model.PARAMNAMES[this.value], GROUPNAMES[model.group]);
            let $divGrid = $('#osy-gridRYT');
            model.srcGrid.root = this.value;
            let decimal = Functions.getDecimalPlaces(model.paramData[model.group][this.value]['default']);
            console.log(this.value, decimal)
            model.d = decimal;
            model.decimal = 'd' + model.d;
            $divGrid.jqxGrid('updatebounddata');

            Grid.applyRYTFilter( $divGrid, model.years );
            var configChart = $divChart.jqxChart('getInstance');
            var tech = $( "#osy-techs" ).val();
            configChart.source.records = model.chartData[this.value][tech];
            configChart.update();
        });

        //change of ddl techs
        $('#osy-techs').on('change', function() {
            var param = $( "#osy-ryt" ).val();
            var configChart = $divChart.jqxChart('getInstance');
            configChart.source.records = model.chartData[param][this.value];
            configChart.update();
        });

        $("#osy-openScData").off('click');
        $("#osy-openScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var tech = $( "#osy-techNames" ).val();
            // let group = $divGrid.jqxGrid('getgroup', 0);
            Grid.applyRYTFilter( $divGrid, model.years, sc, tech );
        });

        $("#osy-removeScData").off('click');
        $("#osy-removeScData").on('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var sc = $( "#osy-scenarios" ).val();
            var tech = $( "#osy-techNames" ).val();
            var rows = $divGrid.jqxGrid('getdisplayrows');
            $.each(rows, function (id, obj) {
                if (obj.Sc== sc && obj.Tech == tech){
                    $.each(model.years, function (i, year) {
                        $divGrid.jqxGrid('setcellvalue', obj.uid, year, null);
                    });
                    return false; // breaks
                }
            });
            Grid.applyRYTFilter( $divGrid, model.years );
        });

        let pasteEvent = false;
        $('#osy-gridRYT').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                var dInput = event;
                console.log(dInput);
                setTimeout(function(){ 
                    let gridData = $('#osy-gridRYT').jqxGrid('getboundrows');
                    let param = $( "#osy-ryt" ).val();
                    var tech = $( "#osy-techs" ).val();

                    ///////////////////////////////////
                    $.each(model.techs, function (idT, tech) {
                        let chartData = [];
                        $.each(model.years, function (idY, year) {
                            let chunk = {};
                            chunk['Year'] = year;
                            $.each(gridData, function (id, rytDataObj) {
                                if(rytDataObj['TechId'] == tech['TechId']){
                                    chunk[rytDataObj.ScId] = rytDataObj[year]; 
                                }
                            });
                            chartData.push(chunk);
                        });
                        model.chartData[param][tech['TechId']] =  chartData;
                    });

                    //update model
                    model.gridData[param] = gridData;

                    var configChart = $divChart.jqxChart('getInstance');
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
                var techId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                var scId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                let param = $( "#osy-ryt" ).val();
                var tech = $( "#osy-techs" ).val();

                $.each(model.chartData[param][techId], function (id, obj) {
                    if(obj.Year == year){
                        if(value){
                            obj[scId] = value;
                        }else{
                            obj[scId] = 0;
                        }
                    }
                });

                //update model grid
                $.each(model.gridData[param], function (id, obj) {
                    if(obj.TechId == techId && obj.ScId == scId){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                var configChart = $divChart.jqxChart('getInstance');
                configChart.source.records = model.chartData[param][tech];
                configChart.update();
            }
        });

        $(".switchChart").off('click');    
        $(".switchChart").on('click', function (e) {
            e.preventDefault();
            var configChart = $divChart.jqxChart('getInstance');
            var chartType = $(this).attr('data-chartType');
            configChart.seriesGroups[0].type = chartType;
            if(chartType == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.update();  
        });

        $(".toggleLabels").off('click');    
        $(".toggleLabels").on('click', function (e) {
            e.preventDefault();
            var configChart = $divChart.jqxChart('getInstance');
            if(configChart.seriesGroups[0].type == 'column'){
                configChart.seriesGroups[0].labels.angle = 90;
            }else{
                configChart.seriesGroups[0].labels.angle = 0;
            }
            configChart.seriesGroups[0].labels.visible = !configChart.seriesGroups[0].labels.visible;
            configChart.update();    
        });

        $("#exportPng").off('click');    
        $("#exportPng").click(function() {
            $divChart.jqxChart('saveAsPNG', 'RYT.png',  'https://www.jqwidgets.com/export_server/export.php');
        }); 

        $("#resizeColumns").off('click');
        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'Tech');
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'Sc');
                
            }
            else{
                $('#osy-gridRYT').jqxGrid('autoresizecolumns');
            }
            res = !res;        
        });
    
        $("#xlsAll").off('click');
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