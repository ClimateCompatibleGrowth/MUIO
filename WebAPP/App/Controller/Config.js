import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/Config.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";

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

        // console.log('srcGrid ', model.srcGrid)
        // console.log('daGrid ', daGrid)
        // console.log('columns ', model.columns)
        
        Grid.Grid($divGrid, daGrid, model.columns, true)
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS); 
        })
        .then(data => {
            let [casename, PARAMETERS] = data;
            let model = new Model(casename, PARAMETERS);
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
            Html.updateCasePicker(casename);
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
                
                //tmparray.push(tmp);
                Data[obj.groupId].push(tmp);
            });

            //console.log(Data);
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