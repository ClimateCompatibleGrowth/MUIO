import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, PARAMETERS, DATA) {

        
        this.d = 2;
        this.decimal = 'd' + this.d;

        let techs = genData['osy-tech'];

        let datafieldsChart = [];
        let series = [];

        let VARGROUPS = DataModelResult.getVarById(PARAMETERS);
        let PARAMNAMES = DataModel.AllParamName(PARAMETERS);

        let srcChart1 = DataModelResult.getPivotChart(DATA['ANC'], genData);

        
        datafieldsChart.push({ name: 'Year', type: 'string' });
        $.each(techs, function (id, obj) {
            datafieldsChart.push({ name: obj.Tech, type: 'number' });
            series.push({ dataField: obj.Tech, displayText: obj.Tech });
        });

        console.log(PARAMETERS)
        console.log(VARGROUPS)
        console.log('srcChart1 ', srcChart1)

        this.casename = casename;
        this.genData = genData;
        this.resData = resData;
        this.srcChart1 = srcChart1['t1'];
        this.series = series;
        //this.pivotData = pivotData;
        this.group = 'RYT';
        this.param = 'ANC';
        this.PARAMETERS = PARAMETERS;
        this.VARGROUPS = VARGROUPS;
        this.PARAMNAMES = PARAMNAMES;
    
    }
}