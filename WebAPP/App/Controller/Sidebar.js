import { GROUPNAMES, PARAMORDER, PARAMCOLORS, RESULTPARAMORDER, RESULTPARAMCOLORS, RESULTGROUPNAMES } from "../../Classes/Const.Class.js";
import { Model } from "../Model/Sidebar.Model.js";
import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Message } from "../../Classes/Message.Class.js";
import { Routes } from "../../Routes/Routes.Class.js";

export class Sidebar {

    //ne koristi se
    // static Load(genData, PARAMETERS, VARIABLES, RESULTEXISTS) {
    //     let model = new Model(PARAMETERS,VARIABLES, genData, RESULTEXISTS);
    //     this.initAppRoutes(model);
    //     this.initResultsRoutes(model);
    //     this.initEvents();
    // }

    static Reload(casename) {
        Osemosys.getData(casename, 'genData.json')
        .then(genData => {
            const promise = [];
            promise.push(genData);
            const PARAMETERS = Osemosys.getParamFile();
            promise.push(PARAMETERS);
            const VARIABLES = Osemosys.getParamFile('ResultParameters.json');
            promise.push(VARIABLES);
            const RESULTEXISTS = Osemosys.resultsExists(casename);
            promise.push(RESULTEXISTS);
            return Promise.all(promise);
        })
        .then(data => {
            let [genData, PARAMETERS, VARIABLES, RESULTEXISTS] = data;
            let model = new Model(PARAMETERS,VARIABLES, genData, RESULTEXISTS);
            this.initAppRoutes(model);
            this.initResultsRoutes(model);
            this.initEvents();
        })
        .catch(error => {
            Message.danger(error);
        });
    }

    static initAppRoutes(model) {
        $('#dynamicRoutes').empty();
        if (model.menu) {
            //Routes.addRoutes(model.PARAMETERS);
            $('.dynamicRoutesLink').show();
            //RES prikazi samo ako ima IAR ili OAR
            if ( model.menuCondition.IAR || model.menuCondition.OAR) {
                $('.dynamicRoutesRES').show();
            }else{
                $('.dynamicRoutesRES').hide();
            }
            let res = `
            <label class="input" style="display:block; margin-left:11px">
                <i class="ace-icon white fa fa-search nav-search-icon"></i>
                <input type="text" placeholder="Search ..." class="nav-search-input" id="MenuSearch" />
                
            </label>`;
            $('#dynamicRoutes').append(res);
            $.each(PARAMORDER, function (id, group) {
                $.each(model.PARAMETERS[group], function (id, obj) {
                    //da li ima parametara definisanih za grupu

                    if (model.PARAMETERS[group] !== undefined || model.PARAMETERS[group].length != 0) {
                        if (obj.menu) {
                            if (obj.id == 'IAR' && model.menuCondition.IAR) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if (obj.id == 'OAR' && model.menuCondition.OAR) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if (obj.id == 'INCR' && model.menuCondition.INCR) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if (obj.id == 'ITCR' && model.menuCondition.ITCR) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if (obj.id == 'EAR' && model.menuCondition.EAR) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            if (obj.id == 'CM' && model.menuCondition.CM) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
                                    ${obj.value}
                                    <span class="badge badge-sm inbox-badge bg-color-${PARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                                    </a>
                                </li>`;
                                $('#dynamicRoutes').append(res);
                            }
                            else if (!model.menuGroup.includes(obj.id)) {
                                let res = `
                                <li  class="">
                                    <a href="#/${group}/${obj.id}" class="menu-items" title="${GROUPNAMES[group]}">
                
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
        } else {
            $('.dynamicRoutesLink').hide();
            $('.dynamicRoutesRES').hide();

        }
    }

    static initResultsRoutes(model) {
        Routes.addResultsRoutes(model.VARIABLES);
        $('#dynamicResultsRoutes').empty();
        if (model.ResultsMenu) {
            //Routes.addRoutes(model.PARAMETERS);
            $('.dynamicResults').show();
            let res = `
            <label class="input" style="display:block; margin-left:11px">
                <i class="ace-icon white fa fa-search nav-search-icon"></i>
                <input type="text" placeholder="Search ..." class="nav-search-input" id="ResultSearch" />
                
            </label>`;
            $('#dynamicResultsRoutes').append(res);
            $.each(RESULTPARAMORDER, function (id, group) {
                $.each(model.VARIABLES[group], function (id, obj) {
                    //da li ima parametara definisanih za grupu
                    if (model.VARIABLES[group] !== undefined || model.VARIABLES[group].length != 0) {
                        let res = `
                        <li  class="">
                            <a href="#/${group}/${obj.id}" class="res-items" title="${RESULTGROUPNAMES[group]}">
        
                            ${obj.value}
                            <span class="badge badge-sm inbox-badge bg-color-${RESULTPARAMCOLORS[group]} align-top hidden-mobile pull-right"><small>${group}</small></span>
                            </a>
                        </li>`;
                        $('#dynamicResultsRoutes').append(res);
                    }
                });
            });
        } else {
            $('.dynamicResults').hide();

        }
    }

    static initEvents() {
        $('#Navi > li').click(function (e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).addClass('active');
        });

        $('#Navi > li >ul>li').click(function (e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).parent().closest("li").addClass('active');
            $(this).addClass('active');
        });

        //Search menu
        $('#MenuSearch').keyup(function () {
            var query = $.trim($('#MenuSearch').val()).toLowerCase();
            $('.menu-items').each(function () {

                var $this = $(this);
                if ($this.text().toLowerCase().indexOf(query) === -1)
                    $this.closest('li').fadeOut();
                else $this.closest('li').fadeIn();
            });
        });
        $('#ResultSearch').keyup(function () {
            var query = $.trim($('#ResultSearch').val()).toLowerCase();
            $('.res-items').each(function () {

                var $this = $(this);
                if ($this.text().toLowerCase().indexOf(query) === -1)
                    $this.closest('li').fadeOut();
                else $this.closest('li').fadeIn();
            });
        })
    }
}