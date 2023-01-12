import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RESViewer.ModelTEST.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { JqxSources } from "../../Classes/JqxSources.Class.js";

export default class RESViewer {
    static onLoad() {
        Base.getSession()
            .then(response => {
                let casename = response['session'];
                if (casename) {
                    const promise = [];
                    promise.push(casename);
                    const genData = Osemosys.getData(casename, 'genData.json');
                    promise.push(genData);
                    const RYTCMdata = Osemosys.getData(casename, "RYTCM.json");
                    promise.push(RYTCMdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RESViewer.refreshPage.bind(RESViewer));
                }
            })
            .then(data => {
                let [casename, genData, RYTCMdata] = data;
                let model = new Model(casename, genData, RYTCMdata);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static sankeySize(model){
        console.log('model.techCount ', model.techCount)
        if(model.techCount <= 20){
            model.height = 620;
        }else if(model.techCount > 20 && model.techCount <= 50){
            model.height = 1000;
        }else if(model.techCount > 50 && model.techCount <= 100){
            model.height = 2000;
        }else if(model.techCount > 100 && model.techCount <= 150){
            model.height = 3000;
        }else if(model.techCount > 150 ){
            model.height = 6000;
        }
    }
    

      static initPage(model) {
        Message.clearMessages();
        let $div = 'osy-RESViewer';

        Html.title(model.casename, 'RES Viewer', 'Reference Energy System');
        // Html.ddlScenariosId(model.scenarios, model.sc);
        // Html.ddlYears(model.years, model.year)
        //Html.ddlActivityTechs(model.allActivityTechs);

        var source = JqxSources.srcActTech(model.allActivityTechs);
        var dataAdapter = new $.jqx.dataAdapter(source);
        // Create a jqxDropDownList
        $("#osy-activityTechs").jqxDropDownList({
            checkboxes: true, source: dataAdapter, displayMember: "Tech", valueMember: "TechId", width: 200, height: 32, theme:'bootstrap'
        });
        $("#osy-activityTechs").jqxDropDownList('checkIndex', 0);

        this.sankeySize(model);
        Chart.RESChart($div, model);

    }

    static refreshPage(casename) {
        Base.setSession(casename)
            .then(response => {
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const RYTCMdata = Osemosys.getData(casename, "RYTCM.json");
                promise.push(RYTCMdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, RYTCMdata] = data;
                let model = new Model(casename, genData, RYTCMdata);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $div = 'osy-RESViewer';

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RESViewer.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#renderSankey").off('click');
        $("#renderSankey").on('click', function (e) {
            var items = $("#osy-activityTechs").jqxDropDownList('getCheckedItems'); 
            let techSelect = [];
            
            $.each(items, function (index, obj) {
                techSelect.push(obj.originalItem.TechId)
            });

            console.log('techSelect ', techSelect)

            let modelNew = new Model(model.casename, model.genData, model.RYTCMdata, techSelect);
            
            RESViewer.sankeySize(modelNew);
            Chart.RESChart($div, modelNew);

        });

        $("#restoreSankey").off('click');
        $("#restoreSankey").on('click', function (e) {

            let modelNew = new Model(model.casename, model.genData, model.RYTCMdata);
            
            RESViewer.sankeySize(modelNew);
            Chart.RESChart($div, modelNew);

        });


        var myPlot = document.getElementById('osy-RESViewer');
        myPlot.on('plotly_click', function(data){
            var pts = '';
            for(var i=0; i < data.points.length; i++){
                // pts = 'x = '+data.points[i].x +'\ny = '+ data.points[i].y.toPrecision(4) + '\n\n';
                pts = 'x = '+data.points[i].x1 +'\ny = '+ data.points[i].y1 + '\n\n';
            }
            //alert('Closest point clicked:\n\n'+pts);
            let msgData = data.points[0];
            let msg;
            if ('source' in msgData && 'target' in msgData){
                msg = `Commodity: ${msgData.label} <br /> Source: ${msgData.source.label} <br /> Target: ${msgData.target.label} <br />`
            }else{
                let sourceData = [];
                let targetData = [];
                if (msgData.sourceLinks !== undefined || msgData.sourceLinks.length != 0) {
                    for(var i=0; i < msgData.sourceLinks.length; i++){
                        if (!sourceData.includes(msgData.sourceLinks[i].label)){
                            sourceData.push(msgData.sourceLinks[i].label)
                        }        
                    }
                }
                if (msgData.targetLinks !== undefined || msgData.targetLinks.length != 0) {
                    for(var i=0; i < msgData.targetLinks.length; i++){
                        //targetData.push(msgData.targetLinks[i].label);
                        if (!targetData.includes(msgData.targetLinks[i].label)){
                            targetData.push(msgData.targetLinks[i].label)
                        }
                    }
                }
                if (sourceData.length != 0 && targetData.length != 0 ) {
                    msg = `Technology: ${msgData.label} <br /> Source: ${targetData} <br /> Target: ${sourceData} <br />`;
                }
                else if(sourceData.length != 0 && targetData.length == 0 ){
                    msg = `Technology: ${msgData.label} <br /> Target: ${sourceData} <br />`;
                }
                if (sourceData.length == 0 && targetData.length != 0 ) {
                    msg = `Technology: ${msgData.label} <br /> Source: ${targetData}`;
                }                
            }
            
            Message.bigBoxDefault('Model diagram info', msg, null)
        });

        // $("#osy-years").off('change');
        // $('#osy-years').on('change', function () {
        //     Html.title(model.casename, 'RES Viewer', 'Reference Energy System');
        //     model.year = this.value;
        //     Chart.SankeyChart($div, model)
        // });

        // $("#osy-scenarios").off('change');
        // $('#osy-scenarios').on('change', function () {
        //     Html.title(model.casename, 'RES Viewer', 'Reference Energy System');
        //     model.sc = this.value;
        //     Chart.SankeyChart($div, model)
        // });

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
            $('#definition').toggle('slow');
        });
    }
}