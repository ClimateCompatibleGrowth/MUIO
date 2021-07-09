import { GROUPNAMES, PARAMORDER, PARAMCOLORS } from "../../Classes/Const.Class.js";

export class Sidebar {
    static Load(PARAMETERS){

        $('#Navi > li').click(function(e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).addClass('active');
        });

        $.each(PARAMORDER, function (id, group) {   
            $.each(PARAMETERS[group], function (id, obj) {
                if (PARAMETERS[group] !== undefined || PARAMETERS[group].length != 0) {
                    if(obj.menu){
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
            });
        });

        
        // $.each(PARAMETERS, function (param, array) {   
        //     $.each(array, function (id, obj) {
        //         // console.log(param, obj.id, obj.value)
        //         if(obj.menu){
        //             let res = `
        //             <li  class="">
        //                 <a href="#/${param}/${obj.id}" title="${GROUPNAMES[param]}">${obj.value}</a>
        //             </li>`;
        //             $('#dynamicRoutes').append(res);
        //         }
        //     });
        // });
    }
}