import { DataModel } from "../../Classes/DataModel.Class.js";
import { DataModelResult } from "../../Classes/DataModelResult.Class.js";

export class Model {

    constructor(casename, genData, resData, RYCTsdata, group, PARAMETERS, param) {
        this.d = 2;
        this.decimal = 'd' + this.d;

        if (casename) {

            let datafields = [];
            let datafieldsChart = [];
            let columns = [];
            let series = [];

            let PARAMNAMES = DataModel.ParamName(PARAMETERS[group]);
            let RYCTsgrid = DataModelResult.RYCTsgrid(RYCTsdata, genData, PARAMETERS);
            let RYCTschart = DataModelResult.RYCTschart(genData, RYCTsdata);
            let timeslices = DataModel.Timeslices(genData);
            let commName = DataModel.CommName(genData);

            let years = genData['osy-years'];
            let comms = genData['osy-comm'];
            let comm = comms[0]['Comm'];
            let cases = resData['osy-cases'];
            let cs = cases[0].Case;

            datafieldsChart.push({ name: 'Year', type: 'string' });
            $.each(timeslices, function (id, ts) {
                datafieldsChart.push({ name: ts, type: 'number' });
                series.push({ dataField: ts, displayText: ts });
            });


            // datafields.push({ name: 'ScId', type: 'string' });
            // datafields.push({ name: 'Sc', type: 'string' });
            // datafields.push({ name: 'CommId', type: 'string' });
            datafields.push({ name: 'Comm', type: 'string' });
            datafields.push({ name: 'Ts', type: 'string' });
            datafields.push({ name: 'UnitId', type: 'string' });
            // datafields.push({ name: 'ScDesc', type: 'string' });
            datafields.push({ name: 'CommDesc', type: 'string' });

            let cellsrenderer = function (row, columnfield, value, defaulthtml, columnproperties) {
                if (value === null || value === '') {
                    return '<span style="margin: 4px; float:right; ">n/a</span>';
                } else {
                    var formattedValue = $.jqx.dataFormat.formatnumber(value, this.decimal);
                    return '<span style="margin: 4px; float:right; ">' + formattedValue + '</span>';
                }

            }.bind(this);


            //columns.push({ text: 'Scenario', datafield: 'Sc', pinned: true, editable: false, align: 'left' });
            columns.push({ text: 'Commodity', datafield: 'Comm', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'Timeslice', datafield: 'Ts', pinned: true, editable: false, align: 'center' });
            columns.push({ text: 'Unit', datafield: 'UnitId', pinned: true, editable: false, align: 'center', cellsalign: 'center' });
            
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
                localdata: RYCTsgrid[param][cs],
                //root: param,
                datafields: datafields,
            };

            var srcChart = {
                datatype: "json",
                localdata: RYCTschart[param][cs][comm],
                //root: param + '>' + comms[0]['CommId'] + '>' + timeslices[0],
                datafields: datafieldsChart,
            };

            this.casename = casename;
            this.years = years;
            this.cases = cases;
            this.case = cs;
            this.comms = comms;
            this.comm = comm;
            this.commName = commName;
            this.timeslices = timeslices;
            this.datafields = datafields;
            this.datafieldsChart = datafieldsChart;
            this.columns = columns;
            this.series = series;
            this.gridData = RYCTsgrid;
            this.chartData = RYCTschart;
            this.genData = genData;
            this.param = param;
            this.PARAMNAMES = PARAMNAMES;
            this.group = group;
            this.srcGrid = srcGrid;
            this.srcChart = srcChart;
            this.PARAMETERS = PARAMETERS
        } else {
            this.casename = null;
            this.years = null;
            this.comms = null;
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
            this.PARAMETERS = PARAMETERS
        }

    }
}