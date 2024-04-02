import { DataModel } from "../../Classes/DataModel.Class.js";
import { Functions } from "../../Classes/Functions.Class.js";

export class Model {

    constructor(casename, genData, RYSdata, group, PARAMETERS, param) {

        let paramData = DataModel.getParamData(PARAMETERS);
        // let decimal = Functions.getDecimalPlaces(paramData[group][param]['default']);
        // this.d = decimal;
        // this.decimal = 'd' + this.d;

        this.d = 3;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let columns = [];
            let years = genData['osy-years'];
            let stgs = genData['osy-stg'];
            let scenarios = genData['osy-scenarios'];
            this.param = param;

            let RYSgrid = DataModel.RYSgrid(genData, RYSdata, PARAMETERS);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            let scClass = {};
            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_' + id;
            });

            datafields.push({ name: 'ScId', type: 'string' });
            datafields.push({ name: 'Sc', type: 'string' });
            datafields.push({ name: 'StgId', type: 'string' });
            datafields.push({ name: 'Stg', type: 'string' });
            datafields.push({ name: 'ScDesc', type: 'string' });
            datafields.push({ name: 'StgDesc', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });

            let validation = function (cell, value) {
                if (value < 0) {
                    return { result: false, message: 'Value must be positive!' };
                } 
                else {
                    return true;
                }
                
            }.bind(this);

            var cellclass = function (row, columnfield, value, data) {
                return scClass[data.ScId];
            }

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                //console.log('value ', value)
                
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }
            }.bind(this);

            let initeditor = function (row, cellvalue, editor, data) {
                
                var scId = $('#osy-gridRYS').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0') {
                    editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: false, allowNull: true }); //symbol: ' GWh', symbolPosition: 'right'
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8) {
                            //$('#' + editor[0].id).val(null);
                            editor.jqxNumberInput('val',null); 
                        }
                    })
                }else{
                    editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: false, allowNull: false }); //symbol: ' GWh', symbolPosition: 'right'
                    editor.val(cellvalue);
                }

            }.bind(this);

            let geteditorvalue =  function (row, cellvalue, editor) {           
                return editor.val() == null ? null : editor.val();
            }

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left', cellclassname: cellclass, enabletooltips: true, filterable: false}); 
            columns.push({ text: 'Storage', datafield: 'Stg', pinned: true, editable: false, align: 'left', cellclassname: cellclass, enabletooltips: true, filterable: true});
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center', cellclassname: cellclass, filterable: false });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: this.decimal, minWidth: 55, maxWidth: 110,
                    filterable: false,
                    groupable: false,
                    sortable: false,
                    initeditor: initeditor,
                    validation: validation,
                    cellsrenderer: cellsrenderer,
                    cellclassname: cellclass,
                    geteditorvalue:  geteditorvalue
                });
            }.bind(this));

            let srcGrid = {
                datatype: "json",
                localdata: RYSgrid,
                root: param,
                datafields: datafields,
            };

            this.casename = casename;
            this.years = years;
            this.stgs = stgs;
            this.param = param;
            this.stgCount = stgs.length
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.columns = columns;
            this.gridData = RYSgrid;
            this.genData = genData;
            // this.param = param;
            this.paramData = paramData;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid,
            this.PARAMETERS = PARAMETERS
        } else {
            this.casename = null;
            this.years = null;
            this.techs = null;
            this.columns = null;
            this.gridData = null;
            this.genData = null;
            this.PARAMNAMES = null;
            this.param = param;
            this.group = group;
            this.srcGrid = srcGrid
            this.PARAMETERS = PARAMETERS
        }

    }
}