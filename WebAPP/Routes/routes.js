import { PARAMETERS } from "../../Classes/Const.Class.js";

// $("aside").load('App/View/Sidebar.html');
// import('../App/Controller/Sidebar.js')
// .then(Sidebar => {
//     Sidebar.default.onLoad();
// });

//$("aside").load('App/View/Sidebar.html');
//import('../App/Controller/Sidebar.js')



crossroads.addRoute('/', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/Home.js')
    .then(Home => {
        $(".osy-content").load('App/View/Home.html');
        Home.default.onLoad();
    });
});

crossroads.addRoute('/AddCase', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/AddCase.js')
    .then(AddCase => {
        $(".osy-content").load('App/View/AddCase.html');
        AddCase.default.onLoad();
    });
});


function addRoute(group, id){

    return crossroads.addRoute(`/${group}/${id}`, function() {
        $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
        //console.log(group, id);
        import(`../App/Controller/${group}.js`)
        .then(f => {
            $(".osy-content").load(`App/View/${group}.html`);
            f.default.onLoad(group, id);
        });
    });
}

$.each(PARAMETERS, function (param, array) {                    
    $.each(array, function (id, obj) {
        //console.log(param, obj.id)
        addRoute(param, obj.id)
    });
});





/*
crossroads.addRoute('/RYT', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYT.js')
    .then(RYT => {
        $(".osy-content").load('App/View/RYT.html');
        RYT.default.onLoad();
    });
});

crossroads.addRoute('/RYTs', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYTs.js')
    .then(RYTs => {
        $(".osy-content").load('App/View/RYTs.html');
        RYTs.default.onLoad();
    });
});

crossroads.addRoute('/RYTC', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYTC.js')
    .then(RYTC => {
        $(".osy-content").load('App/View/RYTC.html');
        RYTC.default.onLoad();
    });
});

crossroads.addRoute('/RYTE', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYTE.js')
    .then(RYTE => {
        $(".osy-content").load('App/View/RYTE.html');
        RYTE.default.onLoad();
    });
});

crossroads.addRoute('/RYC', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYC.js')
    .then(RYC => {
        $(".osy-content").load('App/View/RYC.html');
        RYC.default.onLoad();
    });
});

crossroads.addRoute('/RYE', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYE.js')
    .then(RYE => {
        $(".osy-content").load('App/View/RYE.html');
        RYE.default.onLoad();
    });
});

crossroads.addRoute('/RYTTs', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYTTs.js')
    .then(RYTTs => {
        $(".osy-content").load('App/View/RYTTs.html');
        RYTTs.default.onLoad();
    });
});

crossroads.addRoute('/RYCTs', function() {
    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
    import('../App/Controller/RYCTs.js')
    .then(RYCTs => {
        $(".osy-content").load('App/View/RYCTs.html');
        RYCTs.default.onLoad();
    });
});

*/

crossroads.bypassed.add(function(request) {
    console.error(request + ' seems to be a dead end...');
});

//setup hasher
hasher.init(); //start listening for history change

//Listen to hash changes
window.addEventListener("hashchange", function() {
    var route = '/';
    var hash = window.location.hash;
    if (hash.length > 0) {
        route = hash.split('#').pop();
    }
//console.log(hash);
//console.log(route);
    crossroads.parse(route);
});

// trigger hashchange on first page load
window.dispatchEvent(new CustomEvent("hashchange"));
