export class JqxSources{
    static srcTech(techs){
        var srcTech =  {
            localdata: techs,
            datatype: "json",
            datafields:
            [
                { name: 'TechId', type: 'string' },
                { name: 'Tech', type: 'string' },
                { name: 'Desc', type: 'string' },
                { name: 'IAR', type: 'array' },
                { name: 'OAR', type: 'array' },
                { name: 'EAR', type: 'array' },
                { name: 'TMPAL', type: 'number'},
                { name: 'TMPAU', type: 'number'},
                { name: 'CAU', type: 'number'},
                { name: 'OL', type: 'number'}
            ],
        }
        return srcTech;
    }

    static srcComm(commodities){
        var srcComm = {
            localdata: commodities,
            datatype: "json",
            datafields:
            [
                { name: 'CommId', type: 'string' },
                { name: 'Comm', type: 'string' }
            ],
        }
        return srcComm;
    }

    static srcEmi(emissions){
        var srcEmi = {
            localdata: emissions,
            datatype: "json",
            datafields:
            [
                { name: 'EmisId', type: 'string' },
                { name: 'Emis', type: 'string' }
            ],
        }
        return srcEmi;
    }

    static techGridColumns(daComms){
       
      
        var ddlComms = function(row, value, editor) {
          console.log('editor ', editor)
          editor.jqxDropDownList({ source: daComms, displayMember: 'Comm', valueMember: 'CommId', checkboxes: true });
        }
  
        var initeditor = function (row, cellvalue, editor, celltext, pressedkey) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var items = editor.jqxDropDownList('getItems');
            editor.jqxDropDownList('uncheckAll');
            console.log('cellvalues ', cellvalue)
            if(Array.isArray(cellvalue)){
                var values = cellvalue;
                console.log('values array ', values)
            }else{
                var values = cellvalue.split(/,\s*/);
                console.log('values strig ', values)
            } 
          
            for (var j = 0; j < values.length; j++) {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].label === values[j]) {
                        editor.jqxDropDownList('checkIndex', i);
                    }
                }
            }
        }
  
        var getEditorValue = function (row, cellvalue, editor) {
            // return the editor's value.
            return editor.val();
        }
        
        var validation_1 = function (cell, value) {
            var validationResult = true;
            var rows = $('#osy-gridTech').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].Tech.trim() == value.trim() && i != cell.row) {
                    validationResult = false;
                    break;
                }
            };
  
            if (validationResult == false) {
                Message.smallBoxWarning("Input message", "Technology name should be unique!", 3000);
                return { result: false, message: "" };
            }
            return true;
        }
  
        var validation_2 = function(cell, value){
            if(value < 0 ){
                return { result: false, message: "Vlaue should be positive" };
            }else{
                return true;
            }
        }
  
        var cellsrendererbutton = function (row, column, value) {
            var id = $("#osy-gridTech").jqxGrid('getrowid', row);
            if (id == 0) {
                return '';
            }
            return '<span style="padding:10px; width:100%; border:none" class="btn btn-default deleteTech" data-id='+ id+'><i class="fa  fa-minus-circle danger"></i>Delete</span>';
        }
  
        let columnsTech= [
          { text: 'techId', datafield: 'TechId', hidden: true },
          { text: 'Technology', datafield: 'Tech', width: '13%',align: 'center',cellsalign: 'left', validation:validation_1 },
          { text: 'Description', datafield: 'Desc', width: '15%', align: 'center',cellsalign: 'left' },
          { text: 'IAR', datafield: 'IAR', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
          { text: 'OAR', datafield: 'OAR', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
          { text: 'EAR', datafield: 'EAR', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
          { text: 'TMPAL', datafield: 'TMPAL', width: '8%', align: 'center',cellsalign: 'right', cellsformat: 'n', validation:validation_2, columntype: 'numberinput'},
          { text: 'TMPAU', datafield: 'TMPAU', width: '8%', align: 'center',cellsalign: 'right', cellsformat: 'n', validation:validation_2, columntype: 'numberinput'},
          { text: 'CAU', datafield: 'CAU', width: '8%', align: 'center',cellsalign: 'right', cellsformat: 'n', validation:validation_2, columntype: 'numberinput'},
          { text: 'OL', datafield: 'OL', width: '8%', align: 'center',cellsalign: 'right', cellsformat: 'n', validation:validation_2, columntype: 'numberinput'},
          { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
        ];

        return columnsTech;
    }
}