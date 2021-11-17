import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Model } from "../Model/DataFile.Model.js";
import { MessageSelect } from "./MessageSelect.js";
import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { Routes } from "../../Routes/Routes.Class.js";
import { Sidebar } from "./Sidebar.js";

export default class DataFile {
    static onLoad(){
        Base.getSession()
        .then(response => {
            let casename = response.session;
            const promise = [];
            promise.push(casename);
            let genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData);
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData] = data;
            let model = new Model(casename, genData, "DataFile");
            if(casename){
                this.initPage(model);
            }else{
                MessageSelect.init(DataFile.refreshPage.bind(DataFile));
            }
        })
        .catch(error =>{
            Message.danger(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        //Navbar.initPage(model.casename, model.pageId);
        Html.title(model.casename, model.title, "data.txt");
        if (model.casename == null){
            Message.info("Please select model or create new Model!");
        }    
        if (model.scenariosCount>1){
            $('#scCommand').show();
        }
        //loadScript("References/smartadmin/js/plugin/jquery-nestable/jquery.nestable.min.js", Nestable.init.bind(null));
        this.initEvents(model);
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response=>{
            Message.clearMessages();
            const promise = [];
            promise.push(casename);
            let genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData);
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData] = data;
            let model = new Model(casename, genData, "DataFile");
            $(".DataFile").hide();
            $("#osy-DataFile").empty();
            $("#osy-runOutput").empty();
            // $("#osy-downloadDataFile").hide();
            // $("#osy-downloadResultsFile").hide();
            $("#osy-solver").hide();
            $("#osy-run").hide();
            $(".runOutput").hide();
            $(".Results").hide();
            DataFile.initPage(model);
            DataFile.initEvents(model);
        })
        .catch(error=>{
            Message.bigBoxInfo(error);
        })
    }

    static initEvents(model){

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            DataFile.refreshPage(casename);
            Message.smallBoxInfo("Case selection", casename + " is selected!", 3000);
        });

        $("#osy-btnScOrder").off('click');
        $("#osy-btnScOrder").on('click', function (event) {
            Html.renderScOrder(model.scenarios);
        });

        $("#btnSaveOrder").off('click');
        $("#btnSaveOrder").on('click', function (event) {
            //let order = $("#osy-scOrder").jqxSortable("serialize")
            let order = $("#osy-scOrder").jqxSortable("toArray")
            var scAcitive = new Array();
            $.each($('input[type="checkbox"]:checked'), function (key, value) {
                scAcitive.push($(value).attr("id"));
            });
            let scOrder = DefaultObj.defaultScenario(true);
            $.each(order, function (id, sc) {
                let tmp = {};
                if (scAcitive.includes(sc)){
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = true
                }else{
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = false;
                }
                scOrder.push(tmp);
            });

            Osemosys.saveScOrder(scOrder, model.casename)
            .then(response => {
                if(response.status_code=="success"){
                    $('#osy-order').modal('toggle');
                    Message.clearMessages();
                    Message.bigBoxSuccess('Sceanario order', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1){
                        Base.updateSync(model.casename, "genData.json");
                    }
                    
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });
        
        $("#osy-generateDataFile").off('click');
        $("#osy-generateDataFile").on('click', function (event) {
            Pace.restart();
            Osemosys.generateDataFile(model.casename)
            .then(response =>{
                if(response.status_code=="success"){
                    const promise = [];
                    let DataFile =  Osemosys.readDataFile(model.casename);
                    //let DataFile = Osemosys.getData(model.casename, 'data.txt');
                    promise.push(DataFile);
                    promise.push(response.message);
                    return Promise.all(promise);
                }
            })
            .then(response => {
                let [DataFile, message] = response;
                $("#osy-runOutput").empty();
                $(".runOutput").hide();
                $(".Results").hide();
                var table = $("<table />");
                var rows = DataFile.split("\n"); 

                for (var i = 0; i < rows.length; i++) {
                    var row = $("<tr />");
                    var cells = rows[i].split(" ");
                    //var cells = rows[i].match(/.{1,50}/g);
                    if (cells !== null){
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $(" <td style='padding-right:5px'></td>");
                            //cells[j] = cells[j].replace(/ /g, '&nbsp;');
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        table.append(row);
                    }
                }

                $(".DataFile").show();
                $("#osy-DataFile").empty();
                $("#osy-DataFile").html('');
                $("#osy-DataFile").append(table);
                //$("#osy-downloadDataFile").show();
                //ne moramo updateovati S3 sa data file
                // if (Base.AWS_SYNC == 1){
                //     Base.updateSync(model.casename, "data.txt");
                // }
                if(Base.HEROKU == 0){
                    $("#osy-run").show();
                    $("#osy-solver").show();
                }
                //Message.clearMessages();
                //Message.bigBoxSuccess('Generate message', message, 3000);
                Message.smallBoxInfo('Generate message', message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        //$( "#osy-generateDataFile" ).trigger( "click" );

        $("#osy-run").off('click');
        $("#osy-run").on('click', function (event) {
            Pace.restart();
            let solver = $('input[name="solver"]:checked').val();
            Osemosys.run(model.casename, solver)
            .then(response => {
                if(response.status_code=="success"){

                    $(".runOutput").show();
                    $(".Results").show();
                    // $("#osy-downloadResultsFile").show();
                    $("#osy-runOutput").empty();
                    $("#osy-runOutput").html('<samp>'+ response.message +'</samp>');
                    $('#tabs a[href="#tabRunOutput"]').tab('show');

                    Base.getResultCSV(model.casename)
                    .then(csvs => {
                        console.log('csv ', csvs)
                        Html.renderCSV(csvs)
                    });
                    Message.clearMessages();
                    Message.bigBoxSuccess('RUN message', response.message, 3000);
                }
                if(response.status_code=="error"){
                    $(".runOutput").show();
                    $(".Results").show();
                    $("#osy-runOutput").empty();
                    $("#osy-runOutput").html('<samp>'+ response.message +'</samp>');
                    Message.clearMessages();
                    let errormsg
                    if(response.stdmsg == ""){
                        errormsg = 'Error occured during GLPK run!'
                    }else{
                        errormsg = response.stdmsg
                    }
                    Message.bigBoxDanger('RUN message', errormsg , 3000);
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

    }
}





