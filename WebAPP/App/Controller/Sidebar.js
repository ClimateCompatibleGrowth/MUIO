// import { Message } from "../../Classes/Message.Class.js";
import { GROUPNAMES } from "../../Classes/Const.Class.js";
// import { Base } from "../../Classes/Base.Class.js";


export class Sidebar {
    static Load(PARAMETERS){
        $('#Navi > li').click(function(e) {
            e.stopPropagation();
            $('li').removeClass('active');
            //$(selector).removeClass('open');
            $(this).addClass('active');
        });

        $.each(PARAMETERS, function (param, array) {
            
            $.each(array, function (id, obj) {
                // console.log(param, obj.id, obj.value)
                if(obj.menu){
                    let res = `
                    <li  class="">
                        <a href="#/${param}/${obj.id}" title="${GROUPNAMES[param]}">${obj.value}</a>
                    </li>`;
                    $('#dynamicRoutes').append(res);
                }
            });
        });
    }
}

// let res = `
// <nav>
//     <ul id="Navi">
//         <li class="active">
//             <a href="#/" title="Home page"><i class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent">Home1</span></a>
//         </li>
//         <li class="">
//             <a href="#/AddCase" title="Add case"><i class="fa fa-lg fa-fw fa-plus-circle"></i> <span class="menu-item-parent">Add case</span></a>
//         </li>

//         <li>
//             <a href="#" title="Data entry"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Data entry</span></a>
//             <ul>`

//             $.each(PARAMETERS, function (param, array) {                    
//                 $.each(array, function (id, obj) {
//                     res += `
//                         <li  class="">
//                             <a href="#/${param}/${obj.id}" title="Year and technology parameters"><span >${obj.value}</span></a>
//                         </li>`;
//                 });
//             });

//            res += `</ul>
//         </li>
//     </ul>
// </nav> 
// <span class="minifyme" data-action="minifyMenu"> <i class="fa fa-arrow-circle-left hit"></i> </span>`
// $("aside").html(res);
//console.log(res)

//sa parent PARAM
/*
let res = `
<nav>
    <ul id="Navi">
        <li class="active">
            <a href="#/" title="Home page"><i class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent">Home1</span></a>
        </li>
        <li class="">
            <a href="#/AddCase" title="Add case"><i class="fa fa-lg fa-fw fa-plus-circle"></i> <span class="menu-item-parent">Add case</span></a>
        </li>

        <li>
            <a href="#" title="Data entry"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Data entry</span></a>
            <ul>`

            $.each(PARAMETERS, function (param, array) {
                res += `
                    <li  class="">
                        <a href="#/${param}" title="Year and technology parameters"><span >${param}</span></a>
                        <ul id='${param}' style="display:none">`;
                    
                $.each(array, function (id, obj) {
                    //console.log(param, obj.id, obj.value)
                    res += `
                        <li  class="">
                            <a href="#/${param}/${obj.id}" title="Year and technology parameters"><span >${obj.value}</span></a>
                        </li>`;
                });
                res +=`</ul></li>`;
            });

           res += `</ul>
        </li>
    </ul>
</nav> 
<span class="minifyme" data-action="minifyMenu"> <i class="fa fa-arrow-circle-left hit"></i> </span>`
$("aside").html(res);
*/

// export default class Sidebar {
//     static onLoad(){
//         $('#Navi > li').click(function(e) {
//             e.stopPropagation();
//             $('li').removeClass('active');
//             //$(selector).removeClass('open');
//             $(this).addClass('active');
//         });

//         $.each(PARAMETERS, function (param, array) {
            
//             $.each(array, function (id, obj) {
//                 //console.log(param, obj.id, obj.value)
//                 let res = `
//                     <li  class="">
//                         <a href="#/${param}/${obj.id}" title="Year and technology parameters">${obj.value}</a>
//                     </li>`;
//                 $('#dynamicRoutes').append(res);
//             });
//         });
//     }
// }