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
    static onLoad() {
        Base.getSession()
            .then(response => {
                let casename = response.session;
                const promise = [];
                promise.push(casename);
                let genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const resData = Osemosys.getResultData(casename, 'resData.json');
                promise.push(resData);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData] = data;
                let model = new Model(casename, genData, resData, "DataFile");
                if (casename) {
                    this.initPage(model);
                } else {
                    MessageSelect.init(DataFile.refreshPage.bind(DataFile));
                }
            })
            .catch(error => {
                Message.danger(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        //Navbar.initPage(model.casename, model.pageId);
        Html.title(model.casename, model.title, "");
        Html.renderCases(model.cases);
        // console.log('model scBycs ', model.scBycs)
        // console.log('model scenarios ', model.scenarios)
        // Html.renderScOrder(model.scBycs[model.cs]);
        Html.renderScOrder(model.scenarios);
        if (model.casename == null) {
            Message.info("Please select model or create new Model!");
        }
        if (model.scenariosCount > 1) {
            $('#scCommand').show();
        }
        //loadScript("References/smartadmin/js/plugin/jquery-nestable/jquery.nestable.min.js", Nestable.init.bind(null));
        pageSetUp();
        this.initEvents(model);
    }

    static refreshPage(casename) {
        Base.setSession(casename)
            .then(response => {
                Message.clearMessages();
                const promise = [];
                promise.push(casename);
                let genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const resData = Osemosys.getResultData(casename, 'resData.json');
                promise.push(resData);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, resData] = data;
                let model = new Model(casename, genData, resData, "DataFile");
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
            .catch(error => {
                Message.bigBoxInfo(error);
            })
    }

    static initEvents(model) {

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            DataFile.refreshPage(casename);
            Message.smallBoxInfo("Case selection", casename + " is selected!", 3000);
        });

        $("#osy-btnScOrder").off('click');
        $("#osy-btnScOrder").on('click', function (event) {

            // Html.renderScOrder(model.scenarios);
            if(model.cs in  model.scBycs){
                Html.renderScOrder(model.scBycs[model.cs]);
            }else{
                Html.renderScOrder(model.scenarios);
            }
            
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
                if (scAcitive.includes(sc)) {
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = true
                } else {
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = false;
                }
                scOrder.push(tmp);
            });


            Osemosys.saveScOrder(scOrder, model.casename)
                .then(response => {
                    if (response.status_code == "success") {
                        $('#osy-order').modal('toggle');
                        model.scenarios = scOrder;
                        Message.clearMessages();
                        Message.bigBoxSuccess('Sceanario order', response.message, 3000);
                        //sync S3
                        if (Base.AWS_SYNC == 1) {
                            Base.updateSync(model.casename, "genData.json");
                        }

                    }
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });

        $("#osy-caseForm").jqxValidator({
            hintType: 'label',
            animationDuration: 500,
            rules: [
                { input: '#osy-casename', message: "Case name is required field!", action: 'keyup', rule: 'required' },
                {
                    input: '#osy-casename', message: "Entered case name is not allowed!", action: 'keyup', rule: function (input, commit) {
                        var casename = $("#osy-casename").val();
                        var result = (/^[a-zA-Z0-9-_ ]*$/.test(casename));
                        return result;
                    }
                }
            ]
        });

        let update = false;
        $("#osy-createCaseRun").off('click');
        $("#osy-createCaseRun").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            $("#osy-caseForm").jqxValidator('validate')
        });

        $("#osy-updateCaseRun").off('click');
        $("#osy-updateCaseRun").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            update = true;
            $("#osy-caseForm").jqxValidator('validate')
        });

        $("#osy-newCaseRun").off('click');
        $("#osy-newCaseRun").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Html.title(model.casename, model.title, "");
            $("#osy-casename").val(null);
            $("#osy-desc").val(null);
            $('#tabs a[href="#tabCases"]').tab('show');
            $("#osy-createCaseRun").show();
            $("#osy-updateCaseRun").hide();
            $("#osy-newCaseRun").hide();

            $("#osy-generateDataFile").hide();
            $("#osy-solver").hide();
            $("#osy-run").hide();

            $(".runOutput").hide();
            $(".DataFile").hide();
            $(".Results").hide();
        });

        $("#osy-caseForm").off('validationSuccess');
        $("#osy-caseForm").on('validationSuccess', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Pace.restart();

            var caserunname = $("#osy-casename").val();
            let oldcaserunname = model.cs;
            var desc = $("#osy-desc").val();

            //scenarios
            // let order = $("#osy-scOrder").jqxSortable("toArray")
            // var scAcitive = new Array();
            // $.each($('input[type="checkbox"]:checked'), function (key, value) {
            //     scAcitive.push($(value).attr("id"));
            // });

            // let scData = []
            // $.each(order, function (id, sc) {
            //     if (scAcitive.includes(sc)){
            //         scData.push(model.scMap[sc]['Scenario'])
            //     }
            // });

            let order = $("#osy-scOrder").jqxSortable("toArray")
            var scAcitive = new Array();

            $.each($('input[type="checkbox"]:checked'), function (key, value) {
                scAcitive.push($(value).attr("id"));
            });

            let scOrder = DefaultObj.defaultScenario(true);
            $.each(order, function (id, sc) {
                let tmp = {};
                if (scAcitive.includes(sc)) {
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = true
                } else {
                    tmp['ScenarioId'] = sc;
                    tmp['Scenario'] = model.scMap[sc]['Scenario'];
                    tmp['Desc'] = model.scMap[sc]['Desc'];
                    tmp['Active'] = false;
                }
                scOrder.push(tmp);
            });

            let caseId = DefaultObj.getId('CS');

            let caseData = {
                "Case": caserunname,
                "CaseId": caseId,
                "Desc": desc,
                "Runtime": Date().toLocaleString('en-US', { hour12: false, hour: "numeric", minute: "numeric" }),
                // "Scenarios": scData
                "Scenarios": scOrder
            }

            console.log('caseData ', caseData);
            console.log('update ', update)

            if (update) {
                Osemosys.updateCaseRun(model.casename, caserunname, oldcaserunname, caseData)
                    .then(response => {
                        if (response.status_code == 'success') {
                            console.log('update run succes')
                            model.cs = caserunname;
                            $.each(model.cases, function (id, cs) {
                                if (cs.Case == oldcaserunname) {
                                    model.cases[id] = caseData;
                                }
                            });
                            model.scBycs[model.cs] = scOrder;
                            Html.title(model.casename, model.title, caserunname);
                            Html.renderCases(model.cases);
                            $('#tabs a[href="#tabCases"]').tab('show');
                            $('#osy-generateDataFile').show();
                            $("#osy-newCaseRun").show();
                            $(".DataFile").hide();
                            $(".runOutput").hide();
                            $(".Results").hide();
                            Message.smallBoxInfo('Generate message', response.message, 3000);
                        }
                        if (response.status_code == 'exist') {
                            Message.smallBoxWarning('Generate message', response.message, 3000);
                        }
                    })
                    .catch(error => {
                        Message.bigBoxDanger('Error message', error, null);
                    })
            } else {
                Osemosys.createCaseRun(model.casename, caserunname, caseData)
                    .then(response => {
                        if (response.status_code == 'success') {
                            $('#osy-generateDataFile').show();
                            model.cs = caserunname;
                            model.cases.push(caseData);
                            model.scBycs[model.cs] = scOrder;
                            $("#osy-createCaseRun").hide();
                            $("#osy-updateCaseRun").show();
                            $("#osy-newCaseRun").show();
                            Html.renderCases(model.cases);
                            Html.title(model.casename, model.title, caserunname);
                            Message.smallBoxInfo('Generate message', response.message, 3000);
                        }
                        if (response.status_code == 'exist') {
                            Message.smallBoxWarning('Generate message', response.message, 3000);
                        }
                    })
                    .catch(error => {
                        Message.bigBoxDanger('Error message', error, null);
                    })
            }

        });

        $("#osy-generateDataFile").off('click');
        $("#osy-generateDataFile").on('click', function (event) {
            Pace.restart();
            Osemosys.generateDataFile(model.casename, model.cs)
                .then(response => {
                    if (response.status_code == "success") {
                        const promise = [];
                        let DataFile = Osemosys.readDataFile(model.casename, model.cs);
                        promise.push(DataFile);
                        promise.push(response.message);
                        return Promise.all(promise);
                    }
                })
                .then(response => {
                    let [DataFile, message] = response;
                    $(".DataFile").show();
                    $("#osy-runOutput").empty();
                    $(".runOutput").hide();
                    $(".Results").hide();
                    Html.renderDataFile(DataFile, model)
                    ///////////////////////////////////////////////////////////////////
                    //$("#osy-downloadDataFile").show();
                    //ne moramo updateovati S3 sa data file
                    // if (Base.AWS_SYNC == 1){
                    //     Base.updateSync(model.casename, "data.txt");
                    // }
                    if (Base.HEROKU == 0) {
                        $("#osy-run").show();
                        //$("#osy-solver").show();
                    }
                    //Message.clearMessages();
                    //Message.bigBoxSuccess('Generate message', message, 3000);
                    Message.smallBoxInfo('Generate message', message, 3000);
                })
                .catch(error => {
                    Message.bigBoxDanger('Error message', error, null);
                })
        });
        //$( "#osy-generateDataFile" ).trigger( "click" );

        $("#osy-run").off('click');
        $("#osy-run").on('click', function (event) {
            Pace.restart();
            $('#loadermain h4').text('Optimization in process!'); 
            $('#loadermain').show();
            //promijenjeno da radimo samo sa cBCsolverom
            //let solver = $('input[name="solver"]:checked').val();
            let solver = 'cbc';
            Osemosys.run(model.casename, solver, model.cs)
            .then(response => {
                    if (response.status_code == "success") {
                        $('#loadermain').hide();
                        $(".runOutput").show();
                        $(".Results").show();
                        // $("#osy-downloadResultsFile").show();
                        $("#osy-runOutput").empty();
                        $("#osy-runOutput").html('<samp>' + response.message + '</samp>');
                        //$('#tabs a[href="#tabRunOutput"]').tab('show');

                        Base.getResultCSV(model.casename, model.cs)
                            .then(csvs => {
                                console.log('csv ', csvs)
                                Html.renderCSV(csvs, model.cs)
                            });

                        Sidebar.Reload(model.casename);
                        Message.clearMessages();
                        Message.bigBoxSuccess('RUN message', response.message, 3000);
                    }
                    if (response.status_code == "error") {
                        $('#loadermain').hide();
                        $(".runOutput").show();
                        $(".Results").show();
                        $("#osy-runOutput").empty();
                        $("#osy-runOutput").html('<samp>' + response.message + '</samp>');
                        Message.clearMessages();
                        let errormsg
                        if (response.stdmsg == "") {
                            errormsg = 'Error occured during GLPK run!'
                        } else {
                            errormsg = response.stdmsg
                        }
                        Message.bigBoxDanger('RUN message', errormsg, 3000);
                    }
            })
            .catch(error => {
                $('#loadermain').hide();
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        $("#osy-Cases").off('click');
        $("#osy-Cases").on('click', '.selectCS', function (e) {
            //$(document).delegate(".selectCS","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var caserunanme = $(this).attr('data-ps');
            model.cs = caserunanme
            Html.resData(model);
            Html.title(model.casename, model.title, caserunanme);

            $("#osy-createCaseRun").hide();
            $("#osy-updateCaseRun").show();
            $("#osy-newCaseRun").show();

            $("#osy-generateDataFile").hide();
            $("#osy-solver").hide();
            $("#osy-run").hide();

            $(".runOutput").hide();
            $(".DataFile").show();
            $(".Results").show();

            Osemosys.readDataFile(model.casename, model.cs)
                .then(response => {
                    let DataFile = response;
                    const promise = [];
                    promise.push(DataFile);
                    let ResultCSV = Base.getResultCSV(model.casename, model.cs)
                    promise.push(ResultCSV);
                    return Promise.all(promise);

                    // if (response) {
                    //     let DataFile = response;
                    //     Html.renderDataFile(DataFile, model);
                    // } else {
                    //     $(".DataFile").hide();
                    //     $("#osy-generateDataFile").show();
                    //     Message.smallBoxWarning("Run case message", "Please generate data file!", 3000);
                    // }

                })
                .then(data => {
                    let [DataFile, ResultCSV] = data;
                    
                    if (DataFile && ResultCSV.length != 0) {
                        Html.renderDataFile(DataFile, model);
                        Html.renderCSV(ResultCSV, model.cs)
                    } 
                    else if(!DataFile && ResultCSV.length == 0){
                        $(".DataFile").hide();
                        $(".Results").hide();
                        $("#osy-generateDataFile").show();
                        Message.smallBoxWarning("Run case message", "Please generate data file!", 3000);
                    }

                })
                .catch(error => {
                    Message.danger(error);
                });
            // Base.getResultCSV(model.casename, model.cs)
            //     .then(csvs => {
            //         console.log('csv ', csvs)
            //         if (csvs.length == 0){
            //             $(".Results").hide();
            //             $("#osy-solver").show();
            //             $("#osy-run").show();
            //         }else{
            //             Html.renderCSV(csvs, model.cs)
            //         }
                    
            //     });

            Message.smallBoxInfo("Case selection", caserunanme + " is selected!", 3000);
        });

        $(document).delegate(".deleteCase", "click", function (e) {
            var caserunname = $(this).attr('data-ps');
            console.log('model.scBycs 1 ',model.scBycs)
            $.SmartMessageBox({
                title: "Confirmation Box!",
                content: "You are about to delete <b class='danger'>" + caserunname + "</b> Model! Are you sure?",
                buttons: '[No][Yes]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Yes") {
                    console.log(model.casename, caserunname)
                    Base.deleteCaseRun(model.casename, caserunname)
                        .then(response => {
                            Message.clearMessages();
                            if (response.status_code == "success") {
                                Message.bigBoxSuccess('Delete message', response.message, 3000);
                                //REFRESH
                                Html.removeCase(caserunname);
                                //remove case from model
                                model.cases = model.cases.filter(function(el) { return el.Case != caserunname; });
                                delete model.scBycs[caserunname];

                                //relod sidebar
                                Sidebar.Reload(model.casename);

                                if (model.cs == caserunname){
                                    Html.title(model.casename, model.title, '');
                                    model.cs = null;
                                    $("#osy-casename").val(null);
                                    $("#osy-desc").val(null);
                                    $("#osy-createCaseRun").show();
                                    $("#osy-updateCaseRun").hide();
                                    $("#osy-newCaseRun").hide();
                        
                                    $("#osy-generateDataFile").hide();
                                    $("#osy-solver").hide();
                                    $("#osy-run").hide();
                        
                                    $(".runOutput").hide();
                                    $(".DataFile").hide();
                                    $(".Results").hide(); 
                                }
                                //remove case from view json files
                                //sync with s3
                                if (Base.AWS_SYNC == 1) {
                                    SyncS3.deleteSync(caserunname);
                                }
                            }
                            // if(response.status_code=="success_session"){
                            //     Message.bigBoxSuccess('Delete message', response.message, 3000);
                            //     Message.info( "Please select existing or create new case to proceed!");
                            //     if (model.casename = casename){
                            //         // Sidebar.Load(null, null);
                            //         Sidebar.Reload(null);
                            //         //Routes.removeRoutes(model.PARAMETERS);
                            //     }
                            //     //REFRESH
                            //     Html.removeCase(casename);
                            //     if (Base.AWS_SYNC == 1){
                            //         Base.deleteSync(casename);
                            //     }
                            // }
                            if (response.status_code == "info") {
                                Message.info(response.message);
                            }
                            if (response.status_code == "warning") {
                                Message.warning(response.message);
                            }

                        })
                        .catch(error => {
                            console.log(error)
                            Message.danger(error);
                        });
                }
                if (ButtonPressed === "No") {
                    Message.bigBoxInfo("Confirmation message", "You pressed No...", 3000)
                }
            });
            //e.preventDefault();
            e.stopImmediatePropagation();
        });
    }
}





