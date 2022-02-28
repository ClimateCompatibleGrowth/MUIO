import { DataModelResult } from "../../Classes/DataModelResult.Class.js";
import { DataModel } from "../../Classes/DataModel.Class.js";

export class Model {

    constructor(casename, genData, resData, PARAMETERS, DATA, VIEW) {

        
        this.d = 2;
        this.decimal = 'd' + this.d;
        //console.log('PARAMETERS ', PARAMETERS)

        let VARGROUPS = DataModelResult.getVarById(PARAMETERS);
        let pivotData = DataModelResult.getPivot(DATA['ANC'], genData['osy-years']);
        let PARAMNAMES = DataModel.AllParamName(PARAMETERS);
        let VIEWS = VIEW['osy-views'];

        //console.log('PARAMETERS ', PARAMETERS)
        //console.log('VARGROUPS ', VARGROUPS)
        //console.log('VIEWS', VIEWS)

        this.casename = casename;
        this.genData = genData;
        this.resData = resData;
        this.pivotData = pivotData;
        this.group = 'RYT';
        this.param = 'ANC';
        this.PARAMETERS = PARAMETERS;
        this.VARGROUPS = VARGROUPS;
        this.PARAMNAMES = PARAMNAMES;
        this.VIEWS = VIEWS
        // this.VIEW = VIEWS['ANC'][0]['osy-viewId'];
        this.VIEW = null;
        this.DEFAULTVIEW = null;
    
    }
}