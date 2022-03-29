import { DataModel } from "../../Classes/DataModel.Class.js";
import { Functions } from "../../Classes/Functions.Class.js";

export class Model {

    constructor(casename, genData, data, group, PARAMETERS, param) {

        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let columns = [];
            let years = genData['osy-years'];
            let techs = genData['osy-tech'];
            let scenarios = genData['osy-scenarios'];

            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);


            datafields.push({ name: 'ScId', type: 'string' });
            datafields.push({ name: 'Sc', type: 'string' });
            datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            datafields.push({ name: 'ScDesc', type: 'string' });
            datafields.push({ name: 'TechDesc', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });


            let scClass = {};
            var cellclass = function (row, columnfield, value, data) {
                return scClass[data.ScId];
            }

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }
            }.bind(this);

            columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left', cellclassname: cellclass, enabletooltips: true, }); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'left', cellclassname: cellclass, enabletooltips: true, });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center', cellclassname: cellclass });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    sortable: false,
                    cellsrenderer: cellsrenderer,
                    cellclassname: cellclass
                });
            });

            let srcGrid = {
                datatype: "json",
                localdata: data,
                root: group + '>'+param,
                datafields: datafields,
            };


            this.casename = casename;
            this.years = years;
            this.techs = techs;
            this.techsCount = techs.length
            this.columns = columns;
            this.gridData = data;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid,
            this.PARAMETERS = PARAMETERS
        } else {
            this.casename = null;
            this.years = null;
            this.techs = null;
            this.columns = null;
            this.series = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null;
            this.PARAMNAMES = null;
            this.param = param;
            this.group = group;
            this.srcGrid = srcGrid

            this.PARAMETERS = PARAMETERS
        }

    }
}