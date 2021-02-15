import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/Navbar.Model.js";

export class Navbar {
    static initPage(casename){
        Base.getCaseStudies()
        .then(cases => {
            let model = new Model(cases, casename);
            Html.renderCasePicker(model.cases, model.casename);
            Html.title(model.casename);
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