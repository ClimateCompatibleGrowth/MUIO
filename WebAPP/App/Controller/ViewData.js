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

        let $divGrid = $('#osy-gridViewData');
        var daGrid = new $.jqx.dataAdapter(model.srcGrid);
        Grid.Grid($divGrid, daGrid, model.columns, true, false, false);
        $divGrid.jqxGrid('hidecolumn', 'TechName');
        Grid.applyViewDataFilter( $divGrid, model.years );
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

        let $divGrid = $('#osy-gridViewData');

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            ViewData.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Case " + casename + " selected!", 3500);
        });

        $("#osy-techs").off('change');
        $('#osy-techs').on('change', function() {
            let tech = this.value;
            model.srcGrid.root = tech;
            $divGrid.jqxGrid('updatebounddata');
            Grid.applyViewDataFilter( $divGrid, model.years );
        });

        $("#osy-emis").off('change');
        $('#osy-emis').on('change', function() {
            let emi = this.value;
            model.srcGrid.root = emi;
            $divGrid.jqxGrid('updatebounddata');
            Grid.applyViewDataFilter( $divGrid, model.years );
        });

        $("#osy-comms").off('change');
        $('#osy-comms').on('change', function() {
            let comm = this.value;
            model.srcGrid.root = comm;
            $divGrid.jqxGrid('updatebounddata');
            Grid.applyViewDataFilter( $divGrid, model.years );
        });

        $('input[type=radio][name=bytype]').change(function() {
            if (this.value == 'Tech') {
                let firstTech = model.techs[0]['TechId'];
                $('#osy-techs').show();
                $('#osy-emis').hide();
                $('#osy-comms').hide();
                Html.ddlTechs( model.techs, firstTech);
                model.srcGrid.root = firstTech;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'TechName');
                $divGrid.jqxGrid('showcolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'EmisName');
                Grid.applyViewDataFilter( $divGrid, model.years );
            }
            else if (this.value == 'Comm') {
                console.log(this.value)
                let firstComm = model.comms[0]['CommId'];
                $('#osy-techs').hide();
                $('#osy-emis').hide();
                $('#osy-comms').show();
                Html.ddlComms( model.comms, firstComm);
                model.srcGrid.root = firstComm;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'TechName');
                $divGrid.jqxGrid('showcolumn', 'EmisName');
                Grid.applyViewDataFilter( $divGrid, model.years );
            }
            else if (this.value == 'Emi') {
                console.log(this.value)
                let firstEmi = model.emis[0]['EmisId'];
                $('#osy-techs').hide();
                $('#osy-emis').show();
                $('#osy-comms').hide();
                Html.ddlEmis( model.emis, firstEmi);
                model.srcGrid.root = firstEmi;
                $divGrid.jqxGrid('updatebounddata');
                $divGrid.jqxGrid('hidecolumn', 'EmisName');
                $divGrid.jqxGrid('showcolumn', 'CommName');
                $divGrid.jqxGrid('showcolumn', 'TechName');
                Grid.applyViewDataFilter( $divGrid, model.years );
            }
        });

        let pasteEvent = false;
        $divGrid.bind('keydown', function (event) {
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

                var ScId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'ScId');
                var GroupId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'groupId');
                var ParamId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'param');
                var CommId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'CommId');
                var EmisId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'EmisId');
                var Timeslice = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'Timeslice');
                var TechId = $divGrid.jqxGrid('getcellvalue', rowBoundIndex, 'TechId');
                let dataType = $('input[type=radio][name=bytype]:checked').val();

                let object;
                if(dataType == 'Tech'){
                    object = model.gridData[dataType][TechId];
                }
                else if(dataType == 'Comm'){
                    object = model.gridData[dataType][CommId];
                }
                if(dataType == 'Emis'){
                    object = model.gridData[dataType][EmisId];
                }
                //update model grid
                $.each(object, function (id, obj) {
                    //console.log(' obj.groupId ', obj.groupId , ' obj.paramId ', obj.param, ' obj com ', obj.CommId, ' obj.EmisId ', obj.EmisId, ' obj.timeslice ', obj.Timeslice)
                    if(obj.ScId === ScId && 
                        obj.groupId === GroupId && 
                        obj.param === ParamId && 
                        obj.CommId === CommId && 
                        obj.EmisId === EmisId && 
                        obj.Timeslice === Timeslice){
                        if(value){
                            obj[year] = value;
                        }else{
                            obj[year] = 0;
                        }
                    }
                });

                Osemosys.updateViewData(model.casename, year, ScId, GroupId, ParamId, TechId, CommId, EmisId, Timeslice, value)
                .then(response =>{
                    Message.bigBoxSuccess('Case study message', response.message, 3000);
                    //sync S3
                    if (Base.AWS_SYNC == 1){
                        Base.updateSync(model.casename, GroupId+".json");
                    }
                })
                .catch(error=>{
                    Message.bigBoxDanger('Error message', error, null);
                })
            }
        });

        let res = true;
        $("#resizeColumns").off('click');
        $("#resizeColumns").click(function () {
            if(res){
                $divGrid.jqxGrid('autoresizecolumn', 'Sc');
                //$divGrid.jqxGrid('autoresizecolumn', 'groupName');
                $divGrid.jqxGrid('autoresizecolumn', 'paramName');
                $divGrid.jqxGrid('autoresizecolumn', 'TechName');
                $divGrid.jqxGrid('autoresizecolumn', 'CommName');
                $divGrid.jqxGrid('autoresizecolumn', 'EmisName');
                $divGrid.jqxGrid('autoresizecolumn', 'Timeslice');
            }
            else{
                $divGrid.jqxGrid('autoresizecolumns');
            }
            res = !res;
        });

        $("#xlsAll").off('click');
        $("#xlsAll").click(function (e) {
            e.preventDefault();
            $divGrid.jqxGrid('exportdata', 'xls', 'View data by sets');
        });

        $("#decUp").off('click');
        $("#decUp").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d++;
            model.decimal = 'd' + parseInt(model.d);
            $divGrid.jqxGrid('refresh');
        });

        $("#decDown").off('click');
        $("#decDown").on('click', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            model.d--;
            model.decimal = 'd' + parseInt(model.d);
            $divGrid.jqxGrid('refresh');
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