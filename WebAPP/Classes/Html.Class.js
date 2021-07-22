import { CURRENCY, UNITDEFINITION } from './Const.Class.js';
import { Message } from "./Message.Class.js";

export class Html {

    static renderCases(cases, selectedCS){
        $('#cases').empty();       
        $.each(cases, function (index, value) {
            Html.apendCase(value, selectedCS)
        });

        if(!selectedCS) Message.info( "Please select existing or create new case to proceed!");
    }

    static removeCase(value){
        $(`#p_${value.replace(/[^A-Z0-9]/ig, "")}`).remove();
        $(`#l_${value.replace(/[^A-Z0-9]/ig, "")}`).remove();
    }

    static apendCase(value, selectedCS){
        //Base.appendCasePickerHTML(value, selectedCS);
        let htmlstring = `
            <div class="panel panel-default" id=l_${value.replace(/[^A-Z0-9]/ig, "")}>
                <div class="panel-heading" style="padding-right: 0px !important;">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <b>
                                    <span class="selectCS"  data-ps="${value}" data-toggle="tooltip" data-placement="top" title="Select case study">
                                        <span class="glyphicon 
                                        ${ selectedCS == value ? ` glyphicon-check danger ` : ` glyphicon-bookmark green `}
                                        fa-1.5x icon-btn"></span><span class="pointer">${value}</span>
                                    </span>
                                </b>
                            </td>
                            <td style="width:40px; text-align:center">
                                <span data-toggle="modal" data-target="#modaldescriptionps">
                                <span class="descriptionPS" data-ps="${value}" data-toggle="tooltip" data-placement="top" title="Case study description">
                                <span class="glyphicon glyphicon-info-sign text-info icon-btn"></span>
                                </span>
                                </span>
                            </td>
                            <td style="width:40px; text-align:center">
                                <span class="editPS " data-ps="${value}" data-toggle="tooltip" data-placement="top" title="Edit case study">
                                    <span class="glyphicon glyphicon-edit text-info icon-btn"></span>
                                </span>
                            </td>
                            <td style="width:40px; text-align:center">
                                <span class="backupCS" data-ps="${value}" 
                                data-toggle="tooltip" data-placement="top" title="Backup case study" >
                                <a href="backupCase?case=${value}"> <span class="glyphicon glyphicon-download-alt text-info icon-btn"></span></a>
                               
                                </span>
                                </td>
                            <td style="width:40px; text-align:center">
                                <span data-toggle="modal" data-target="#modalcopy">
                                <span class="copyCS" data-ps="${value}"' + 'id="copy_${value}"  data-toggle="tooltip" data-placement="top" title="Copy case study" >
                                <span class="glyphicon glyphicon-duplicate text-info icon-btn"></span>
                                </span>
                                </span>
                            </td>
                            <td style="width:40px; text-align:center">
                                <span>
                                    <span class="DeletePS" data-ps="${value}"'+'data-toggle="tooltip" data-placement="top" title="Delete case study">
                                        <span  class="glyphicon glyphicon-trash danger icon-btn"></span>
                                    </span>
                                </span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div id="collapse_${value.replace(/[^A-Z0-9]/ig, "")}" class="panel-collapse collapse">
                </div>
        </div>`;
        $('#cases').append(htmlstring);
    }

    static renderCasePicker(cases, selectedCS){
        $('#casePicker').empty();
        $.each(cases, function (index, value) {
            Html.appendCasePicker(value, selectedCS);
        });
    }

    static appendCasePicker(value, selectedCS, pageId){
        let res = `
        <li id=p_${value.replace(/[^A-Z0-9]/ig, "")}>
            <a href="javascript:void(0);"  class="selectCS" data-ps="${value}"> <span class="glyphicon 
                ${ selectedCS == value ? ` glyphicon-check danger ` : ` glyphicon-bookmark green `}
            "></span><b> ${value}</b></a>
            <p class="divider"></p>
        </li>
        `;
        $('#casePicker').append(res);
    }

    static updateCasePicker(titleps){
        $('#casePicker').find(".glyphicon-check").removeClass('glyphicon-check danger').addClass('glyphicon-bookmark green');
        $(`#casePicker #p_${titleps.replace(/[^A-Z0-9]/ig, "")} span`).removeClass('glyphicon-bookmark green').addClass('glyphicon-check danger');

        $('#cases').find(".glyphicon-check").removeClass("glyphicon-check danger").addClass("glyphicon-bookmark green");
        $("#collapse_" + titleps.replace(/[^A-Z0-9]/ig, ""))
            .parent()
            .find(".glyphicon-bookmark")
            .removeClass("glyphicon-bookmark green")
            .addClass("glyphicon-check danger"); 
    }

    static title(casename, title, group, ){
        $("#osy-case").html(casename);
        $("#osy-title").html('<i class="fa-fw fa fa-home"></i>' +title+ ' <small>[' + group +']</small>'  );
    }

    static genData(model){
        var container =  $('#osy-currency');
        container.empty();

        $.each(CURRENCY, function (key, value) {
            if (value == model.currency){
               
                container.append(`<option value="${value}" selected> ${value}</option>`);
            }else{
                container.append(`<option value="${value}"> ${value} </option>`);
            }
        });

        $("#osy-date").datepicker().datepicker("setDate", model.date);
        $("#osy-casename").val(model.casename);
        $("#osy-desc").val(model.desc);
        $("#osy-ns").val(model.ns);
        $("#osy-dt").val(model.dt);
        $("#osy-mo").val(model.mo);

        $("#commCount").text(model.commCount);
        $("#techCount").text(model.techCount);
        $("#emisCount").text(model.emisCount);
        $("#scenariosCount").text(model.scenariosCount);
        $("#constraintsCount").text(model.constraintsCount);

    }

    static ddlParams(params, param){
        var container =  $('#osy-ryt');
        container.empty();
        $.each(params, function (id, obj) {
            if (obj.id == param ){
                container.append('<option value="'+ obj.id+'" selected>'+obj.value+'</option>');
            }else{
                container.append('<option value="'+ obj.id+'">'+obj.value+'</option>');
            }
        });
    }

    static ddlTechs(techs, tech){
        var container =  $('#osy-techs');
        container.empty();
        $.each(techs, function (id, obj) {
            if (obj.TechId == tech ){
                container.append('<option value="'+ obj.TechId+'" selected>'+obj.Tech+'</option>');
            }else{
                container.append('<option value="'+ obj.TechId+'" >'+obj.Tech+'</option>');
            }
        });   
    }

    static ddlTechNames(techs, tech){
        var container =  $('#osy-techNames');
        container.empty();
        $.each(techs, function (id, obj) {
            if (obj.TechId == tech ){
                container.append('<option value="'+ obj.Tech+'" selected>'+obj.Tech+'</option>');
            }else{
                container.append('<option value="'+ obj.Tech+'" >'+obj.Tech+'</option>');
            }
        });   
    }

    static ddlComms(comms, comm){
        var container =  $('#osy-comms');
        container.empty();
        $.each(comms, function (id, obj) {
            if (obj.CommId == comm ){
                container.append('<option value="'+ obj.CommId+'" selected>'+obj.Comm+'</option>');
            }else{
                container.append('<option value="'+ obj.CommId+'" >'+obj.Comm+'</option>');
            }
        });   
    }

    static ddlCommNames(comms, comm){
        var container =  $('#osy-commNames');
        container.empty();
        $.each(comms, function (id, obj) {
            if (obj.CommId == comm ){
                container.append('<option value="'+ obj.Comm+'" selected>'+obj.Comm+'</option>');
            }else{
                container.append('<option value="'+ obj.Comm+'" >'+obj.Comm+'</option>');
            }
        });   
    }

    static ddlCons(cons, con){
        var container =  $('#osy-cons');
        container.empty();
        $.each(cons, function (id, obj) {
            if (obj.ConId == con ){
                container.append('<option value="'+ obj.ConId+'" selected>'+obj.Con+'</option>');
            }else{
                container.append('<option value="'+ obj.ConId+'" >'+obj.Con+'</option>');
            }
        });   
    }

    static ddlConNames(cons, con){
        var container =  $('#osy-conNames');
        container.empty();
        $.each(cons, function (id, obj) {
            if (obj.ConId == con ){
                container.append('<option value="'+ obj.Con+'" selected>'+obj.Con+'</option>');
            }else{
                container.append('<option value="'+ obj.Con+'" >'+obj.Con+'</option>');
            }
        });   
    }

    static ddlEmis(emis, emi){
        var container =  $('#osy-emis');
        container.empty();
        $.each(emis, function (id, obj) {
            if (obj.EmisId == emi ){
                container.append('<option value="'+ obj.EmisId+'" selected>'+obj.Emis+'</option>');
            }else{
                container.append('<option value="'+ obj.EmisId+'" >'+obj.Emis+'</option>');
            }
        });   
    }

    static ddlEmiNames(emis, emi){
        var container =  $('#osy-emiNames');
        container.empty();
        $.each(emis, function (id, obj) {
            if (obj.EmisId == emi ){
                container.append('<option value="'+ obj.Emis+'" selected>'+obj.Emis+'</option>');
            }else{
                container.append('<option value="'+ obj.Emis+'" >'+obj.Emis+'</option>');
            }
        });   
    }

    static ddlTimeslices($div, timeslices){
        var container =  $div;
        container.empty();
        $.each(timeslices, function (id, ts) {
            if (ts == 'S11' ){
                container.append('<option value="'+ ts+'" selected>'+ts+'</option>');
            }else{
                container.append('<option value="'+ ts+'" >'+ts+'</option>');
            }
        });  
    }

    static ddlMods($div, mo){
        var container =  $div;
        container.empty();
        $.each(mo, function (id, m) {
            if (m == 1 ){
                container.append('<option value="'+ m+'" selected>'+m+'</option>');
            }else{
                container.append('<option value="'+ m+'" >'+m+'</option>');
            }
        });  
    }

    static ddlScenarios(scs, sc){
        var container =  $('#osy-scenarios');
        container.empty();
        $.each(scs, function (id, obj) {
            if(obj.ScenarioId != 'SC_0'){
                if (obj.id == sc ){
                    container.append('<option value="'+ obj.Scenario+'" selected>'+obj.Scenario+'</option>');
                }else{
                    container.append('<option value="'+ obj.Scenario+'" >'+obj.Scenario+'</option>');
                }
            }
        });   
    }

    static years(from, to, range){
        var container =  $('#osy-years');
        container.empty();
        for(var i = from; i <= to; i++) {
            if (range.indexOf(String(i)) != -1) {
                container.append(' <label class="checkbox"><input type="checkbox" name="Year['+i+']" id="'+i+'" checked/><i></i>'+i+'</label>');
            }else{
                container.append(' <label class="checkbox"><input type="checkbox" name="Year['+i+']" id="'+i+'"/><i></i>'+i+'</label>');
            }
        }
    }

    static renderSparkline(fuels, perByFuel, capByFuel, totCapByFuel ){
    
        // console.log(fuels);
        // console.log(totCapByFuel)
        // console.log(capByFuel)
        // console.log(perByFuel)
        var container =  $('.show-stat-microcharts');
        container.empty();
        $.each(fuels, function (key, fuel) {
            let arrString = capByFuel[fuel].toString();
            let spark = `
                <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
                    <div class="col-xs-12 col-sm-9 col-md-9 col-lg-9">
                        <ul id="sparks" class="">
                            <li class="sparks-info">
                                <h5> ${fuel} <span class="${fuel}">${totCapByFuel[fuel]} MW</span></h5>
                                <div class="sparkline ${fuel} hidden-mobile hidden-md hidden-sm">
                                    ${arrString}
                                </div>
                            </li>
                        </ul>
                    </div>  
                    <div class="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                        <div class="easy-pie-chart ${fuel}" data-percent="${perByFuel[fuel]}" data-pie-size="50">
                            <span class="percent percent-sign">${perByFuel[fuel]}</span>
                        </div> 
                    </div> 

                </div>  
            `;
            container.append(spark);
        });
    }

    static renderScOrder(scs){
        var sortableList = '';
        $.each(scs, function (sc, flag) {
            if (flag.ScenarioId != 'SC_0'){
                if (flag.Active){
                    var sortableElement = 
                    `<div class="sortable-item" id=`+flag.ScenarioId+`>
                        <i class="fa fa-sort danger" aria-hidden="true"></i>` + flag.Scenario +`
                        <span class="pull-right"><input type="checkbox" name="enable[`+flag.ScenarioId+`]" id="`+flag.ScenarioId+`" checked/></span>
                    </div>`;
                    sortableList = sortableList + sortableElement;
                }else{
                    var sortableElement = 
                    `<div class="sortable-item" id=`+flag.ScenarioId+`>
                        <i class="fa fa-sort danger" aria-hidden="true"></i>` + flag.Scenario +`
                        <span class="pull-right"><input type="checkbox" name="enable[`+flag.ScenarioId+`]" id="`+flag.ScenarioId+`" /></span>
                    </div>`;
                    sortableList = sortableList + sortableElement;
                }
            }
        });
        $("#osy-scOrder").html(sortableList);
        $("#osy-scOrder").jqxSortable(); 
    }

    static renderUnitRules(rules, unitsDef){
        $("#osy-unitRuleSort1").empty();
        $("#osy-unitRuleSort2").empty();
        var sortableList1 = '';
        var sortableList2 = '';
        if(typeof rules !== "undefined"){
            $.each(UNITDEFINITION, function (id, rule) {
                if (!rules['cat'].some(e => e.var === id)) {
                    let res = jsonLogic.apply( rule.val, unitsDef)
                    var sortableElement = 
                    `<div class="sortable-item" id="${id}">${res}</div>`;
                    sortableList1 = sortableList1 + sortableElement;
                }
            });
    
            $.each(rules['cat'], function (id, rule) {
                let res = jsonLogic.apply( rule, unitsDef)
                var sortableElement = 
                `<div class="sortable-item" id="${rule.var}">${res}</div>`;
                sortableList2 = sortableList2 + sortableElement;
            });
    
            $("#osy-unitRuleSort1").html(sortableList1);
            $("#osy-unitRuleSort1").jqxSortable(); 
            
            $("#osy-unitRuleSort2").html(sortableList2);
            $("#osy-unitRuleSort2").jqxSortable(); 
            $("#osy-unitRuleSort1, #osy-unitRuleSort2").jqxSortable({
                connectWith: ".osy-unitRuleSort",
                opacity: 0.5,
            });
        }else{
            $.each(UNITDEFINITION, function (id, rule) {
                let res = jsonLogic.apply( rule.val, unitsDef)
                var sortableElement = 
                `<div class="sortable-item" id="${id}">${res}</div>`;
                sortableList1 = sortableList1 + sortableElement;
            });
    
    
            $("#osy-unitRuleSort1").html(sortableList1);
            $("#osy-unitRuleSort1").jqxSortable(); 
            
            // $("#osy-unitRuleSort2").html(sortableList2);
            // $("#osy-unitRuleSort2").jqxSortable(); 
            $("#osy-unitRuleSort1, #osy-unitRuleSort2").jqxSortable({
                connectWith: ".osy-unitRuleSort",
                opacity: 0.5,
            });        
        }

    }
}

// <div class="sparkline txt-color-blue hidden-sm hidden-md pull-right" data-sparkline-type="line" data-sparkline-height="33px" data-sparkline-width="70px" data-fill-color="transparent">
//     ${arrString}
// </div>

//nasvo za pie chart
//  <span class="easy-pie-title">${fuel} <i class="fa fa-caret-down icon-color-good"></i></span>

//pieChart
/* <div class="col-xs-12 col-sm-2 col-md-2 col-lg-2">
<div class="easy-pie-chart txt-color-greenLight" data-percent="${perByFuel[fuel]}" data-pie-size="50">
    <span class="percent percent-sign">${perByFuel[fuel]}</span>
</div>
</div> */
