export class Model {  
    constructor (cases) {
        if (cases){
            this.cases = cases; 
            this.pageID = 'Legacy model import'
        }else{
            this.cases = null; 
            this.pageID = 'Legacy model import'
        }
    }
}
