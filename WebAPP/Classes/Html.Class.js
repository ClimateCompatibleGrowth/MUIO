import { CURRENCY, UNITS, FUELS, COMMODITY } from './Const.Class.js';
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
                                <span class="glyphicon glyphicon-download-alt text-info icon-btn"></span>
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

    static title(casename){
        $("#osy-case").html(casename);
    }

    static genData(model){
        var container =  $('#osy-currency');
        container.empty();
        $.each(CURRENCY, function (key, value) {
            if (value == model.currency){
                container.append('<option value="'+ value+'" selected>'+value+'</option>');
            }else{
                container.append('<option value="'+ value+'">'+value+'</option>');
            }
        });

        // var container =  $('#osy-unit');
        // container.empty();
        // $.each(UNITS, function (key, value) {
        //     if (value == model.unit){
        //         container.append('<option value="'+ value+'" selected>'+value+'</option>');
        //     }else{
        //         container.append('<option value="'+ value+'">'+value+'</option>');
        //     }
        // });

        // var container =  $('#osy-unit');
        // container.empty();
        // $.each(UNITS, function (key, value) {
        //     if (value.id == model.unit){
        //         container.append('<option value="'+ value.id+'" selected>'+value.id+'</option>');
        //     }else{
        //         container.append('<option value="'+ value.id+'">'+value.id+'</option>');
        //     }
        // });

        $("#osy-date").datepicker().datepicker("setDate", model.date);
        $("#osy-casename").val(model.casename);
        $("#osy-desc").val(model.desc);
        $("#osy-dr").val(model.dr);
        $("#osy-dm").val(model.dm);
        $("#osy-ns").val(model.ns);
        $("#osy-dt").val(model.dt);

        $("#commCount").text(model.commCount);
        $("#techCount").text(model.techCount);
        $("#emisCount").text(model.emisCount);

    }

    static ddlyears(years, year){
        var container =  $('#hData-years');
        container.empty();
        $.each(years, function (key, value) {
            if (value == year){
                container.append('<option value="'+ value+'" selected>'+value+'</option>');
            }else{
                container.append('<option value="'+ value+'">'+value+'</option>');
            }
        });
    }

    static ddlRYT(ryts, ryt){
        var container =  $('#osy-ryt');
        container.empty();
        $.each(ryts, function (id, obj) {
            if (obj.id == ryt ){
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
            if (obj.id == tech ){
                container.append('<option value="'+ obj.TechId+'" selected>'+obj.Tech+'</option>');
            }else{
                container.append('<option value="'+ obj.TechId+'" >'+obj.Tech+'</option>');
            }
        });   
    }

    static ddlComms(comms, comm){
        var container =  $('#osy-comms');
        container.empty();
        $.each(comms, function (id, obj) {
            if (obj.id == comm ){
                container.append('<option value="'+ obj.CommId+'" selected>'+obj.Comm+'</option>');
            }else{
                container.append('<option value="'+ obj.CommId+'" >'+obj.Comm+'</option>');
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
