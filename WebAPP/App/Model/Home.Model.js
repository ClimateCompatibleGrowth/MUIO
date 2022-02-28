export class Model {
    
    constructor (casename, cases, genData) {
       
        if (casename){
            this.casename = casename; 
            this.cases = cases;
            // this.genData = genData;
            // this.PARAMETERS = PARAMETERS;
            // this.RESULTPARAMETERS = RESULTPARAMETERS;
            this.pageID = 'Home'
        }else{
            this.casename = null; 
            this.cases = cases;
            // this.genData = null;
            // this.PARAMETERS = null;
            // this.RESULTPARAMETERS = null;
            this.pageID = 'Home'
        }

    }
}
