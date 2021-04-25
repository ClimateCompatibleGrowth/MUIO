import { Message } from "../../Classes/Message.Class.js";
import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { SmartAdmin } from "../../Classes/SmartAdmin.Class.js";
import { Model } from "../Model/DataFile.Model.js";
import { Navbar } from "./Navbar.js";
import { JqxSources } from "../../Classes/JqxSources.Class.js";

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
            let model = new Model(casename, "DataFile");
            if(casename){
                this.initPage(model);
                this.initEvents(model);
                ;
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
            Message.info("Please select case or create new case study!");
        }    
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
            let model = new Model(casename, "DataFile");
            $("#DataFile").hide();
            $("#osy-DataFile").empty();
            $("#osy-runOutput").empty();
            $("#osy-downloadDataFile").hide();
            $("#osy-run").hide();
            $("#runOutput").hide();
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


        $("#osy-generateDataFile").off('click');
        $("#osy-generateDataFile").on('click', function (event) {
            Pace.restart();
            //console.log('model casenam ', model.casename);
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
                $("#runOutput").hide();
                var table = $("<table />");
                var rows = DataFile.split("\n");               
                for (var i = 0; i < rows.length; i++) {
                    var row = $("<tr />");
                    var cells = rows[i].split(" ");
                    //var cells = rows[i].match(/.{1,50}/g);
                    if (cells !== null){
                        //console.log('cells ', cells)
                        for (var j = 0; j < cells.length; j++) {
                            var cell = $("<td />");
                            cells[j] = cells[j].replace(/ /g, '&nbsp;');
                            cell.html(cells[j]);
                            row.append(cell);
                        }
                        table.append(row);
                    }
                }

                $("#DataFile").show();
                $("#osy-DataFile").empty();
                $("#osy-DataFile").html('');
                $("#osy-DataFile").append(table);
                $("#osy-downloadDataFile").show();
                if (Base.AWS_SYNC == 1){
                    Base.updateSync(model.casename, "data.txt");
                }
                if(Base.HEROKU == 0){
                    $("#osy-run").show();
                }
                Message.clearMessages();
                Message.bigBoxSuccess('Generate message', message, 3000);
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        
        // $("#osy-downloadDataFile").off('click');
        // $("#osy-downloadDataFile").on('click', function (event) {
        //     Pace.restart();
        //     Osemosys.downloadDataFile(model.casename)
        //     .then(response => {
        //         Message.clearMessages();
        //         Message.bigBoxSuccess('Downlaoad message', response.message, 3000);
        //     })
        //     .catch(error=>{
        //         Message.bigBoxDanger('Error message', error, null);
        //     })
        // });

        $("#osy-run").off('click');
        $("#osy-run").on('click', function (event) {
            Pace.restart();
            Osemosys.run(model.casename)
            .then(response => {
                //console.log(response)
                if(response.status_code=="success"){
                    $("#runOutput").show();
                    $("#osy-runOutput").empty();
                    $("#osy-runOutput").html('<samp>'+ response.message +'</samp>');
                    Message.clearMessages();
                    Message.bigBoxSuccess('RUN message', response.message, 3000);
                }
                if(response.status_code=="error"){
                    $("#runOutput").show();
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





