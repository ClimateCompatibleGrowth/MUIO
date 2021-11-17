import { DataModel } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYEdata, group, PARAMETERS, param) {
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
            let cs = cases[0].CaseId;


            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);
            let RYEgrid = DataModel.RYEgrid( RYEdata);
            let RYEchart = DataModel.RYEchart(genData, RYEdata);



            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(emis, function (id, obj) {
                datafieldsChart.push({ name: obj.Emis, type: 'number' });
                series.push({ dataField: obj.Emis, displayText: obj.Emis });
            }); 

            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'EmisId', type: 'string' });
            datafields.push({ name: 'Emi', type: 'string' });
            // datafields.push({ name: 'UnitId', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            // datafields.push({ name: 'EmiDesc', type: 'string' });

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);

            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left',}); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Emission', datafield: 'Emi', pinned: true, editable: false, align: 'left' });
            //columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            console.log('RYE ', DataModel.RYE(RYEdata))
            console.log('RYEgrid ', RYEgrid)
            console.log('RYEchart ', RYEchart)

            let srcGrid = {
                datatype: "json",
                localdata: RYEgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYEchart[param][cs],
                //root: param + '>' + emis[0]['EmisId'],
                datafields: datafieldsChart,
            };



            this.casename = casename;
            this.years = years;
            this.emis = emis;
            this.cases  = cases;
            this.case = cs;
            this.columns = columns;
            this.series = series;
            this.gridData = RYEgrid;
            this.chartData = RYEchart;
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
            this.columns = null;
            this.series = null;
            this.gridData = null;
            this.chartData = null;
            this.genData = null;
            this.PARAMNAMES = null;
            this.param = param;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS;
        }

    }
}