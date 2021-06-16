import { DataModel } from "../../Classes/DataModel.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";

export class Model {
    
    constructor (casename, genData, viewData) {

        this.d = 2;
        this.decimal = 'd' + this.d;

        console.log('viewData ', viewData)

        if(casename){

            let datafields = [];
            let columns = [];

            let years = genData['osy-years'];
            let techs = genData['osy-tech'];  
            let comms = genData['osy-comm'];  
            let emis = genData['osy-emis'];        
            
            let validation = function(cell, value) {
                if (value < 0) {
                    return { result: false, message: 'Value must be positive!' };
                }else{
                    return true;
                }
            }

            let cellsrenderer = function(row, columnfield, value, defaulthtml, columnproperties) {
                //console.log(value)
                var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
            }.bind(this);

            let cellsrendererPinned = function(row, columnfield, value, defaulthtml, columnproperties) {
                //console.log(value)
                if(value == ''){
                    return '<span style="margin: 4px; float:left; color: #a6a6a6; " >n/a</span>';
               }
            }.bind(this);
        
            let initeditor = function(row, cellvalue, editor) {
                editor.jqxNumberInput({ decimalDigits: 4 });
            }

            //grid datafields
            datafields.push({ name: 'groupId', type:'string' });
            datafields.push({ name: 'groupName', type:'string' });
            datafields.push({ name: 'param', type:'string' });   
            datafields.push({ name: 'paramName', type:'string' }); 
            datafields.push({ name: 'TechId', type:'string' });  
            datafields.push({ name: 'TechName', type:'string' });
            datafields.push({ name: 'CommId', type:'string' });  
            datafields.push({ name: 'CommName', type:'string' });   
            datafields.push({ name: 'EmisId', type:'string' });  
            datafields.push({ name: 'EmisName', type:'string' });   
            datafields.push({ name: 'Timeslice', type:'string' }); 

            columns.push({ text: 'groupId', datafield: 'groupId', pinned:true, editable: false, align: 'left',  minWidth: 200, maxWidth: 220, hidden: true });
            columns.push({ text: 'GROUP NAME', datafield: 'groupName',editable: false, align: 'left',  minWidth: 200, maxWidth: 220 });
            columns.push({ text: 'param', datafield: 'param',  editable: false, align: 'left',  minWidth: 120, maxWidth: 200, hidden: true });
            columns.push({ text: 'PARAMETER NAME', datafield: 'paramName', editable: false, align: 'left',  minWidth: 250, maxWidth: 300 });
            columns.push({ text: 'TECHNOLOGY', datafield: 'TechId', editable: false, align: 'left',  minWidth: 120, maxWidth: 200, hidden: true  });
            columns.push({ text: 'TECHNOLOGY', datafield: 'TechName', editable: false, align: 'left',  minWidth: 120, maxWidth: 200,  cellsrenderer: cellsrendererPinned });
            columns.push({ text: 'COMMODITY', datafield: 'CommId', editable: false, align: 'left',  minWidth: 120, maxWidth: 200, hidden: true  });
            columns.push({ text: 'COMMODITY', datafield: 'CommName', editable: false, align: 'left',  minWidth: 120, maxWidth: 200,  cellsrenderer: cellsrendererPinned });
            columns.push({ text: 'EMISSION', datafield: 'EmisId', editable: false, align: 'left',  minWidth: 120, maxWidth: 200, hidden: true  });    
            columns.push({ text: 'EMISSION', datafield: 'EmisName', editable: false, align: 'left',  minWidth: 120, maxWidth: 200,  cellsrenderer: cellsrendererPinned });
            columns.push({ text: 'TIMESLICE', datafield: 'Timeslice', editable: false, align: 'left',  minWidth: 120, maxWidth: 200,  cellsrenderer: cellsrendererPinned });

            //datafields and columns
            $.each(years, function (id, year) {
                datafields.push({ name: year, type:'number' });
                columns.push({ text: year, datafield: year,  cellsalign: 'right',  align: 'center', columntype: 'numberinput', cellsformat: 'd2', 
                    initeditor: initeditor,
                    validation: validation,
                    cellsrenderer: cellsrenderer
                });
            });

            let TechName = DataModel.TechName(genData);
            let CommName = DataModel.CommName(genData);
            let EmiName = DataModel.EmiName(genData);
            
            $.each(viewData, function (byType, obj1) {
                $.each(obj1, function (tech, array) {
                    $.each(array, function (id, obj) {
                        obj['groupName'] = GROUPNAMES[obj['groupId']];
                        if(obj['TechId'] != null){
                            obj['TechName'] = TechName[obj['TechId']];
                        }
                        else{
                            obj['CommName'] = null;
                        }
                        if(obj['CommId'] != null){
                            obj['CommName'] = CommName[obj['CommId']];
                        }
                        else{
                            obj['CommName'] = null;
                        }
                        if(obj['EmisId'] != null){
                            obj['EmisName'] = EmiName[obj['EmisId']];
                        }
                        else{
                            obj['EmisName'] = null;
                        }
                    });
                });
            });



            console.log('viewData2 ', viewData)
            let gridData = viewData;

            let srcGrid = {
                datatype: "json",
                localdata:  gridData,
                root: genData["osy-tech"][0]['TechId'],
                datafields: datafields,
            };

            this.casename = casename; 
            this.techs = techs;
            this.comms = comms;
            this.emis = emis;
            this.columns = columns;
            this.gridData = gridData;
            this.srcGrid = srcGrid
        }else{
            this.casename = null; 
            this.columns = null;
            this.gridData = null;
            this.srcGrid = srcGrid
        }
    }
}