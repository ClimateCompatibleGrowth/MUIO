import { Message } from "../../Classes/Message.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { SyncS3 } from "../../Classes/SyncS3.Class.js";
import { Model } from "../Model/Home.Model.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { Navbar } from "./Navbar.js";
import { Sidebar } from "./Sidebar.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Routes } from "../../Routes/Routes.Class.js";

export default class Home {
    static async onLoad(){
        if (Base.AWS_SYNC == 1 && Base.INIT_SYNC){
            $('#loadermain h4').text('Syncronizing with S3 Bucket!'); 
            $('#loadermain').show();
            await Base.initSyncS3()
            .then(response => {
                Message.smallBoxInfo('Sync message', response.message, 3000);
                Base.INIT_SYNC = 0;
            })
        }
        Base.getSession()
        .then(response =>{
            let casename = response.session;
            const promise = [];
            promise.push(casename);

            let cases = Base.getCaseStudies();
            promise.push(cases);
            $('#loadermain').hide();
            return Promise.all(promise);
        })
        .then(data => {
            let [ casename, cases] = data;
            let model = new Model(casename, cases);
            this.initPage(model);
        })
        .catch(error =>{ 
            Message.danger(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        Navbar.initPage(model.casename);
        // Sidebar.Load(model.genData, model.PARAMETERS, model.RESULTPARAMETERS);
        Sidebar.Reload(model.casename);
        Html.renderModels(model.cases, model.casename);
        Home.initEvents(model);
        loadScript("References/smartadmin/js/plugin/dropzone/dropzone.min.js", Base.uploadFunction);
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            let cases = Base.getCaseStudies();
            promise.push(cases);
            return Promise.all(promise);
        })
        .then(data => {
            let [ casename, cases] = data;
            let model = new Model(casename, cases);
            this.initPage(model);
        })
        .catch(error =>{ 
            Message.danger(error);
        });
    }

    static initEvents(model){
        
        $("#cases").tooltip({ selector: '[data-toggle=tooltip]' });

        $("#casePicker").off('click');
        $("#casePicker, #cases").on('click', '.selectCS', function(e) {
        //$(document).delegate(".selectCS","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            //Html.updateCasePicker(casename);
            //Sidebar.Load(casename, model.genData, model.PARAMETERS);
            Home.refreshPage(casename);
            Message.smallBoxInfo("Case selection", casename + " is selected!", 3000);
        });

        $("#cases").on('click', '.editPS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);

            Base.setSession(casename)
            .then(response=>{
                $('#Navi>li').removeClass('active');
                $('#Navi').children('li').eq(2).addClass('active');
                hasher.setHash("#");
                hasher.setHash("#AddCase");
            })
            .catch(error=>{
                Message.danger(error);
            })
        });

        //copy case
        $(document).delegate(".copyCS","click",function(e){
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Base.copyCaseStudy(casename)
            .then(response => {
                Message.clearMessages();
                if(response.status_code=="success"){
                    Message.bigBoxSuccess('Copy message', response.message, 3000);
                    //REFRESH
                    Html.apendModel(casename+'_copy');
                    Html.appendCasePicker(casename+'_copy', null)
                    if (Base.AWS_SYNC == 1){
                        SyncS3.deleteResultsPreSync(casename)
                        .then(response =>{
                            SyncS3.uploadSync(casename+'_copy');
                        });  
                    }
                }
                if(response.status_code=="warning"){
                    Message.bigBoxWarning('Copy message', response.message, 3000);
                }

            })
            .catch(error =>{ 
                Message.danger(error);
            });
        });

        //get descrition
        $(document).delegate(".descriptionPS","click",function(e){
            //e.stopImmediatePropagation();
            var titleps = $(this).attr('data-ps');
            Base.getCaseDesc(titleps)
            .then(response => {
                Message.clearMessages();
                $('#mdescriptionps').html(response.desc);
            })
            $('#mtitleps_desc').html('<i class="ace-icon fa fa-info-circle"></i>  ' + titleps);
        });

        //delete case
        $(document).delegate(".deleteModel","click",function(e){
            var casename = $(this).attr('data-ps');
            $.SmartMessageBox({
                title : "Confirmation Box!",
                content : "You are about to delete <b class='danger'>" + casename + "</b> Model! Are you sure?",
                buttons : '[No][Yes]'
            }, function(ButtonPressed) {
                if (ButtonPressed === "Yes") {
                    Base.deleteCaseStudy(casename)
                    .then(response => {
                        Message.clearMessages();
                        if(response.status_code=="success"){
                            Message.bigBoxSuccess('Delete message', response.message, 3000);
                            //REFRESH
                            Html.removeCase(casename);
                            //sync with s3
                            if (Base.AWS_SYNC == 1){
                                SyncS3.deleteSync(casename);
                            }
                        }
                        if(response.status_code=="success_session"){
                            Message.bigBoxSuccess('Delete message', response.message, 3000);
                            Message.info( "Please select existing or create new case to proceed!");
                            if (model.casename = casename){
                                // Sidebar.Load(null, null);
                                Sidebar.Reload(null);
                                //Routes.removeRoutes(model.PARAMETERS);
                            }
                            //REFRESH
                            Html.removeCase(casename);
                            if (Base.AWS_SYNC == 1){
                                Base.deleteSync(casename);
                            }
                        }
                        if(response.status_code=="info"){
                            Message.info(response.message);
                        }
                        if(response.status_code=="warning"){
                            Message.warning(response.message);
                        }  
                        
                    })
                    .catch(error =>{ 
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

        //Search cases
        $('#CaseSearch').keyup(function () {
            var query = $.trim($('#CaseSearch').val()).toLowerCase();
            $('.selectPS').each(function () {
                var $this = $(this);
                if ($this.text().toLowerCase().indexOf(query) === -1)
                    $this.closest('.panel').fadeOut();
                else $this.closest('.panel').fadeIn();
            });
        })

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`
                <h5>${DEF[model.pageID].title}</h5>
                ${DEF[model.pageID].definition}
            `);
            $('#definition').toggle('slow');
        });
    }
}