export class Model {  
    constructor (cases) {
        if (cases){
            this.cases = cases; 
            this.pageID = 'ExcelImport'
        }else{
            this.cases = null; 
            this.pageID = 'ExcelImport'
        }
    }
}
