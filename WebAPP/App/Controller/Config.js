import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/Config.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { UNITDEFINITION } from "../../Classes/Const.Class.js";
import { MessageSelect } from "./MessageSelect.js";
import { Sidebar } from "./Sidebar.js";

export default class Config {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session'];
            //if(casename){
                const promise = [];
                promise.push(casename);
                const PARAMETERS = Osemosys.getParamFile();
                promise.push(PARAMETERS); 
                return Promise.all(promise);
            // }else{
            //     MessageSelect.init(Config.refreshPage.bind(Config));
            // }
        })
        .then(data => {
            let [casename, PARAMETERS] = data;
            let model = new Model(PARAMETERS);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        Html.title(model.casename, "Parameters", "Year, technology, commodity, emission...");
        let $divGrid = $('#osy-gridParam');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);        
        Grid.Grid($divGrid, daGrid, model.columns, true)
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS); 
            return Promise.all(promise);
        })
        .then(data => {
            console.log('data ', data)
            let [casename, PARAMETERS] = data;
            let model = new Model(PARAMETERS);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static initEvents(model){

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            console.log('casename ', casename)
            Html.updateCasePicker(casename);
            Sidebar.Reload(casename);
            Config.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-saveData").on('click', function (event) {
            event.preventDefault();
            event.stopImmediatePropagation();
            let paramData = $('#osy-gridParam').jqxGrid('getrows');
            let Data = {};
            $.each(paramData, function (id, obj) {
                let tmp = {};
                if (typeof(Data[obj.groupId]) === 'undefined') {
                    Data[obj.groupId] = new Array();
                }
                tmp['id'] = obj.id;
                tmp['value'] = obj.value;
                tmp['default'] = obj.default;
                tmp['enable'] = obj.enable;
                tmp['menu'] = obj.menu;
                tmp['unitRule'] = obj.unitRule;
                Data[obj.groupId].push(tmp);
            });

            Osemosys.saveParamFile(Data)
            .then(response =>{
                Message.bigBoxSuccess('Case study message', response.message, 3000);
                //sync S3
                if (Base.AWS_SYNC == 1){
                    Base.updateSyncParamFile(model.casename, "RYT.json");
                }
            })
            .catch(error=>{
                Message.bigBoxDanger('Error message', error, null);
            })
        });


        $(document).undelegate(".updateRule","click");
        $(document).delegate(".updateRule","click",function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            var id = $(this).attr('data-id');
            var groupId = $('#osy-gridParam').jqxGrid('getcellvalue', id, 'groupId');
            var paramId = $('#osy-gridParam').jqxGrid('getcellvalue', id, 'id');
            $('#unitTitle').html(
                `<h6 id="paramId" data-paramId ="${paramId}" style="display: inline-block;">
                    <i class="fa-fw fa fa-tags"></i><strong>RULE</strong>
                    ${model.paramNames[groupId][paramId]}
                    <small id="groupId" data-groupId="${groupId}"> [${model.GROUPNAMES[groupId]}]</small>
                </h6>
                `
            );
            let unitRule = model.paramById[groupId][paramId]['unitRule'];
            Html.renderUnitRules(unitRule, model.unitsDef);    
                   
        });

        $("#btnSaveRule").off('click');
        $("#btnSaveRule").on('click', function (event) {
            let rule = $("#osy-unitRuleSort2").jqxSortable("toArray")

            let paramId = $('#paramId').attr("data-paramId");
            let groupId = $('#groupId').attr("data-groupId") 

            let arrayRule = [];
            $.each(rule, function (id, rule) {
                arrayRule.push(UNITDEFINITION[rule]['val'])
            });

            let unitRule = {
                "cat": arrayRule
            };

            $.each(model.gridData, function (id, obj) {
                if (obj.id == paramId && obj.groupId == groupId){
                    obj.unit =jsonLogic.apply(unitRule, model.unitsDef);
                    obj.unitRule = unitRule;
                }

            });

            let $divGrid = $('#osy-gridParam');
            model.srcGrid.localdata = model.gridData;
            $divGrid.jqxGrid('updatebounddata');
            $('#osy-unitRule').modal('toggle');
            Message.smallBoxInfo('Rule updated for ', model.paramNames[groupId][paramId], 3000); 
        });

        $('#osy-unitRuleSort2').on('stop', function () { 
            console.log('stop')
            let rule = $("#osy-unitRuleSort2").jqxSortable("toArray");
            let paramId = $('#paramId').attr("data-paramId");
            let groupId = $('#groupId').attr("data-groupId") 

            console.log(paramId, groupId)

            let arrayRule ='';
            $.each(rule, function (id, rule) {
                console.log( UNITDEFINITION[rule]['name'])
                arrayRule += UNITDEFINITION[rule]['name'];
            });
            $('#ruleFormula').html(
                `
                <p>${arrayRule}</p>
                <small>Result fomrula for ${model.paramNames[groupId][paramId]} [${model.GROUPNAMES[groupId]}]</small>
                `
            );
            $('#ruleFormula').show();
         }); 

         $('#osy-unitRuleSort2').on('receive', function () { 
            console.log('stop')
            let rule = $("#osy-unitRuleSort2").jqxSortable("toArray");
            let paramId = $('#paramId').attr("data-paramId");
            let groupId = $('#groupId').attr("data-groupId") 

            console.log(paramId, groupId)

            let arrayRule ='';
            $.each(rule, function (id, rule) {
                console.log( UNITDEFINITION[rule]['name'])
                arrayRule += UNITDEFINITION[rule]['name'];
            });
            $('#ruleFormula').html(
                `
                <p>${arrayRule}</p>
                <small>Result fomrula for ${model.paramById[paramId]} [${model.GROUPNAMES[groupId]}]</small>
                `
            );
            $('#ruleFormula').show();
         }); 

         $('#osy-unitRuleSort2').on('remove', function () { 
             console.log('remove')
          })

        // let res = true;
        // $("#resizeColumns").click(function () {
        //     if(res){
        //         $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'Tech');
        //     }
        //     else{
        //         $('#osy-gridRYT').jqxGrid('autoresizecolumns');
        //     }
        //     res = !res;        
        // });
    
        // $("#xlsAll").click(function (e) {
        //     e.preventDefault();
        //     $("#osy-gridRYT").jqxGrid('exportdata', 'xls', 'RYT');
        // });

        // $("#decUp").off('click');
        // $("#decUp").on('click', function(e){
        //     e.preventDefault();
        //     e.stopImmediatePropagation();
        //     model.d++;
        //     model.decimal = 'd' + parseInt(model.d);
        //     $('#osy-gridRYT').jqxGrid('refresh');
        // });

        // $("#decDown").off('click');
        // $("#decDown").on('click', function(e){
        //     e.preventDefault();
        //     e.stopImmediatePropagation();
        //     model.d--;
        //     model.decimal = 'd' + parseInt(model.d);
        //     $('#osy-gridRYT').jqxGrid('refresh');
        // });

        // $("#showLog").click(function (e) {
        //     e.preventDefault();
        //     $('#definition').html(`
        //         <h5>${DEF[model.group].title}</h5>
        //         ${DEF[model.group].definition}
        //     `);
        //     $('#definition').toggle('slow');
        // });
    }
}