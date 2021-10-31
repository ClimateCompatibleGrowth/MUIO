import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Message } from "../../Classes/Message.Class.js";

export class Routes {

    static getInitRoutes(){

        crossroads.addRoute('/', function() {
            $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            import('../App/Controller/Home.js')
            .then(Home => {
                $(".osy-content").load('App/View/Home.html');
                Home.default.onLoad();
            });
        });
        
        crossroads.addRoute('/Config', function() {
            $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            import('../App/Controller/Config.js')
            .then(Config => {
                $(".osy-content").load('App/View/Config.html');
                Config.default.onLoad();
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
        
        crossroads.bypassed.add(function(request) {
            console.error(request + ' seems to be a dead end...');
            hasher.setHash("#");
            hasher.setHash("#");
            //crossroads.parse('/');

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
        // console.log(hash);
        // console.log(route);
            crossroads.parse(route);
        });
        
        // trigger hashchange on first page load
        window.dispatchEvent(new CustomEvent("hashchange"));
    }

    static getRoutes(){
        Osemosys.getParamFile()
        .then(PARAMETERS =>{
            //Sidebar.Load(PARAMETERS);
            crossroads.addRoute('/', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Home.js')
                .then(Home => {
                    // $(".osy-content").load('App/View/Home.html');
                    // Home.default.onLoad();
                    $( ".osy-content" ).load( 'App/View/Home.html', function() {
                        Home.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/Config', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Config.js')
                .then(Config => {
                    // $(".osy-content").load('App/View/Config.html');
                    // Config.default.onLoad();
                    $( ".osy-content" ).load( 'App/View/Config.html', function() {
                        Config.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/AddCase', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/AddCase.js')
                .then(AddCase => {
                    // $(".osy-content").load('App/View/AddCase.html');
                    // AddCase.default.onLoad();
                    $( ".osy-content" ).load( 'App/View/AddCase.html', function() {
                        AddCase.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/ViewData', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/ViewData.js')
                .then(ViewData => {
                    // $(".osy-content").load('App/View/ViewData.html');
                    // ViewData.default.onLoad();
                    $( ".osy-content" ).load( 'App/View/ViewData.html', function() {
                        ViewData.default.onLoad();
                    });
                });
            });
            
            function addRoute(group, id){
                return crossroads.addRoute(`/${group}/${id}`, function() {
                    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                    //console.log(group, id);
                    import(`../App/Controller/${group}.js`)
                    .then(f => {
                        // $(".osy-content").load(`App/View/${group}.html`);
                        // f.default.onLoad(group, id);
                        $( ".osy-content" ).load( `App/View/${group}.html`, function() {
                            f.default.onLoad(group, id);
                        });
                    });
                });
            }
            
            $.each(PARAMETERS, function (param, array) {                    
                $.each(array, function (id, obj) {
                    //console.log(param, obj.id)
                    addRoute(param, obj.id)
                });
            });
            
            crossroads.addRoute('/DataFile', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/DataFile.js')
                .then(DataFile => {
                    // $(".osy-content").load('App/View/DataFile.html');
                    // DataFile.default.onLoad();
                    $( ".osy-content" ).load( 'App/View/DataFile.html', function() {
                        DataFile.default.onLoad();
                    });
                });
            });
            
            
            
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
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static addRoutes(PARAMETERS){

        function addRoute(group, id){
            return crossroads.addRoute(`/${group}/${id}`, function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import(`../App/Controller/${group}.js`)
                .then(f => {
                    // $(".osy-content").load(`App/View/${group}.html`);
                    // f.default.onLoad(group, id);
                    $( ".osy-content" ).load( `App/View/${group}.html`, function() {
                        f.default.onLoad(group, id);
                    });
                });
            });
        }
        
        $.each(PARAMETERS, function (param, array) {                    
            $.each(array, function (id, obj) {
                addRoute(param, obj.id)
            });
        });

                    
        crossroads.addRoute('/ViewData', function() {
            $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            import('../App/Controller/ViewData.js')
            .then(ViewData => {
                $(".osy-content").load('App/View/ViewData.html');
                ViewData.default.onLoad();
            });
        });

        crossroads.addRoute('/DataFile', function() {
            $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            import('../App/Controller/DataFile.js')
            .then(DataFile => {
                $(".osy-content").load('App/View/DataFile.html');
                DataFile.default.onLoad();
            });
        });

        crossroads.bypassed.add(function(request) {
            console.error(request + ' add route seems to be a dead end...');
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
    }

    static removeRoutes(PARAMETERS){
        
        function removeRoute(group, id){
            crossroads.removeRoute(`/${group}/${id}`);
        }
        
        $.each(PARAMETERS, function (param, array) {                    
            $.each(array, function (id, obj) {
                removeRoute(param, obj.id)
            });
        });
    }
}

Routes.getRoutes();



