import { DataModel } from "../../Classes/DataModel.Class.js";
import { GROUPNAMES, PARAMORDER, UNITDEFINITION } from "../../Classes/Const.Class.js";

export class Model {
    
    constructor (PARAMETERS) {

        let datafields = [];
        let columns = [];


        let unitsDef = DataModel.getUnitsDef(UNITDEFINITION);
        let paramById = DataModel.getParamById(PARAMETERS);
        let paramNames = DataModel.AllParamName(PARAMETERS);

        let gridData = []
        $.each(PARAMORDER, function (id, group) {   
            $.each(PARAMETERS[group], function (id, obj) {
                let tmp = {};
                tmp['groupId'] = group;
                tmp['groupName'] = GROUPNAMES[group];
                tmp['id'] = obj.id;
                tmp['value'] = obj.value;
                tmp['default'] = obj.default;
                tmp['enable'] = obj.enable;
                tmp['menu'] = obj.menu;
                let rule = obj.unitRule;
                let data = unitsDef;
                tmp['unit'] =jsonLogic.apply(rule, data);
                tmp['unitRule'] = obj.unitRule;
                gridData.push(tmp);
            });
        });

        var cellsrendererbutton = function (row, column, value) { 
            return '<span style="padding:5px; width:100%;" data-toggle="modal" href="#osy-unitRule" class="btn btn-info updateRule" data-id='+ row+' ><i class="fa fa-pencil-square-o "></i>Update rule</span>';
        }

        let initeditor = function(row, cellvalue, editor, data) {
            editor.jqxNumberInput({ decimalDigits: 5, spinButtons: true, allowNull: false   }); //symbol: ' GWh', symbolPosition: 'right'
        }

        datafields.push({ name: 'groupId', type:'string' });
        datafields.push({ name: 'groupName', type:'string' });        
        datafields.push({ name: 'id', type:'string' }); 
        datafields.push({ name: 'value', type:'string' }); 
        datafields.push({ name: 'default', type:'number' }); 
        datafields.push({ name: 'menu', type:'number' }); 
        datafields.push({ name: 'enable', type:'bool' }); 
        datafields.push({ name: 'unit', type:'string' });    
        datafields.push({ name: 'unitRule' });   

        columns.push({ text: 'groupId', datafield: 'groupId', editable: false, align: 'left',  hidden: true})
        columns.push({ text: 'PARAMETER GROUP', datafield: 'groupName', editable: false, align: 'left', width: '20%'})
        columns.push({ text: 'id', datafield: 'id', editable: false, align: 'left',  hidden: true})
        columns.push({ text: 'PARAMETER NAME', datafield: 'value', editable: false, align: 'left', width: '40%'})
        columns.push({ text: 'DEFAULT VALUE', datafield: 'default', align: 'right', cellsalign: 'right', width: '15%', columntype: 'numberinput', initeditor:initeditor, cellsformat: 'd5'})
        columns.push({ text: 'ACTIVE', datafield: 'enable', columntype: 'checkbox', align: 'center',  hidden: true}),
        columns.push({ text: 'menu', datafield: 'menu', editable: false, align: 'left',  hidden: true}),
        columns.push({ text: 'UNIT', datafield: 'unit', editable: false, align: 'center', cellsalign: 'center', width: '15%'}),
        columns.push({ text: 'UNIT RULE', datafield: 'Unit rule',  align: 'center', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  })

        let srcGrid = {
            datatype: "json",
            localdata: gridData,
            datafields: datafields
        };

        this.columns = columns;
        this.gridData = gridData;
        this.srcGrid = srcGrid;
        this.unitsDef = unitsDef;
        this.paramById = paramById;
        this.GROUPNAMES = GROUPNAMES;
        this.paramNames =paramNames;
        //this.unitIdByVal = unitIdByVal;
    }
}