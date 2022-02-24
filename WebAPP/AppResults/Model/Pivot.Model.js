import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, PARAMETERS, DATA) {

        
        this.d = 2;
        this.decimal = 'd' + this.d;
        //console.log('PARAMETERS ', PARAMETERS)

        let VARGROUPS = DataModelResult.getVarById(PARAMETERS);

        

        let pivotData = DataModelResult.getPivot(DATA['ANC'], genData['osy-years']);
        let PARAMNAMES = DataModel.AllParamName(PARAMETERS);

        //console.log(PARAMETERS)
        //console.log(VARGROUPS)

        this.casename = casename;
        this.genData = genData;
        this.resData = resData;
        this.pivotData = pivotData;
        this.group = 'RYT';
        this.param = 'ANC';
        this.PARAMETERS = PARAMETERS;
        this.VARGROUPS = VARGROUPS;
        this.PARAMNAMES = PARAMNAMES;
    
    }
}