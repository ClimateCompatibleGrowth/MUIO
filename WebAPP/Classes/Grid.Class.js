import { UNITS, TAGS } from './Const.Class.js';
import { Message } from "./Message.Class.js";
import { JqxSources } from "./JqxSources.Class.js";


export class Grid {
    
    static theme() {
        let theme = "bootstrap";
        return theme
    }

    static techsGrid(techs, commodities, emissions, commNames, emiNames){  

        this.srcTechs = JqxSources.srcTech(techs);
        this.srcComms = JqxSources.srcComm(commodities);
        this.srcEmi = JqxSources.srcEmi(emissions);
        this.srcUnits = JqxSources.srcUnit(JSON.stringify(UNITS));

        this.daTechs = new $.jqx.dataAdapter(this.srcTechs);
        this.daComms = new $.jqx.dataAdapter(this.srcComms, {
            autoBind: true
        });
        this.daEmi = new $.jqx.dataAdapter(this.srcEmi, {
            autoBind: true
        });
        this.daUnits = new $.jqx.dataAdapter(this.srcUnits);


        var ddlUnits = function(row, value, editor) {
            editor.jqxDropDownList({ source: this.daUnits, displayMember: 'name', valueMember: 'id', groupMember: 'group' });
        }.bind(this);

        var ddlComms = function(row, value, editor) {
            let data = this.daComms.records;
            editor.jqxDropDownList({ source: this.daComms, displayMember: 'Comm', valueMember: 'CommId', checkboxes: true,
                renderer: function (index, label, value) {
                    let tootltipValue = label;
                    let tooltipContent = `<div data-toggle="tooltip" data-placement="top" title="${data[index]['Desc']}">${tootltipValue}</div>`;
                    // $(`#${tootltipValue}`).jqxTooltip({ content: tooltipContent });
                    // $(`#${tootltipValue}`).jqxTooltip('open', 15, 15);
                    return tooltipContent
                }
            });
        }.bind(this);

        var ddlEmis = function(row, value, editor) {
            let data = this.daEmi.records;
            editor.jqxDropDownList({ source: this.daEmi, displayMember: 'Emis', valueMember: 'EmisId', checkboxes: true,
                renderer: function (index, label, value) {
                    let tootltipValue = label;
                    let tooltipContent = `<div data-toggle="tooltip" data-placement="top" title="${data[index]['Desc']}">${tootltipValue}</div>`;
                    // $(`#${tootltipValue}`).jqxTooltip({ content: tooltipContent });
                    // $(`#${tootltipValue}`).jqxTooltip('open', 15, 15);
                    return tooltipContent
                }
            });
        }.bind(this);

        var initeditor = function (row, cellvalue, editor, celltext, pressedkey) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            console.log('editor ', editor)
            var items = editor.jqxDropDownList('getItems');
            editor.jqxDropDownList('uncheckAll');
            if(Array.isArray(cellvalue)){
                var values = cellvalue;
            }else{
                var values = cellvalue.split(/,\s*/);
            } 
           
            for (var j = 0; j < values.length; j++) {
                for (var i = 0; i < items.length; i++) {
                    //if (items[i].label === values[j]) {
                    if (items[i].value === values[j]) {
                        editor.jqxDropDownList('checkIndex', i);
                    }
                }
            }
        }.bind(this)

        var getEditorValue = function (row, cellvalue, editor) {
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

        var cellsrendererComms = function (row, columnfield, value, defaulthtml, columnproperties) {
            let valueNames = [];
            if(Array.isArray(value)){
                var values = value;
            }else{
                var values = value.split(/,\s*/);
            } 
            $.each(values, function (id, commId) {
                valueNames.push(commNames[commId])
            });
            return `<div class='jqx-grid-cell-middle-align' style="margin-top: 8.5px;">${valueNames} </div>`;
        }.bind(this);
        
        var cellsrendererEmis = function (row, columnfield, value, defaulthtml, columnproperties) {
            let valueNames = [];
            if(Array.isArray(value)){
                var values = value;
            }else{
                var values = value.split(/,\s*/);
            } 
            $.each(values, function (id, emisId) {
                valueNames.push(emiNames[emisId])
            });
            return `<div class='jqx-grid-cell-middle-align' style="margin-top: 8.5px;">${valueNames} </div>`;
        }.bind(this);

        var tooltiprenderer = function (element) {
            let id = $(element).text();
            let tooltip = {
                'IAR': 'Input  <br />Activity Ratio',
                'OAR': 'Output  <br />Activity Ratio',
                'EAR': 'Emission  <br />Activity Ratio',
                'TMPAL': 'Total Technology Model <br />Period Activity Lower Limit',
                'TMPAU': 'Total Technology Model <br />Period Activity Upper Limit',
                'CAU': 'Capacity To Activity <br />Unit',
                'OL': 'Operational Life'
            }
            $(element).parent().jqxTooltip({ position: 'mouse', content: tooltip[id] });

            //$("#filmPicture1").jqxTooltip({ content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012', position: 'mouse', name: 'movieTooltip'});
        }

        $("#osy-gridTech").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: this.daTechs,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'techId', datafield: 'TechId', hidden: true },
              { text: 'Technology', datafield: 'Tech', width: '15%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '25%', align: 'center',cellsalign: 'left' },
              { text: 'Unit of capacity', datafield: 'CapUnitId', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlUnits, align: 'center',cellsalign: 'center'},
              { text: 'Unit of activity', datafield: 'ActUnitId', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlUnits, align: 'center',cellsalign: 'center'},
              { text: 'IAR', datafield: 'IAR', width: '10%', cellsrenderer:cellsrendererComms, rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: 'OAR', datafield: 'OAR', width: '10%', cellsrenderer:cellsrendererComms, rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: 'EAR', datafield: 'EAR', width: '10%', cellsrenderer:cellsrendererEmis, rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlEmis, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
            ]
        }); 
    }

    // static techsGrid(srcTech, srcComm, srcEmi){
    static techsGrid_BKP(daTechs,ddlComms, ddlEmis){
   
        // let daTechs = new $.jqx.dataAdapter(srcTech);
        // let daComms = new $.jqx.dataAdapter(srcComm);
        // let daEmi = new $.jqx.dataAdapter(srcEmi);

        // var ddlComms = function(row, value, editor) {
        //     //console.log('editor ', editor)
        //     editor.jqxDropDownList({ source: daComms, displayMember: 'Comm', valueMember: 'CommId', checkboxes: true });
        // }

        // var ddlEmis = function(row, value, editor) {
        //     //console.log('editor ', editor)
        //     editor.jqxDropDownList({ source: daEmi, displayMember: 'Emis', valueMember: 'EmisId', checkboxes: true });
        // }
        var ddlSource = {
            localdata: JSON.stringify(UNITS),
            datatype: "json",
            datafields:
            [
                { name: 'id', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'group', type: 'string' }
            ],
        };
        var daUnits = new $.jqx.dataAdapter(ddlSource);

        var ddlEditor = function(row, value, editor) {
            editor.jqxDropDownList({ 
                source: daUnits, 
                displayMember: 'name', 
                valueMember: 'id', 
                groupMember: 'group',
                animationType: 'slide',
                enableHover: true,
                filterable:true,
                enableSelection:true,
                //autoItemsHeight: true,
                //dropDownWidth: 250,
                autoDropDownHeight: false
            });
        }

        var initeditor = function (row, cellvalue, editor, celltext, pressedkey) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var items = editor.jqxDropDownList('getItems');
            editor.jqxDropDownList('uncheckAll');
            // console.log('cellvalues ', cellvalue)
            // console.log('items ', items)
            if(Array.isArray(cellvalue)){
                var values = cellvalue;
                //console.log('values array ', values)
            }else{
                var values = cellvalue.split(/,\s*/);
                 //console.log('values strig ', values)
            } 
           
            for (var j = 0; j < values.length; j++) {
                for (var i = 0; i < items.length; i++) {
                    //if (items[i].label === values[j]) {
                    if (items[i].value === values[j]) {
                        editor.jqxDropDownList('checkIndex', i);
                    }
                }
            }
        }

        var getEditorValue = function (row, cellvalue, editor) {
            // return the editor's value.
            //console.log(editor, editor.text())
           // console.log(cellvalue, editor.val(), editor)
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

        var tooltiprenderer = function (element) {
            let id = $(element).text();
            let tooltip = {
                'IAR': 'Input  <br />Activity Ratio',
                'OAR': 'Output  <br />Activity Ratio',
                'EAR': 'Emission  <br />Activity Ratio',
                'TMPAL': 'Total Technology Model <br />Period Activity Lower Limit',
                'TMPAU': 'Total Technology Model <br />Period Activity Upper Limit',
                'CAU': 'Capacity To Activity <br />Unit',
                'OL': 'Operational Life'
            }
            //console.log(id, tooltip.id, tooltip[id] );
            $(element).parent().jqxTooltip({ position: 'mouse', content: tooltip[id] });

            //$("#filmPicture1").jqxTooltip({ content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012', position: 'mouse', name: 'movieTooltip'});
        }

        $("#osy-gridTech").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: daTechs,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'techId', datafield: 'TechId', hidden: true },
              { text: 'Technology', datafield: 'Tech', width: '15%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '25%', align: 'center',cellsalign: 'left' },
              { text: 'Unit of capacity', datafield: 'CapUnitId', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlEditor, align: 'center',cellsalign: 'center'},
              { text: 'Unit of activity', datafield: 'ActUnitId', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlEditor, align: 'center',cellsalign: 'center'},
              { text: 'IAR', datafield: 'IAR', width: '10%', rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: 'OAR', datafield: 'OAR', width: '10%', rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlComms, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: 'EAR', datafield: 'EAR', width: '10%', rendered: tooltiprenderer, columntype: 'dropdownlist',  createeditor: ddlEmis, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
            ]
        }); 
    }

    static commGrid(commodities){

        let srcComms = JqxSources.srcComm(commodities);
        let srcUnits = JqxSources.srcUnit(JSON.stringify(UNITS));

        var daComms = new $.jqx.dataAdapter(srcComms);
        var daUnits = new $.jqx.dataAdapter(srcUnits);

        var ddlEditor = function(row, value, editor) {
            editor.jqxDropDownList({ source: daUnits, displayMember: 'name', valueMember: 'id', groupMember: 'group' });
        }
        
        var validation_1 = function (cell, value) {
            var validationResult = true;
            var rows = $('#osy-gridComm').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].Comm.trim() == value.trim() && i != cell.row) {
                    validationResult = false;
                    break;
                }
            };

            if (validationResult == false) {
                Message.smallBoxWarning("Input message", "Commodity name should be unique!", 3000);
                return { result: false, message: "" };
            }
            return true;
        }

        var cellsrendererbutton = function (row, column, value) {
            // var id = $("#osy-gridComm").jqxGrid('getrowid', row);
            if (row == 0) {
                return '';
            }
            return '<span style="padding:10px; width:100%; border:none" class="btn btn-default deleteComm" data-id='+ row+' ><i class="fa  fa-minus-circle danger"></i>Delete</span>';
        }

        $("#osy-gridComm").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: daComms,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'CommId', datafield: 'CommId', hidden: true },
              { text: 'Commodity name', datafield: 'Comm', width: '20%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '50%', align: 'center',cellsalign: 'left' },
              { text: 'Unit', datafield: 'UnitId', width: '20%',  columntype: 'dropdownlist',  createeditor: ddlEditor, align: 'center',cellsalign: 'center'},
              { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
            ]
        }); 
    }

    static emisGrid(emissions){

        let srcEmi = JqxSources.srcEmi(emissions);
        let srcUnit = JqxSources.srcUnit(JSON.stringify(UNITS));

        var daEmi = new $.jqx.dataAdapter(srcEmi);
        var daUnit = new $.jqx.dataAdapter(srcUnit);

        var ddlEditor = function(row, value, editor) {
            editor.jqxDropDownList({ source: daUnit, displayMember: 'name', valueMember: 'id', groupMember: 'group' });
        }
        
        var validation_1 = function (cell, value) {
            var validationResult = true;
            var rows = $('#osy-gridEmis').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].Emis.trim() == value.trim() && i != cell.row) {
                    validationResult = false;
                    break;
                }
            };

            if (validationResult == false) {
                Message.smallBoxWarning("Input message", "Emission name should be unique!", 3000);
                return { result: false, message: "" };
            }
            return true;
        }

        var cellsrendererbutton = function (row, column, value) {
            //var id = $("#osy-gridEmis").jqxGrid('getrowid', row);
            if (row == 0) {
                return '';
            }
            return '<span style="padding:10px; width:100%; border:none" class="btn btn-default deleteEmis" data-id='+ row+'><i class="fa  fa-minus-circle danger"></i>Delete</span>';
        }

        var tooltiprenderer = function (element) {
            let id = $(element).text();
            let tooltip = {
                'MPEL': 'Model Period <br /> Emission Limit',
                'MPEE': 'Model Period <br /> Exogenous Emission'
            }
            //console.log(id, tooltip.id, tooltip[id] );
            $(element).parent().jqxTooltip({ position: 'mouse', content: tooltip[id] });

            //$("#filmPicture1").jqxTooltip({ content: '<b>Title:</b> <i>The Amazing Spider-man</i><br /><b>Year:</b> 2012', position: 'mouse', name: 'movieTooltip'});
        }

        $("#osy-gridEmis").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: daEmi,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'EmisId', datafield: 'EmisId', hidden: true },
              { text: 'Emission name', datafield: 'Emis', width: '20%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '50%', align: 'center',cellsalign: 'left'},
              { text: 'Unit', datafield: 'UnitId', width: '20%',  columntype: 'dropdownlist',  createeditor: ddlEditor, align: 'center',cellsalign: 'center'},
              { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
            ]
        }); 
    }

    static scenarioGrid(scenarios){

        let srcScenario = JqxSources.srcScenario(scenarios);
        var daScenario = new $.jqx.dataAdapter(srcScenario);

        var validation_1 = function (cell, value) {
            var validationResult = true;
            var rows = $('#osy-gridScenario').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].Scenario.trim() == value.trim() && i != cell.row) {
                    validationResult = false;
                    break;
                }
            };

            if (validationResult == false) {
                Message.smallBoxWarning("Input message", "Scenario name should be unique!", 3000);
                return { result: false, message: "" };
            }
            return true;
        }

        var cellsrendererbutton = function (row, column, value) {
            // var id = $("#osy-gridComm").jqxGrid('getrowid', row);
            if (row == 0) {
                return '';
            }
            return '<span style="padding:10px; width:100%; border:none" class="btn btn-default deleteScenario" data-id='+ row+' ><i class="fa  fa-minus-circle danger"></i>Delete</span>';
        }

        $("#osy-gridScenario").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: daScenario,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'ScenarioId', datafield: 'ScenarioId', hidden: true },
              { text: 'Scenario name', datafield: 'Scenario', width: '20%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '70%', align: 'center',cellsalign: 'left' },
              { text: '', datafield: 'Delete', width: '10%',  cellsrenderer: cellsrendererbutton, editable:false  },
            ]
        }); 
    }

    static constraintGrid(techs, constraints, techNames){

        console.log('techs ', techs)
        this.srcTechs = JqxSources.srcTech(techs);
        this.srcTags = JqxSources.srcTag(JSON.stringify(TAGS));

        this.daTech = new $.jqx.dataAdapter(this.srcTechs, {
            autoBind: true
        });
        this.daTags = new $.jqx.dataAdapter(this.srcTags, {
            autoBind: true
        });

        this.srcConstraint = JqxSources.srcConstraint(constraints, this.daTags.records);
        this.daConstraint = new $.jqx.dataAdapter(this.srcConstraint);
        
        var ddlTechs = function(row, value, editor) {
            //console.log('editor ', editor)
            let data = this.daTech.records;
            editor.jqxDropDownList({ source: this.daTech, displayMember: 'Tech', valueMember: 'TechId', checkboxes: true,
                renderer: function (index, label, value) {
                    let tootltipValue = label;
                    let tooltipContent = `<div data-toggle="tooltip" data-placement="top" title="${data[index]['Desc']}">${tootltipValue}</div>`;
                    // $(`#${tootltipValue}`).jqxTooltip({ content: tooltipContent });
                    // $(`#${tootltipValue}`).jqxTooltip('open', 15, 15);
                    return tooltipContent
                }
            }).bind(this);


        }.bind(this);

        var ddlTags = function(row, value, editor) {
            editor.jqxDropDownList({ source: this.daTags, displayMember: 'name', valueMember: 'id'});
        }.bind(this);

        var validation_1 = function (cell, value) {
            var validationResult = true;
            var rows = $('#osy-gridScenario').jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].Scenario.trim() == value.trim() && i != cell.row) {
                    validationResult = false;
                    break;
                }
            };

            if (validationResult == false) {
                Message.smallBoxWarning("Input message", "Scenario name should be unique!", 3000);
                return { result: false, message: "" };
            }
            return true;
        }

        var getEditorValue = function (row, cellvalue, editor) {
            //             console.log('cellvalue ', cellvalue)

            // let tootltipValue =cellvalue;
            // let tooltipContent = "<div>" + tootltipValue + "</div>";
            // editor.jqxTooltip({ content: tooltipContent });
            // editor.jqxTooltip('open', 15, 15);
            return editor.val();
        }

        var initeditor = function (row, cellvalue, editor, celltext, pressedkey) {
            // set the editor's current value. The callback is called each time the editor is displayed.
            var items = editor.jqxDropDownList('getItems');
            //console.log('items ', items)
            editor.jqxDropDownList('uncheckAll');

            if(Array.isArray(cellvalue)){
                var values = cellvalue;
            }else{
                var values = cellvalue.split(/,\s*/);
            } 
           
            for (var j = 0; j < values.length; j++) {
                for (var i = 0; i < items.length; i++) {
                    //if (items[i].label === values[j]) {
                    if (items[i].value === values[j]) {
                        editor.jqxDropDownList('checkIndex', i);
                    }
                }
            }
        }.bind(this);

        var cellsrendererbutton = function (row, column, value) {
            return '<span style="padding:10px; width:100%; border:none" class="btn btn-default deleteConstraint" data-id='+ row+' ><i class="fa fa-minus-circle danger"></i>Delete</span>';
        }

        var cellsrendererTechs = function (row, columnfield, value, defaulthtml, columnproperties) {
            let valueNames = [];

            if(Array.isArray(value)){
                var values = value;
            }else{
                var values = value.split(/,\s*/);
            } 

            $.each(values, function (id, techId) {
                valueNames.push(techNames[techId])
            });

            return `<div class='jqx-grid-cell-middle-align'  style="margin-top: 8.5px;">${valueNames} </div>`;

        }.bind(this);

        $("#osy-gridConstraint").jqxGrid({
            width: '100%',
            autoheight: true,
            columnsheight: 20,
            theme: this.theme(),
            source: this.daConstraint,
            editable: true,
            selectionmode: 'none',
            enablehover: false,
            columns: [
              { text: 'ConId', datafield: 'ConId', hidden: true },
              { text: 'Constraint name', datafield: 'Con', width: '20%',align: 'center',cellsalign: 'left', validation:validation_1 },
              { text: 'Description', datafield: 'Desc', width: '40%', align: 'center',cellsalign: 'left' },
              { text: 'Tag', datafield: 'Tag', displayfield: 'TagName', width: '10%',  columntype: 'dropdownlist',  createeditor: ddlTags, align: 'center',cellsalign: 'center'},
              { text: 'Technology', datafield: 'CM', width: '20%', columntype: 'dropdownlist', cellsrenderer:cellsrendererTechs,  createeditor: ddlTechs, align: 'center',cellsalign: 'center', initeditor: initeditor, geteditorvalue: getEditorValue },
              { text: '', datafield: 'Delete', width: '10%', editable:false, cellsrenderer: cellsrendererbutton  },
            ]
        }); 
    }

    static Grid($div, daGrid, columns, groupable=false, filterable=false, clipboard=true){

        $div.jqxGrid({
            theme: this.theme(),
            width: '100%',
            //height:71+count*26,
            autoheight: true,
            autoshowloadelement: true,
            rowsheight: 25,
            source: daGrid,
            columnsautoresize: true,
            columnsresize:true,
            groupable: groupable,
            filterable: filterable,
            sortable: true,
            filtermode: 'excel',
            autoshowfiltericon: true,
            enablekeyboarddelete: false,
            // pageable: true,
            // pagerheight: 26,
            // pagesize: 20,
            // pagermode: "simple",
            editable: true,
            altrows: true,
            clipboard: clipboard, 
            selectionmode: 'multiplecellsadvanced',
            enablehover: true,
            editmode: 'selectedcell',
            cellhover: function (element, pageX, pageY, record) {
                
                //var cellValue = $(element.innerHTML).find('span').html(); // you can remove if any element not required in tooltip here
                var cellValue = $(element.innerHTML).text();
               
                // console.log(daGrid.records)
                // console.log($(element.innerHTML).text())

                let tootltipValue;
                var tooltipContent
                $.each(daGrid.records, function (id, obj) {
                    if (obj.Sc == cellValue){
                        tootltipValue = obj.ScDesc;
                        tooltipContent = "<div>" + tootltipValue + "</div>";
                        return;
                        
                    }
                    else if (obj.Tech == cellValue){
                        tootltipValue = obj.TechDesc;
                        tooltipContent = "<div>" + tootltipValue + "</div>";
                        return;
                    }
                    else if (obj.Comm == cellValue){
                        tootltipValue = obj.CommDesc;
                        tooltipContent = "<div>" + tootltipValue + "</div>";
                        return;
                    }
                    else if (obj.Emis == cellValue){
                        tootltipValue = obj.EmiDesc;
                        tooltipContent = "<div>" + tootltipValue + "</div>";
                        return;
                    }
                    else if (obj.Con == cellValue){
                        tootltipValue = obj.ConDesc;
                        tooltipContent = "<div>" + tootltipValue + "</div>";
                        return;
                    }
                });

                if (tootltipValue && tootltipValue.trim().length > 0) {
                  $(element).jqxTooltip({ content: tooltipContent });
                  $(element).jqxTooltip('open', pageX + 15, pageY + 15);
                } else {
                    $div.jqxTooltip('close');
                }           
            },

            columns:columns
        });

    }

    static applyRYFilter( $divGrid, years, sc=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYCFilter( $divGrid, years, sc=null, comm=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && comm != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = comm;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Comm', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYCnFilter( $divGrid, years, sc=null, con=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && con != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = con;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Con', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYEFilter( $divGrid, years, sc=null, emi=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && emi != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = emi;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Emis', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTFilter( $divGrid, years, sc=null, tech=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = tech;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTMFilter( $divGrid, years, sc=null, tech=null, mo=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && mo != null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = mo;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'MoId', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = tech;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup4);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTsFilter( $divGrid, years, sc=null, ts=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && ts != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = ts;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'YearSplit', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTTsFilter( $divGrid, years, sc=null, tech=null, ts=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && ts != null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = ts;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Timeslice', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = tech;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup4);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTCFilter( $divGrid, years, sc=null, tech=null, comm=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && comm != null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = comm;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Comm', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = tech;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup4);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTCnFilter( $divGrid, years, sc=null, tech=null, con=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && con != null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = con;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Con', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = tech;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup4);
        }
        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYTEFilter( $divGrid, years, sc=null, tech=null, emi=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && emi != null && tech != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = emi;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Emis', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = tech;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Tech', filtergroup4);
        }
        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRYCTsFilter( $divGrid, years, sc=null, comm=null, ts=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && ts != null && comm != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = ts;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Timeslice', filtergroup3);

            var filtergroup4 = new $.jqx.filter();
            filtergroup4.operator = 'and';
            var filtertype4 = 'stringfilter';
            var filter_or_operator4 = 0;
            var filtervalue4 = comm;
            var filtercondition4 = 'EQUAL_CASE_SENSITIVE';
            
            var filter4 = filtergroup4.createfilter(filtertype4, filtervalue4, filtercondition4);
            filtergroup4.addfilter(filter_or_operator4, filter4);    
            $divGrid.jqxGrid('addfilter', 'Comm', filtergroup4);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRTFilter( $divGrid, techs, sc=null, param=null) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && param != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = param;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Param', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(techs, function (id, tech) {
            $divGrid.jqxGrid('addfilter', tech.TechId, filtergroup1);
        }); 
        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyREFilter( $divGrid, emis, sc=null, param=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null && param != null){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

            var filtergroup3 = new $.jqx.filter();
            filtergroup3.operator = 'and';
            var filtertype3 = 'stringfilter';
            var filter_or_operator3 = 0;
            var filtervalue3 = param;
            var filtercondition3 = 'EQUAL_CASE_SENSITIVE';
            
            var filter3 = filtergroup3.createfilter(filtertype3, filtervalue3, filtercondition3);
            filtergroup3.addfilter(filter_or_operator3, filter3);    
            $divGrid.jqxGrid('addfilter', 'Param', filtergroup3);
        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(emis, function (id, emi) {
            $divGrid.jqxGrid('addfilter', emi.EmisId, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyRFilter( $divGrid, sc=null ) {
        //$('#jqxLoader').jqxLoader('open');
        //$("#jqxLoader").jqxLoader({theme: 'darkblue', imagePosition:"top", isModal:true,width: 500, height: 70, text: "Uploading Hourly Data Paterns..." });
        $divGrid.jqxGrid('clearfilters');
        
        //filter column 2
        if (sc !== null ){

            var filtergroup2 = new $.jqx.filter();
            filtergroup2.operator = 'and';
            var filtertype2 = 'stringfilter';
            var filter_or_operator2 = 0;
            var filtervalue2 = sc;
            var filtercondition2 = 'EQUAL_CASE_SENSITIVE';
            
            var filter2 = filtergroup2.createfilter(filtertype2, filtervalue2, filtercondition2);
            filtergroup2.addfilter(filter_or_operator2, filter2);    
            $divGrid.jqxGrid('addfilter', 'Sc', filtergroup2);

        }

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $divGrid.jqxGrid('addfilter', 'value', filtergroup1);

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyViewDataFilter( $divGrid, years) {

        $divGrid.jqxGrid('clearfilters');

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $.each(years, function (id, year) {
            $divGrid.jqxGrid('addfilter', year, filtergroup1);
        }); 

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
    }

    static applyTEviewDataFilter( $divGrid) {
        $divGrid.jqxGrid('clearfilters');

        //filter colum 1 null values
        var filtergroup1 = new $.jqx.filter();
        filtergroup1.operator = 'or';
        var filtertype1 = 'numericfilter';
        var filter_or_operator1 = 1;
        var filtervalue1 = null;
        var filtercondition1 = 'NOT_NULL';
        
        var filter1 = filtergroup1.createfilter(filtertype1, filtervalue1, filtercondition1);
        filtergroup1.addfilter(filter_or_operator1, filter1);   
        $divGrid.jqxGrid('addfilter', 'value', filtergroup1);

        // // apply the filters.
        $divGrid.jqxGrid('applyfilters');
        //$('#loadermain').hide(); 
    }
}
