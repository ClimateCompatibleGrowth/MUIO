import { Message } from "../../Classes/Message.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Model } from "../Model/Home.Model.js";
import { Navbar } from "./Navbar.js";

export default class Home {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let selectedCS = response['session']
            Base.getCaseStudies()
            .then(cases => {
                let model = new Model(cases, selectedCS);
                this.initPage(model);
            })
            .catch(error =>{ 
                Message.danger(error);
            });
        })
        .catch(error =>{ 
            Message.danger(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        Navbar.initPage(model.casename);
        Html.renderCases(model.cases, model.casename);
        Home.initEvents();
        loadScript("References/smartadmin/js/plugin/dropzone/dropzone.min.js", Base.uploadFunction);
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response=>{
            let selectedCS = casename
            Base.getCaseStudies()
            .then(cases => {
                Message.clearMessages();
                let model = new Model(cases, selectedCS);
                this.initPage(model);
            })
            .catch(error =>{ 
                Message.danger(error);
            });
        })
        .catch(error=>{
            Message.danger(error);
        })
    }

    static initEvents(){
        
        $("#cases").tooltip({ selector: '[data-toggle=tooltip]' });

        $("#casePicker").off('click');
        $("#casePicker, #cases").on('click', '.selectCS', function(e) {
        //$(document).delegate(".selectCS","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
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
                $('#Navi').children('li').eq(1).addClass('active');
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
            var titleps = $(this).attr('data-ps');
            Base.copyCaseStudy(titleps)
            .then(response => {
                Message.clearMessages();
                if(response.status_code=="success"){
                    Message.bigBoxSuccess('Copy message', response.message, 3000);
                    //REFRESH
                    Html.apendCase(titleps+'_copy');
                    Html.appendCasePicker(titleps+'_copy', null)
                }
                if(response.status_code=="warning"){
                    Message.bigBoxWarning('Copy message', response.message, 3000);
                }
            })
            .catch(error =>{ 
                Message.danger(error);
            });
        });

        //backup case
        $(document).delegate(".backupCS","click",function(e){
            e.stopImmediatePropagation();
            var titleps = $(this).attr('data-ps');
            Base.backupCaseStudy(titleps)
            .then(response => {
                Message.clearMessages();
                if(response.status_code=="success"){
                    Message.bigBoxInfo('Backup info', response.message, 5000)
                }
                if(response.status_code=="info"){
                    Message.info(response.message);
                }
                if(response.status_code=="warning"){
                    Message.bigBoxWarning('Backup warning', response.message, 5000)
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
        $(document).delegate(".DeletePS","click",function(e){
            var titleps = $(this).attr('data-ps');
            $.SmartMessageBox({
                title : "Confirmation Box!",
                content : "You are about to delete <b class='danger'>" + titleps + "</b> case study! Are you sure?",
                buttons : '[No][Yes]'
            }, function(ButtonPressed) {
                if (ButtonPressed === "Yes") {
                    Base.deleteCaseStudy(titleps)
                    .then(response => {
                        Message.clearMessages();
                        if(response.status_code=="success"){
                            Message.bigBoxSuccess('Delete message', response.message, 3000);
                            //REFRESH
                            Html.removeCase(titleps);
                        }
                        if(response.status_code=="success_session"){
                            Message.bigBoxSuccess('Delete message', response.message, 3000);
                            Message.info( "Please select existing or create new case to proceed!");
                            //REFRESH
                            Html.removeCase(titleps);
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
    }
}