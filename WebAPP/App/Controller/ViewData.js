import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/ViewData.Model.js";
import { Grid } from "../../Classes/Grid.Class.js";
import { Chart } from "../../Classes/Chart.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
// import { Sidebar } from "./Sidebar.js";

export default class ViewData {
    static onLoad(){
        Base.getSession()
        .then(response =>{
            let casename = response['session'];
            if(casename){
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const viewData =  Osemosys.viewData(casename);
                promise.push(viewData);
                return Promise.all(promise);
                ;
            }else{
                MessageSelect.init(ViewData.refreshPage.bind(ViewData));
            }
        })
        .then(data => {
            let [casename, genData, viewData] = data;
            console.log(casename, genData);
            let model = new Model(casename, genData, viewData);
            this.initPage(model);
            this.initEvents(model);
        })
        .catch(error =>{
            Message.warning(error);
        });
    }

    static initPage(model){
        Message.clearMessages();
        Html.title(model.casename, 'View input data', 'Technologies, commodities, emissions');
        Html.ddlTechs( model.techs, model.techs[0]['TechId']);

        let $divGrid = $('#osy-gridRYT');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);

        Grid.Grid($divGrid, daGrid, model.columns, true, true, false);
        //$divGrid.jqxGrid('addgroup', 'groupName');
        $divGrid.jqxGrid('hidecolumn', 'TechName');

        //pageSetUp();
    }

    static refreshPage(casename){
        Base.setSession(casename)
        .then(response =>{
            const promise = [];
            promise.push(casename);
            const genData = Osemosys.getData(casename, 'genData.json');
            promise.push(genData);
            const viewData =  Osemosys.viewData(casename);
            promise.push(viewData);
            return Promise.all(promise);
        })
        .then(data => {
            let [casename, genData, viewData] = data;
            let model = new Model(casename, genData, viewData);
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
            ViewData.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        //change of ddl parameters
        $('#osy-techs').on('change', function() {
            let tech = this.value;
            let $divGrid = $('#osy-gridRYT');
            model.srcGrid.root = tech;
            $divGrid.jqxGrid('updatebounddata');
        });

        $('#osy-emis').on('change', function() {
            let emi = this.value;
            let $divGrid = $('#osy-gridRYT');
            model.srcGrid.root = emi;
            $divGrid.jqxGrid('updatebounddata');
        });

        $('#osy-comms').on('change', function() {
            let comm = this.value;
            let $divGrid = $('#osy-gridRYT');
            model.srcGrid.root = comm;
            $divGrid.jqxGrid('updatebounddata');
        });

        $('input[type=radio][name=bytype]').change(function() {
            if (this.value == 'Tech') {
                console.log(this.value)
                let firstTech = model.techs[0]['TechId'];
                $('#osy-techs').show();
                $('#osy-emis').hide();
                $('#osy-comms').hide();
                Html.ddlTechs( model.techs, firstTech);
                let $divGrid = $('#osy-gridRYT');
                model.srcGrid.root = firstTech;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'TechName');
                $divGrid.jqxGrid('showcolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'EmisName');
            }
            else if (this.value == 'Comm') {
                console.log(this.value)
                let firstComm = model.comms[0]['CommId'];
                $('#osy-techs').hide();
                $('#osy-emis').hide();
                $('#osy-comms').show();
                Html.ddlComms( model.comms, firstComm);
                let $divGrid = $('#osy-gridRYT');
                model.srcGrid.root = firstComm;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'TechName');
                $divGrid.jqxGrid('showcolumn', 'EmisName');
            }
            else if (this.value == 'Emi') {
                console.log(this.value)
                let firstEmi = model.emis[0]['EmisId'];
                $('#osy-techs').hide();
                $('#osy-emis').show();
                $('#osy-comms').hide();
                Html.ddlEmis( model.emis, firstEmi);
                let $divGrid = $('#osy-gridRYT');
                model.srcGrid.root = firstEmi;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'EmisName');
                $divGrid.jqxGrid('showcolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'TechName');
            }
        });

        let pasteEvent = false;
        $('#osy-gridRYT').bind('keydown', function (event) {
            pasteEvent = false;
            var ctrlDown = false, ctrlKey = 17, cmdKey = 91, vKey = 86, cKey = 67;
            var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
            if (key == vKey) {
                pasteEvent = true;
                Message.smallBoxInfo('View data form', 'Copy/paste option is not allowed on this form', 3000);
            }
        }).on('cellvaluechanged', function (event) {
            if (!pasteEvent) {
                Pace.restart();

                var args = event.args;
                var year = event.args.datafield;
                var rowBoundIndex = args.rowindex;
                var value = args.newvalue;

                var groupId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'groupId');
                var paramId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'param');
                var CommId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var EmisId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'EmisId');
                var Timeslice = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'Timeslice');
                var TechId = $('#osy-gridRYT').jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                //let TechId = $( "#osy-techs" ).val();

                // //update model grid
                $.each(model.gridData[TechId], function (id, obj) {
                    //console.log(' obj.groupId ', obj.groupId , ' obj.paramId ', obj.param, ' obj com ', obj.CommId, ' obj.EmisId ', obj.EmisId, ' obj.timeslice ', obj.Timeslice)
                    if(obj.groupId === groupId && obj.param === paramId && obj.CommId === CommId && obj.EmisId === EmisId && obj.Timeslice === Timeslice){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                Osemosys.updateViewData(model.casename, 'TECH', year, groupId, paramId, TechId, CommId, EmisId, Timeslice, value)
                .then(response =>{
                    Message.bigBoxSuccess('Case study message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1){
                        Base.updateSync(model.casename, groupId+".json");
                    }
                })
                .catch(error=>{
                    Message.bigBoxDanger('Error message', error, null);
                })

            }
        });

        let res = true;
        $("#resizeColumns").click(function () {
            if(res){
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'groupName');
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'paramName');
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'TechName');
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'CommName');
                $('#osy-gridRYT').jqxGrid('autoresizecolumn', 'EmisName');
            }
            else{
                $('#osy-gridRYT').jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $("#osy-gridRYT").jqxGrid('exportdata', 'xls', 'View data by sets');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYT').jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $('#osy-gridRYT').jqxGrid('refresh');
        });

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`
                <h5>${DEF[model.group].title}</h5>
                ${DEF[model.group].definition}
            `);
            $('#definition').toggle('slow');
        });
    }
}