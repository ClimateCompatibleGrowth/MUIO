
export class Model {
    constructor (casename, pageId) {
      if(casename){
        this.casename = casename;
        this.title = "Geneate data file";
        this.pageId = pageId;
      }else{
        this.casename = null;
        this.title = "Generate data file";
        this.pageId = pageId;
      }
    }
}
