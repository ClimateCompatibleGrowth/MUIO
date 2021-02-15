import { Message } from "../../Classes/Message.Class.js";
import { DefaultObj } from "../../Classes/DefaultObj.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { SmartAdmin } from "../../Classes/SmartAdmin.Class.js";
import { Model } from "../Model/AddCase.Model.js";
import { Navbar } from "./Navbar.js";
import { JqxSources } from "../../Classes/JqxSources.Class.js";

export default class AddCase {
    static onLoad(){
        Base.getSession()
        .then(response => {
            let casename = response.session;
            const promise = [];
            let genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData);
            return Promise.all(promise);
        })
        .then(data => {
            let [genData] = data;
            let model = new Model(genData);
            this.initPage(model);
        })
        .catch(error =>{
            Message.danger(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        $('a[href="#tabComms"]').click();
        //Navbar.initPage(model.casename, model.pageId);
        Html.title(model.casename);
        Html.genData(model);

        Grid.commGrid(model.commodities);
        //Grid.techsGrid(model.srcTech, model.srcComm);
        Grid.emisGrid(model.emissions);

        // var daGrid = new $.jqx.dataAdapter(model.srcTech);
        // let $divGrid = $("#osy-gridTech");
        // Grid.Grid($divGrid, daGrid, model.columnsTech)

        if (model.casename == null){
            Message.info("Please select case or create new case study!");
        }else{
            $("#osy-new").show();
        }    
        loadScript("References/smartadmin/js/plugin/ion-slider/ion.rangeSlider.min.js", SmartAdmin.rangeSlider.bind(null, model.years));
        this.initEvents(model);
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response=>{
            Message.clearMessages();
            const promise = [];
            let genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData);
            return Promise.all(promise);
        })
        .then(data => {
            let [genData] = data;
            let model = new Model(genData, "AddCase");
            AddCase.initPage(model);
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
            AddCase.refreshPage(casename);
            Message.smallBoxInfo("Case selection", casename + " is selected!", 3000);
        });

        function render(message, input) {
            if (this._message) {
                this._message.remove();
            }
            this._message = $("<span class='jqx-validator-error-label'>" + message + "</span>")
            this._message.appendTo("#yearsselectmsg");
            Message.smallBoxWarning("Selection", "Case has to have one year at least!", 3000);
            return this._message;
        }

        $("#osy-caseForm").jqxValidator({
            hintType: 'label',
            animationDuration: 500,
            rules : [
                { input: '#osy-casename', message: "Case name is required field!", action: 'keyup', rule: 'required' },
                { input: '#osy-casename', message: "Entered case name is not allowed!", action: 'keyup', rule: function (input, commit) {
                         var casename = $( "#osy-casename" ).val();
                         var result = (/^[a-zA-Z0-9-_ ]*$/.test(casename));
                         return result;
                    }
                },
                { input: '#osy-dr', message: "Dicount rate is required field!", action: 'keyup', rule: 'required' },
                { input: '#osy-dr', message: "Dicount rate should be zero or positive value!", action: 'keyup', rule: function (input, commit) {
                         var dr = $( "#osy-dr" ).val();
                        //  console.log(dr)
                        //  console.log(dr < 0 ? true : false);
                         return dr < 0 || isNaN(dr) ? false : true;
                    }
                },
                { input: '#osy-dm', message: "Depreciation method is required field!", action: 'keyup', rule: 'required' },
                { input: '#osy-dm', message: "Depreciation method should be zero or positive value!", action: 'keyup', rule: function (input, commit) {
                         var dr = $( "#osy-dm" ).val();
                         return dr < 0 || isNaN(dr) ? false : true;
                    }
                },
                { input: '#osy-ns', message: "Number of seasons is required field!", action: 'keyup', rule: 'required' },
                { input: '#osy-ns', message: "Number of seasons should be zero or positive value!", action: 'keyup', rule: function (input, commit) {
                         var dr = $( "#osy-ns" ).val();
                         return dr < 0 || isNaN(dr) ? false : true;
                    }
                },
                { input: '#osy-dt', message: "Day type is required field!", action: 'keyup', rule: 'required' },
                { input: '#osy-dt', message: "Day type should be zero or positive value!", action: 'keyup', rule: function (input, commit) {
                         var dr = $( "#osy-dt" ).val();
                         return dr < 0 || isNaN(dr) ? false : true;
                    }
                },
                { input: '#osy-date', message: "Date is required field!", action: 'change', rule: 'required'},
                { input: '#osy-years', message: 'Select at least one year', action: 'change', hintRender: render, rule: function () {
                    var elements = $('#osy-years').find('input[type=checkbox]');
                    var check = false;
                    var result = $.grep(elements, function(element, index) {
                        if(element.checked==true)
                            check=true;
                        });
                    return (check);
                    }
                }
            ]
        });

        $("#osy-new").on('click', function(event){
            event.preventDefault();
            event.stopImmediatePropagation();
            //$( "#wid-id-8" ).tabs({ active: 'tabComms' });
            //$("#wid-id-8").tabs("option", "active", 0);
            AddCase.refreshPage(null);
            $("#osy-new").hide();
            Message.smallBoxConfirmation("Confirmation!", "Configure new case study!", 3500);
        });

        $("#osy-save").off('click');
        $("#osy-save").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            $("#osy-caseForm").jqxValidator('validate')
        });

        $("#osy-caseForm").off('validationSuccess');
        $("#osy-caseForm").on('validationSuccess', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();

            //let techData = $('#osy-gridTech').jqxGrid('getrows');
            // let TECH = [];
            // $.each(techData, function (index, value) {
            //     let tmp = {};
            //     tmp.TechId = value.TechId;
            //     tmp[value.TechId] = value.Tech;
            //     tmp.Tech = value.Tech;
            //     tmp.Desc = value.Desc;
            //     tmp.IAR = value.IAR;
            //     tmp.OAR = value.OAR;
            //     tmp.TMPAL = value.TMPAL;
            //     tmp.TMPAU = value.TMPAU;

            //     TECH.push(tmp);
            // });

            let TECH = model.techs;

            let commData = $('#osy-gridComm').jqxGrid('getrows');
            let COMM = [];
            $.each(commData, function (index, value) {
                let tmp = {};
                tmp.CommId = value.CommId;
                tmp[value.CommId] = value.Comm;
                tmp.Comm = value.Comm;
                tmp.Desc = value.Desc;
                tmp.UnitId = value.UnitId;
                COMM.push(tmp);
            });

            let emisData = $('#osy-gridEmis').jqxGrid('getrows');
            let EMIS = [];
            $.each(emisData, function (index, value) {
                let tmp = {};
                tmp.EmisId = value.EmisId;
                tmp[value.EmisId] = value.Emis;
                tmp.Emis = value.Emis;
                tmp.Desc = value.Desc;
                tmp.UnitId = value.UnitId;
                EMIS.push(tmp);
            });


            var casename = $( "#osy-casename" ).val();
            var desc = $( "#osy-desc" ).val();
            var date = $( "#osy-date" ).val();
            var currency = $( "#osy-currency" ).val();
            var dr = $( "#osy-dr" ).val();
            var dm = $( "#osy-dm" ).val();
            var ns = $( "#osy-ns" ).val();
            var dt = $( "#osy-dt" ).val();

            var years = new Array();
            $.each($('input[type="checkbox"]:checked'), function (key, value) {
                years.push($(value).attr("id"));
            });

            let POSTDATA = {
                "osy-version": "1.0",
                "osy-casename":casename,
                "osy-desc":desc,
                "osy-date": date,
                "osy-currency":currency,
                "osy-dr": dr,
                "osy-dm": dm,
                "osy-ns": ns,
                "osy-dt": dt,
                "osy-tech": TECH,
                "osy-comm": COMM,
                "osy-emis": EMIS,
                "osy-years": years
            }
            Osemosys.saveCase(POSTDATA)
            .then(response =>{
                if(response.status_code=="created"){
                    $("#osy-new").show();
                    Message.clearMessages();
                    Message.bigBoxSuccess('Case study message', response.message, 3000);
                    Html.appendCasePicker(casename, casename);
                    $("#osy-case").html(casename);
                }
                if(response.status_code=="edited"){
                    $("#osy-case").html(casename);
                    $("#osy-new").show();
                    Navbar.initPage(casename);
                    Message.bigBoxInfo('Case study message', response.message, 3000);
                }
                if(response.status_code=="exist"){
                    $("#osy-new").show();
                    Message.bigBoxWarning('Case study message', response.message, 3000);
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });

        $("#osy-addTech").off('click');
        $("#osy-addTech").on("click", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let defaultTech = DefaultObj.defaultTech();
            //tech grid se pravi dinalicki potrebno je updatovati model
            //JSON parse strungify potrebno da iz nekog razloga izbacino elemente uid boundindex...
            model.techs.push(JSON.parse(JSON.stringify(defaultTech[0], ['TechId', 'Tech', 'Desc', 'IAR', 'OAR', 'EAR', 'TMPAL', 'TMPAU', 'CAU', 'OL'] )));
            //model.techs.push(defaultTech[0]);
            $("#osy-gridTech").jqxGrid('addrow', null, defaultTech);
            //upat eza broj techs u tabu
            model.techCount++;
            $("#techCount").text(model.techCount);
        });

        $(document).undelegate(".deleteTech","click");
        $(document).delegate(".deleteTech","click",function(e){
        //$(".deleteTech").on("click", function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('data-id');
            if(id!=0){
                $("#osy-gridTech").jqxGrid('deleterow', id);
                model.techCount--;
                $("#techCount").text(model.techCount);
            }
        });

        $("#osy-addComm").off('click');
        $("#osy-addComm").on("click", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let defaultComm = DefaultObj.defaultComm();
            $("#osy-gridComm").jqxGrid('addrow', null, defaultComm);
            model.commCount++;
            $("#commCount").text(model.commCount);
        });

        $(document).undelegate(".deleteComm","click");
        $(document).delegate(".deleteComm","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('data-id');
            if(id!=0){
                $("#osy-gridComm").jqxGrid('deleterow', id);
                model.commCount--;
                $("#commCount").text(model.commCount);
            }
        });

        $("#osy-addEmis").off('click');
        $("#osy-addEmis").on("click", function(event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let defaultEmi = DefaultObj.defaultEmi();
            $("#osy-gridEmis").jqxGrid('addrow', null, defaultEmi);
            model.emisCount++;
            $("#emisCount").text(model.emisCount);
        });

        $(document).undelegate(".deleteEmis","click");
        $(document).delegate(".deleteEmis","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('data-id');
            if(id!=0){
                $("#osy-gridEmis").jqxGrid('deleterow', id);
                model.emisCount--;
                $("#emisCount").text(model.emisCount);
            }
        });

        $(".nav-tabs li a").off('click');
        $('.nav-tabs li a').on("click", function(event, ui) { 
            var id = $(this).attr('id');
            if (id == 'Techs'){
                let commData = $('#osy-gridComm').jqxGrid('getrows');
                model.commodities = commData;
                let emiData = $('#osy-gridEmis').jqxGrid('getrows');
                model.emissions = emiData;
                model.srcTech = JqxSources.srcTech(model.techs);
                model.srcComm = JqxSources.srcComm(model.commodities);
                model.srcEmi = JqxSources.srcEmi(model.emissions);
                // model.columnsTech = JqxSources.techGridColumns(new $.jqx.dataAdapter(model.commodities));

                // var daGrid = new $.jqx.dataAdapter(model.srcTech);
                // let $divGrid = $("#osy-gridTech");
                // Grid.Grid($divGrid, daGrid, model.columnsTech)

                //console.log(model.srcEmi);
                Grid.techsGrid(model.srcTech, model.srcComm, model.srcEmi);
                // $('#osy-gridTech').jqxGrid('updatebounddata');
                // $('#osy-gridTech').jqxGrid('refresh');
            }
        });

        $("#osy-gridTech").on('cellvaluechanged', function (event) {
            Pace.restart();
            var args = event.args;
            var column = event.args.datafield;
            var rowBoundIndex = args.rowindex;
            var value = args.newvalue;
            var techId = $('#osy-gridTech').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
            $.each(model.techs, function (id, obj) {
                if(obj.TechId == techId){
                    if(column != 'IAR' && column != 'OAR'&& column != 'EAR'){
                        obj[column] = value;
                    }else{
                        console.log('save value ', value)
                        if(value.includes(',') && value){
                            var array = value.split(',');
                        }else if (value){
                            var array=[];
                            array.push(value);
                        }else{
                            var array=[];
                        }
                        //console.log('array value ', array)
                        obj[column] = array;
                    }
                }
            });
        });

        $("#osy-checkAll").on("click", function(event) {
            event.preventDefault();
            var elements = $('#osy-years').find('input[type=checkbox]');
            $.grep(elements, function(element, index) {
                element.checked=true;
            });
            $("#osy-caseForm").jqxValidator('validateInput', '#osy-years');
        });

        $("#osy-uncheckAll").on("click", function(event) {
            event.preventDefault();
            var elements = $('#osy-years').find('input[type=checkbox]');
            $.grep(elements, function(element, index) {
                    element.checked=false;
            });
            $("#osy-caseForm").jqxValidator('validateInput', '#osy-years');
        });

        $("#osy-x2").on("click", function(event) {
            event.preventDefault();
            var elements = $('#osy-years').find('input[type=checkbox]');
            $.grep(elements, function(element, index) {
                if((index) % 2 == 0)
                element.checked=true;
            });
            $("#osy-caseForm").jqxValidator('validateInput', '#osy-years');
        });

        $("#osy-x5").on("click", function(event) {
            event.preventDefault();
            var elements = $('#osy-years').find('input[type=checkbox]');
            $.grep(elements, function(element, index) {
                if((index) % 5 == 0)
                element.checked=true;
            });
            $("#osy-caseForm").jqxValidator('validateInput', '#osy-years');
        });

    }
}





