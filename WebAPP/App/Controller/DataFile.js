import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Model } from "../Model/DataFile.Model.js";
import { MessageSelect } from "./MessageSelect.js";
import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { Sidebar } from "./Sidebar.js";

export default class DataFile {
    static onLoad() {
        Message.loaderStart('Loading data...');
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
                console.log('casename ', casename)
                let model = new Model(casename, genData, resData, "DataFile");
                console.log('casename from model ', model.casename)
                if (casename) {
                    this.initPage(model);
                } else {
                    Message.loaderEnd();
                    MessageSelect.init(DataFile.refreshPage.bind(DataFile));
                }
            })
            .catch(error => {
                Message.loaderEnd();
                Message.danger(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();
        //Navbar.initPage(model.casename, model.pageId);
        Html.title(model.casename, model.title, "");
        Html.renderCases(model.cases);
        //potrebno je napraviti render svih scenarija (mozda je dodan novi scenario u medjuvremenu), on mora biti dodan u listu scenarija po case run samo sto nece biti aktivan
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
        Message.loaderStart('Loading data...');
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
                $("#osy-lpOutput").empty();
                // $("#osy-downloadDataFile").hide();
                // $("#osy-downloadResultsFile").hide();
                $("#osy-solver").hide();
                $("#osy-run").hide();
                $(".runOutput").hide();
                $(".lpOutput").hide();
                $(".Results").hide();
                DataFile.initPage(model);
                DataFile.initEvents(model);
            })
            .catch(error => {
                Message.loaderEnd();
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
            console.log('model, ', model)

            if(model.cs in  model.scBycs){
                Html.renderScOrder( model.scBycs[model.cs]);
            }else{
                Html.renderScOrder(model.scenarios);
            }

            //nove scenarije dodjeamo sad u modelu ovaj dio je nepotreban
            // if(model.cs in  model.scBycs){
            //     //pored originalnih scenarija u caserunu, potrebno dodati eventualno nove 
            //     //scenarije koji su dodani poslije uspjesnog RUN-a, kao neaktivne
            //     let sccsMap = {};
            //     $.each(model.scBycs[model.cs], function (id, scObj) {
            //         sccsMap[scObj.ScenarioId] = scObj;
            //     });
            //     //create shallow copy of array
            //     let scArray = model.scBycs[model.cs].slice()
            //     $.each(model.scenarios, function (key, obj) {
            //         if(obj.ScenarioId in sccsMap === false){
            //             console.log('obj.Scenario ', obj.Scenario)
            //             let sc = JSON.parse(JSON.stringify(obj));
            //             sc.Active = false;
            //             console.log('sc ', sc)
            //             scArray.push(sc);
            //         }
            //     });
            //     Html.renderScOrder(scArray);
            // }else{
            //     Html.renderScOrder(model.scenarios);
            // }
            
        });

        $("#btnSaveOrder").off('click');
        $("#btnSaveOrder").on('click', function (event) {
            Message.clearMessages();
            Message.bigBoxSuccess('Sceanario order', 'You have updated scenarios order data!', 3000);
            $('#osy-order').modal('toggle');

            //nema potrebe da spasavmo scenario order jer se on ada nalazi u resData
            // let order = $("#osy-scOrder").jqxSortable("toArray")
            // var scAcitive = new Array();
            // $.each($('input[type="checkbox"]:checked'), function (key, value) {
            //     scAcitive.push($(value).attr("id"));
            // });
            // let scOrder = DefaultObj.defaultScenario(true);

            // $.each(order, function (id, sc) {
            //     let tmp = {};
            //     if (scAcitive.includes(sc)) {
            //         tmp['ScenarioId'] = sc;
            //         tmp['Scenario'] = model.scMap[sc]['Scenario'];
            //         tmp['Desc'] = model.scMap[sc]['Desc'];
            //         tmp['Active'] = true
            //     } else {
            //         tmp['ScenarioId'] = sc;
            //         tmp['Scenario'] = model.scMap[sc]['Scenario'];
            //         tmp['Desc'] = model.scMap[sc]['Desc'];
            //         tmp['Active'] = false;
            //     }
            //     scOrder.push(tmp);
            // });

            // Osemosys.saveScOrder(scOrder, model.casename)
            // .then(response => {
            //     if (response.status_code == "success") {
            //         $('#osy-order').modal('toggle');
            //         model.scenarios = scOrder;
            //         Message.clearMessages();
            //         Message.bigBoxSuccess('Sceanario order', response.message, 3000);
            //         //sync S3
            //         if (Base.AWS_SYNC == 1) {
            //             Base.updateSync(model.casename, "genData.json");
            //         }
            //     }
            // })
            // .catch(error => {
            //     Message.bigBoxDanger('Error message', error, null);
            // })
        });

        $("#osy-caseRun").jqxValidator({
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
            $("#osy-caseRun").jqxValidator('validate')
        });

        $("#osy-updateCaseRun").off('click');
        $("#osy-updateCaseRun").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            update = true;
            $("#osy-caseRun").jqxValidator('validate')
        });

        $("#osy-newCaseRun").off('click');
        $("#osy-newCaseRun").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Html.title(model.casename, model.title, "");
            Html.renderScOrder(model.scenarios);
            model.cs = '';
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
            $(".lpOutput").hide();
            $(".DataFile").hide();
            $(".Results").hide();
        });

        $("#osy-caseRun").off('validationSuccess');
        $("#osy-caseRun").on('validationSuccess', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            Pace.restart();

            var caserunname = $("#osy-casename").val();
            let oldcaserunname = model.cs;
            var desc = $("#osy-desc").val();

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
                "Scenarios": scOrder
            }

            if (update) {
                Osemosys.updateCaseRun(model.casename, caserunname, oldcaserunname, caseData)
                .then(response => {
                    if (response.status_code == 'success') {
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
                        $(".lpOutput").hide();
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
            Message.loaderStart('Generating data file!')
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
                    $("#osy-lpOutput").empty();
                    $(".runOutput").hide();
                    $(".lpOutput").hide();
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
                    Message.loaderEnd();
                    Message.smallBoxInfo('Generate message', message, 3000);
                })
                .catch(error => {
                    Message.loaderEnd();
                    Message.bigBoxDanger('Error message', error, null);
                })
        });
        //$( "#osy-generateDataFile" ).trigger( "click" );

        $("#osy-run").off('click');
        $("#osy-run").on('click', function (event) {
            Pace.restart();
            Message.loaderStart('Optimization in process!')
            //promijenjeno da radimo samo sa cBCsolverom
            //let solver = $('input[name="solver"]:checked').val();
            let solver = 'cbc';
            Osemosys.run(model.casename, solver, model.cs)
            .then(response => {
                if (response.status_code == "success") {
                    Message.loaderEnd();
                    $(".runOutput").show();
                    $(".lpOutput").show();
                    $(".Results").show();
                    $("#osy-runOutput").empty();
                    $("#osy-runOutput").html('<pre class="log-output">' + response.cbc_message, response.cbc_stdmsg+ '</pre>');
                    $("#osy-lpOutput").empty();
                    $("#osy-lpOutput").html('<pre class="log-output">' + response.glpk_message, response.glpk_stdmsg+ '</pre>');
                    Base.getResultCSV(model.casename, model.cs)
                        .then(csvs => {
                            Html.renderCSV(csvs, model.cs)
                        });
                    Sidebar.Reload(model.casename);
                    Message.clearMessages();
                    Message.successOsy('Optimiziation finished! <small><i class="">' + response.timer +'</i></small>');
                }
                if (response.status_code == "error") {
                    Message.loaderEnd();
                    $(".runOutput").show();
                    $(".lpOutput").show();
                    $(".Results").show();
                    $("#osy-runOutput").empty();
                    $("#osy-runOutput").html('<pre class="log-output">' + response.cbc_message, response.cbc_stdmsg+ '</pre>');
                    $("#osy-lpOutput").empty();
                    $("#osy-lpOutput").html('<pre class="log-output">' + response.glpk_message, response.glpk_stdmsg+ '</pre>');
                    Message.clearMessages();
                    let errormsg = '';
                    if (response.glpk_message != "" || response.glpk_stdmsg != "") {
                        errormsg += 'Error occured during creation of LP file, GLPK run! See LP file (GLPK) log for more details. '
                    } 
                    if (response.cbc_message != "" || response.cbc_stdmsg != "") {
                        errormsg += 'Error occured during optimization process, CBC run! See CBC solver log for more details.'
                    } 

                    Message.dangerOsy(errormsg);
                }
            })
            .catch(error => {
                Message.loaderEnd();
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        $("#osy-Cases").off('click');
        $("#osy-Cases").on('click', '.selectCS', function (e) {
            //$(document).delegate(".selectCS","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            Html.renderScOrder( model.scBycs[model.cs]);
            console.log('model, ', model)
            var caserunanme = $(this).attr('data-ps');
            model.cs = caserunanme;
            Html.renderScOrder( model.scBycs[model.cs]);

            Html.resData(model);
            Html.title(model.casename, model.title, caserunanme);

            $("#osy-createCaseRun").hide();
            $("#osy-updateCaseRun").show();
            $("#osy-newCaseRun").show();

            $("#osy-generateDataFile").hide();
            $("#osy-solver").hide();
            $("#osy-run").hide();

            $(".runOutput").hide();
            $(".lpOutput").hide();            

            Osemosys.readDataFile(model.casename, model.cs)
            .then(response => {
                let DataFile = response;
                const promise = [];
                promise.push(DataFile);
                let ResultCSV = Base.getResultCSV(model.casename, model.cs)
                promise.push(ResultCSV);
                return Promise.all(promise);
            })
            .then(data => {
                let [DataFile, ResultCSV] = data;
                if (ResultCSV.length != 0) {
                    $(".Results").show();
                    Html.renderCSV(ResultCSV, model.cs)
                } 
                if (DataFile) {
                    $(".DataFile").show();
                    Html.renderDataFile(DataFile, model);
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
            Message.smallBoxInfo("Case selection", caserunanme + " is selected!", 3000);
        });

        //$(document).delegate(".deleteCase", "click", function (e) {
        // $(".deleteCase").off('click');
        // $(".deleteCase").on('click', function (e) {
        //$("#osy-Cases").off('click');
        $("#osy-Cases").on('click', '.deleteCase', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var caserunname = $(this).attr('data-ps');
            $.SmartMessageBox({
                title: "Confirmation Box!",
                content: "You are about to delete <b class='danger'>" + caserunname + "</b> Model! Are you sure?",
                buttons: '[No][Yes]'
            }, function (ButtonPressed) {
                if (ButtonPressed === "Yes") {
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

                                if (model.cs == caserunname || model.cs == ''){
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
                                    $(".lpOutput").hide();
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

        Message.loaderEnd();
    }
}





