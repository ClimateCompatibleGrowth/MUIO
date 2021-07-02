import { DataModel } from "../../Classes/DataModel.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";

export class Model {
    
    constructor (PARAMETERS) {

        // console.log('PARAMETERS ', PARAMETERS)

        let datafields = [];
        let columns = [];

        let gridData = []
        $.each(PARAMETERS, function (group, array) {
            $.each(array, function (id, obj) {
                //console.log(group)
                let tmp = {};
                tmp['groupId'] = group;
                tmp['groupName'] = GROUPNAMES[group];
                tmp['id'] = obj.id;
                tmp['value'] = obj.value;
                tmp['default'] = obj.default;
                tmp['enable'] = obj.enable;
                tmp['menu'] = obj.menu;
                gridData.push(tmp);
            });
        });

       //console.log('gridData ', gridData);

        datafields.push({ name: 'groupId', type:'string' });
        datafields.push({ name: 'groupName', type:'string' });        
        datafields.push({ name: 'id', type:'string' }); 
        datafields.push({ name: 'value', type:'string' }); 
        datafields.push({ name: 'default', type:'number' }); 
        datafields.push({ name: 'menu', type:'number' }); 
        datafields.push({ name: 'enable', type:'bool' });    

        columns.push({ text: 'groupId', datafield: 'groupId', editable: false, align: 'left',  hidden: true})
        columns.push({ text: 'PARAMETER GROUP', datafield: 'groupName', editable: false, align: 'left', width: '20%'})
        columns.push({ text: 'id', datafield: 'id', editable: false, align: 'left',  hidden: true})
        columns.push({ text: 'PARAMETER NAME', datafield: 'value', editable: false, align: 'left', width: '70%'})
        columns.push({ text: 'DEFAULT VALUE', datafield: 'default', align: 'right', cellsalign: 'right', cellsformat: 'd2', width: '10%'})
        columns.push({ text: 'ACTIVE', datafield: 'enable', columntype: 'checkbox', align: 'center', width: '15%',  hidden: true}),
        columns.push({ text: 'menu', datafield: 'menu', editable: false, align: 'left',  hidden: true})

        let srcGrid = {
            datatype: "json",
            localdata: gridData,
            datafields: datafields
        };

        this.columns = columns;
        this.gridData = gridData;
        this.srcGrid = srcGrid;
    }
}