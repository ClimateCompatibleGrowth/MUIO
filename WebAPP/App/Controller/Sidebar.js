import { GROUPNAMES, PARAMORDER, PARAMCOLORS } from "../../Classes/Const.Class.js";
import { Model } from "../Model/Sidebar.Model.js";
import { Routes } from "../../Routes/Routes.Class.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";

export class Sidebar {
    static Load( genData, PARAMETERS){
        let model = new Model(PARAMETERS, genData);
        this.initPage(model);
        this.initEvents();
    }

    static Reload(casename){
        Osemosys.getData(casename, 'genData.json')
        .then(genData => {
            const promise = [];
            promise.push(genData);
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS); 
            return Promise.all(promise);
        })
        .then(data => {
            let [ genData, PARAMETERS] = data;
            let model = new Model(PARAMETERS, genData);
            this.initPage(model);
            this.initEvents();
        })
        .catch(error =>{
            Message.danger(error);
        });



    }


    static initPage(model){

        
        $('#dynamicRoutes').empty();
        if (model.menu){

            console.log('adding routes')
            //Routes.addRoutes(model.PARAMETERS);
            $('.dynamicRoutesLink').show();

            $.each(PARAMORDER, function (id, group) {   
                $.each(model.PARAMETERS[group], function (id, obj) {
                    //da li ima parametara definisanih za grupu
                    if (model.PARAMETERS[group] !== undefined || model.PARAMETERS[group].length != 0) {
                        if(obj.menu){
                            if ( obj.id == 'IAR' && model.menuCondition.IAR ) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if ( obj.id == 'OAR' && model.menuCondition.OAR ) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if ( obj.id == 'EAR' && model.menuCondition.EAR ) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if ( obj.id == 'CM' && model.menuCondition.CM ) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            else if (!model.menuGroup.includes(obj.id)){
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res); 
                            }

                        }
                    }
                });
            });
        }else{
            $('.dynamicRoutesLink').hide();
           
        }
    }

    static initEvents(){
        $('#Navi > li').click(function(e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).addClass('active');
        });

        $('#Navi > li >ul>li').click(function(e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).addClass('active');
        });
    }
}