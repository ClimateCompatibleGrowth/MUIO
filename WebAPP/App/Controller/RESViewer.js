import { Message } from "../../Classes/Message.Class.js";
import { Base } from "../../Classes/Base.Class.js";
import { Html } from "../../Classes/Html.Class.js";
import { Model } from "../Model/RESViewer.Model.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { DEF } from "../../Classes/Definition.Class.js";
import { MessageSelect } from "./MessageSelect.js";
import { Chart } from "../../Classes/Chart.Class.js";

export default class RESViewer {
    static onLoad() {
        Base.getSession()
            .then(response => {
                let casename = response['session'];
                if (casename) {
                    const promise = [];
                    promise.push(casename);
                    const genData = Osemosys.getData(casename, 'genData.json');
                    promise.push(genData);
                    const RYTCMdata = Osemosys.getData(casename, "RYTCM.json");
                    promise.push(RYTCMdata);
                    return Promise.all(promise);
                } else {
                    MessageSelect.init(RESViewer.refreshPage.bind(RESViewer));
                }
            })
            .then(data => {
                let [casename, genData, RYTCMdata] = data;
                let model = new Model(casename, genData, RYTCMdata);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initPage(model) {
        Message.clearMessages();

        let $div = 'osy-RESViewer';

        Html.title(model.casename, 'RES Viewer', model.sc + ' - ' + model.year);
        Html.ddlScenariosId(model.scenarios, model.sc);
        Html.ddlYears(model.years, model.year)
        Chart.SankeyChart($div, model);
    }

    static refreshPage(casename) {
        Base.setSession(casename)
            .then(response => {
                const promise = [];
                promise.push(casename);
                const genData = Osemosys.getData(casename, 'genData.json');
                promise.push(genData);
                const RYTCMdata = Osemosys.getData(casename, "RYTCM.json");
                promise.push(RYTCMdata);
                return Promise.all(promise);
            })
            .then(data => {
                let [casename, genData, RYTCMdata] = data;
                let model = new Model(casename, genData, RYTCMdata);
                this.initPage(model);
                this.initEvents(model);
            })
            .catch(error => {
                Message.warning(error);
            });
    }

    static initEvents(model) {

        let $div = 'osy-RESViewer';

        $("#casePicker").off('click');
        $("#casePicker").on('click', '.selectCS', function (e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            var casename = $(this).attr('data-ps');
            Html.updateCasePicker(casename);
            RESViewer.refreshPage(casename);
            Message.smallBoxConfirmation("Confirmation!", "Model " + casename + " selected!", 3500);
        });

        $("#osy-years").off('change');
        $('#osy-years').on('change', function () {
            Html.title(model.casename, 'RES Viewer', 'Scenario <b>' +  model.sc + '</b> - year <b>' + this.value + '</b>');
            model.year = this.value;
            Chart.SankeyChart($div, model)
        });

        $("#osy-scenarios").off('change');
        $('#osy-scenarios').on('change', function () {
            Html.title(model.casename, 'RES Viewer', 'Scenario <b>' +  this.value + '</b> - year <b>' + model.year + '</b>');
            model.sc = this.value;
            Chart.SankeyChart($div, model)
        });

        $("#showLog").click(function (e) {
            e.preventDefault();
            $('#definition').html(`${DEF[model.group][model.param].definition}`);
            $('#definition').toggle('slow');
        });
    }
}