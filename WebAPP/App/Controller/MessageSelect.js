import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Model } from "../Model/MessageSelect.Model.js";

export class MessageSelect {
    static init(init_f){
        Base.getCaseStudies()
        .then(cases => {
            
            if (cases.length != 0) {
                console.log('cases ', cases)
                let model = new Model(cases);
                Message.SmartMessageBoxDDL(model.cases, init_f);
            }else{
                hasher.setHash('');
                hasher.setHash("AddCase");
            }

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