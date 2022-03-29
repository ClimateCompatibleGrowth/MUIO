import { DataModel } from "../../Classes/DataModel.Class.js";
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTEdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;
        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let years = genData['osy-years'];
            let emis = genData['osy-emis'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;
            
            let RYTEgrid = DataModelResult.RYTEgrid(RYTEdata, genData, PARAMETERS);
            let RYTEchart = DataModelResult.RYTEchart(genData, RYTEdata);

            let ActivityTechs = DataModelResult.RYTETechs(RYTEdata);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(emis, function (id, obj) {
                datafieldsChart.push({ name: obj.Emis, type: 'number' });
                series.push({ dataField: obj.Emis, displayText: obj.Emis });
            });

            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'TechId', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            // datafields.push({ name: 'EmisId', type: 'string' });
            datafields.push({ name: 'Emis', type: 'string' });
            datafields.push({ name: 'TechDesc', type: 'string' });
            datafields.push({ name: 'EmiDesc', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });

            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'center' })
            columns.push({ text: 'Emission', datafield: 'Emis', pinned: true, editable: false, align: 'center' })
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);


            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            var srcGrid = {
                datatype: "json",
                localdata: RYTEgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTEchart[param][cs][ActivityTechs[param][cs][0]],
                //root: param + '>' + ActivityTechs[0]['TechId'] + '>' + ActivityEmis[ActivityTechs[0]['TechId']][0]['EmisId'],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.years = years;
            this.cases = cases;
            this.case = cs;
            this.techs = ActivityTechs;
            this.tech = ActivityTechs[param][cs][0];
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.gridData = RYTEgrid;
            this.chartData = RYTEchart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS;
        } else {
            this.casename = null;
            this.years = null;
            this.techs = null;
            this.datafields = null;
            this.datafieldsChart = null;
            this.columns = null;
            this.columns = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = null;
            this.srcChart = null;
            this.PARAMETERS = PARAMETERS;
        }
    }
}