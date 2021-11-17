import { DataModel } from "../../Classes/DataModelResult.Class.js";
import { Functions } from "../../Classes/Functions.Class.js";

export class Model {

    constructor(casename, genData, resData, RYTdata, group, PARAMETERS, param) {

        console.log(casename, genData, RYTdata, group, PARAMETERS, param);

        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];
            let years = genData['osy-years'];
            let techs = genData['osy-tech'];
            let cases = resData['osy-cases'];
            let cs = cases[0].CaseId;
        
            let RYTgrid = DataModel.RYTgrid(RYTdata);
            let RYTchart = DataModel.RYTchart(genData, RYTdata);
            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);

            console.log('RYT ', RYTgrid)
            console.log('RYTgrid ', RYTgrid)
            console.log('RYTchart ', RYTchart)
            console.log('PARAMNAMES ', PARAMNAMES)

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(techs, function (id, obj) {
                datafieldsChart.push({ name: obj.Tech, type: 'number' });
                series.push({ dataField: obj.Tech, displayText: obj.Tech });
            });

            datafields.push({ name: 'Cs', type: 'string' });
            datafields.push({ name: 'Tech', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            // datafields.push({ name: 'TechDesc', type: 'string' });
            // datafields.push({ name: 'UnitId', type: 'string' });

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }
            }.bind(this);


            //columns.push({ text: 'Case', datafield: 'Cs', pinned: true, editable: false, align: 'left', enabletooltips: true, }); // minWidth: 75, maxWidth: 150,
            columns.push({ text: 'Technology', datafield: 'Tech', pinned: true, editable: false, align: 'left', enabletooltips: true, });
            //columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });

            $.each(years, function (id, year) {
                datafields.push({ name: year, type: 'number' });
                columns.push({
                    text: year, datafield: year, cellsalign: 'right', align: 'center', columntype: 'numberinput', cellsformat: 'd2',
                    groupable: false,
                    sortable: false,
                    cellsrenderer: cellsrenderer
                });
            });

            let srcGrid = {
                datatype: "json",
                localdata: RYTgrid[param][cs],
                //root: param+'>'+cs,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYTchart[param][cs],
                //root: param+'>'+cs,
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.years = years;
            this.cases = cases;
            this.case = cs;
            //this.techs = techs;
            //this.techsCount = techs.length
            //this.scenarios = scenarios;
            //this.scenariosCount = scenarios.length;
            this.columns = columns;
            this.series = series;
            this.gridData = RYTgrid;
            this.chartData = RYTchart;
            this.genData = genData;
            this.param = param;
            //this.paramData = paramData;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid,
            this.srcChart = srcChart,
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
            this.srcChart = srcChartm
            this.PARAMETERS = PARAMETERS
        }

    }
}