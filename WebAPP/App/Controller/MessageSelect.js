import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Model } from "../Model/MessageSelect.Model.js";

export class MessageSelect {
    static init(init_f){
        Base.getCaseStudies()
        .then(cases => {
            let model = new Model(cases);
            Message.SmartMessageBoxDDL(model.cases, init_f);
        })
        .catch(error =>{ 
            Message.danger(error);
        });
    }

    static refreshPage(casename){
    }

    static initEvents(){
    }
}