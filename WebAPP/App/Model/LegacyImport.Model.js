export class Model {  
    constructor (cases) {
        if (cases){
            this.cases = cases; 
            this.pageID = 'Excel model import'
        }else{
            this.cases = null; 
            this.pageID = 'Excel model import'
        }
    }
}
