import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, RYTsdata, group, PARAMETERS, param) {
        this.d = 3;
        this.decimal = 'd' + this.d;
        if (casename) {

            let datafields = [];
            //let datafieldsChart = [];
            let columns = [];
            //let series = [];
            let years = genData['osy-years'];
            let scenarios = genData['osy-scenarios'];

            //let timeslices = DataModel.Timeslices(genData);
            let RYTsgrid = DataModel.RYTsgrid(genData, RYTsdata);
            //let RYTschart = DataModel.RYTschart(genData, RYTsdata);

            let scClass = {};

            //datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(scenarios, function (id, obj) {
                scClass[obj.ScenarioId] = 'SC_' + id;
                //datafieldsChart.push({ name: obj.ScenarioId, type: 'number' });
                //series.push({ dataField: obj.ScenarioId, displayText: obj.Scenario });
            });

            datafields.push({ name: 'ScId', type: 'string' });
            datafields.push({ name: 'Sc', type: 'string' });
            datafields.push({ name: 'TsId', type: 'string' });
            datafields.push({ name: 'Ts', type: 'string' });
            datafields.push({ name: 'ScDesc', type: 'string' });


            columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left', cellclassname: cellclass, enabletooltips: true });
            columns.push({ text: 'Timeslice', datafield: 'Ts', pinned: true, editable: false, align: 'center', cellclassname: cellclass, enabletooltips: true })

            let validation = function (cell, value) {
                if (value < 0) {
                    return { result: false, message: 'Value must be positive!' };
                } else {
                    return true;
                }
            }

            var cellclass = function (row, columnfield, value, data) {
                return scClass[data.ScId];
            }

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                // if(columnfield = '2020')
                // console.log('ROW, COLUMN, VALUE ', row, columnfield, value)
                if(row == 4 && columnfield == '2020')
                console.log('row renderer ', row,  'row renderer value ',  value)
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);

            let initeditor = function (row, cellvalue, editor, data) {
                // var scId = $('#osy-gridRYTs').jqxGrid('getcellvalue', row, 'ScId');
                // console.log(row, scId, cellvalue, editor.val())
                // if (scId !== 'SC_0') {
                    
                //     $('#' + editor[0].id + ' input').keydown(function (event) {
                //         if (event.keyCode === 46 || event.keyCode === 8) {
                //             console.log('46 ili 8')
                //             //$('#' + editor[0].id).val(null);
                //             editor.jqxNumberInput('val',null); 
                //         }
                //         else{
                //             editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: true, allowNull: true });
                //             editor.val(editor.val());
                //         }
                //     })
                // }else{
                //     editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: true, allowNull: false });
                //     editor.val(cellvalue);
                //     //editor.val(editor.val());
                // }
                //console.log('row editor ', row, ' editor value ', cellvalue)
                var scId = $('#osy-gridRYTs').jqxGrid('getcellvalue', row, 'ScId');
                if (scId !== 'SC_0') {
                    editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: false, allowNull: true }); 
                    $('#' + editor[0].id + ' input').keydown(function (event) {
                        if (event.keyCode === 46 || event.keyCode === 8) {
                            //$('#' + editor[0].id).val(null);
                            editor.jqxNumberInput('val',null); 
                        }
                    })
                }else{
                    editor.jqxNumberInput({ decimalDigits: this.d, spinButtons: false, allowNull: false }); 
                    editor.val(cellvalue);
                }
            }.bind(this);

            let geteditorvalue =  function (row, cellvalue, editor) {
                //console.log('row editor ', row, ' cell value ', cellvalue , ' editor value ', editor.val() )
                return editor.val() == null ? null : editor.val();
            }

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
                    geteditorvalue: geteditorvalue
                });
            }.bind(this));

            let PARAMNAMES = {};
            $.each(PARAMETERS[group], function (id, obj) {
                PARAMNAMES[obj.id] = obj.value;
            });

            let srcGrid = {
                datatype: "json",
                root: param,
                localdata: RYTsgrid,
                datafields: datafields,
            };

            // var srcChart = {
            //     datatype: "json",
            //     root: param + '>' + timeslices[0],
            //     localdata: RYTschart,
            //     datafields: datafieldsChart,
            // };

            this.casename = casename;
            this.years = years;
            //this.timeslices = timeslices;
            this.scenarios = scenarios;
            this.scenariosCount = scenarios.length;
            this.datafields = datafields;
            //this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            //this.series = series;
            this.gridData = RYTsgrid;
            //this.chartData = RYTschart;
            this.genData = genData;
            this.srcGrid = srcGrid;
           // this.srcChart = srcChart;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.PARAMETERS = PARAMETERS;
        } else {
            this.casename = null;
            this.years = null;
            this.datafields = null;
            //this.datafieldsChart = null;
            this.columns = null;
            this.gridData = null;
            //this.chartData = null;
            this.genData = null;
            this.srcGrid = null;
            //this.srcChart = null;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.PARAMETERS = PARAMETERS;
        }

    }
}