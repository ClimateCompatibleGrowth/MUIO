import { Osemosys } from "../../Classes/Osemosys.Class.js";
import { Message } from "../../Classes/Message.Class.js";
import { Model } from "./Routes.Model.js";

export class Routes {

    static Load(casename) {
        Osemosys.getParamFile()
        .then(PARAMETERS => {
            const promise = [];
            promise.push(PARAMETERS);
            const RESULTPARAMETERS = Osemosys.getParamFile('ResultParameters.json');
            promise.push(RESULTPARAMETERS);
            // const RESULTEXISTS = Osemosys.resultsExists(casename);
            // promise.push(RESULTEXISTS);
            return Promise.all(promise);
        })
        .then(data => {
            
            let [PARAMETERS, RESULTPARAMETERS] = data;
            let model = new Model(PARAMETERS,RESULTPARAMETERS);
            this.getRoutes(model);
        })
        .catch(error => {
            Message.danger(error);
        });
    }

    
    static getRoutes(model){
 
            //Sidebar.Load(PARAMETERS);
            crossroads.addRoute('/', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Home.js')
                .then(Home => {
                    $( ".osy-content" ).load( 'App/View/Home.html', function() {
                        Home.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/Config', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Config.js')
                .then(Config => {
                    $( ".osy-content" ).load( 'App/View/Config.html', function() {
                        Config.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/AddCase', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/AddCase.js')
                .then(AddCase => {
                    $( ".osy-content" ).load( 'App/View/AddCase.html', function() {
                        AddCase.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/ViewData', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/ViewData.js')
                .then(ViewData => {
                    $( ".osy-content" ).load( 'App/View/ViewData.html', function() {
                        ViewData.default.onLoad();
                    });
                });
            });
            
            function addAppRoute(group, id){
                return crossroads.addRoute(`/${group}/${id}`, function() {
                    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                    import(`../App/Controller/${group}.js`)
                    .then(f => {
                        $( ".osy-content" ).load( `App/View/${group}.html`, function() {
                            f.default.onLoad(group, id);
                        });
                    });
                });
            }
            
            $.each(model.PARAMETERS, function (param, array) {                    
                $.each(array, function (id, obj) {
                    addAppRoute(param, obj.id)
                });
            });
            
            crossroads.addRoute('/DataFile', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/DataFile.js')
                .then(DataFile => {
                    $( ".osy-content" ).load( 'App/View/DataFile.html', function() {
                        DataFile.default.onLoad();
                    });
                });
            });

            crossroads.addRoute('/Versions', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                $( ".osy-content" ).load( 'App/View/Versions.html');
            });

            crossroads.addRoute('/PivotWijmo', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                //import ('../../References/wijmo/styles/wijmo.min.css');
                import('../AppResults/Controller/PivotWijmo.js')
                .then(PivotWijmo => {
                    $( ".osy-content" ).load( 'AppResults/View/PivotWijmo.html', function() {
                        PivotWijmo.default.onLoad();
                    });
                });
            });

            crossroads.addRoute('/RESViewer', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/RESViewer.js')
                .then(RESViewer => {
                    $( ".osy-content" ).load( 'App/View/RESViewer.html', function() {
                        RESViewer.default.onLoad();
                    });
                });
            });

            // crossroads.addRoute('/Pivot', function() {
            //     $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            //     import('../AppResults/Controller/Pivot.js')
            //     .then(Pivot => {
            //         $( ".osy-content" ).load( 'AppResults/View/Pivot.html', function() {
            //             Pivot.default.onLoad();
            //         });
            //     });
            // });

            // crossroads.addRoute('/PivotCharts', function() {
            //     $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
            //     import('../AppResults/Controller/PivotCharts.js')
            //     .then(PivotCharts => {
            //         $( ".osy-content" ).load( 'AppResults/View/PivotCharts.html', function() {
            //             PivotCharts.default.onLoad();
            //         });
            //     });
            // });

            function addResRoute(group, id){
                return crossroads.addRoute(`/${group}/${id}`, function() {
                    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                    import(`../AppResults/Controller/${group}.js`)
                    .then(f => {
                        $( ".osy-content" ).load( `AppResults/View/${group}.html`, function() {
                            f.default.onLoad(group, id);
                        });
                    });
                });
            }
            
            $.each(model.RESULTPARAMETERS, function (param, array) {                    
                $.each(array, function (id, obj) {
                    addResRoute(param, obj.id)
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
                crossroads.parse(route);
            });
            
            // trigger hashchange on first page load
            window.dispatchEvent(new CustomEvent("hashchange"));
    }

    static getRoutesOLD(){
        Osemosys.getParamFile()
        .then(PARAMETERS =>{
            //Sidebar.Load(PARAMETERS);
            crossroads.addRoute('/', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Home.js')
                .then(Home => {
                    $( ".osy-content" ).load( 'App/View/Home.html', function() {
                        Home.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/Config', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/Config.js')
                .then(Config => {
                    $( ".osy-content" ).load( 'App/View/Config.html', function() {
                        Config.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/AddCase', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/AddCase.js')
                .then(AddCase => {
                    $( ".osy-content" ).load( 'App/View/AddCase.html', function() {
                        AddCase.default.onLoad();
                    });
                });
            });
            
            crossroads.addRoute('/ViewData', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/ViewData.js')
                .then(ViewData => {
                    $( ".osy-content" ).load( 'App/View/ViewData.html', function() {
                        ViewData.default.onLoad();
                    });
                });
            });
            
            function addRoute(group, id){
                return crossroads.addRoute(`/${group}/${id}`, function() {
                    $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                    import(`../App/Controller/${group}.js`)
                    .then(f => {
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
            
            crossroads.addRoute('/DataFile', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/DataFile.js')
                .then(DataFile => {
                    $( ".osy-content" ).load( 'App/View/DataFile.html', function() {
                        DataFile.default.onLoad();
                    });
                });
            });

            crossroads.addRoute('/ViewResults', function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import('../App/Controller/ViewResults.js')
                .then(ViewResults => {
                    $( ".osy-content" ).load( 'App/View/ViewResults.html', function() {
                        ViewResults.default.onLoad('RYE', 'AE');
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
                crossroads.parse(route);
            });
            
            // trigger hashchange on first page load
            window.dispatchEvent(new CustomEvent("hashchange"));
        })
        .catch(error =>{ 
            Message.warning(error);
        });
    }

    static addResultsRoutes(PARAMETERS){
        function addRoute(group, id){
            return crossroads.addRoute(`/r${group}/${id}`, function() {
                $('#content').html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
                import(`../AppResults/Controller/${group}.js`)
                .then(f => {
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
            crossroads.parse(route);
        });
        
        // trigger hashchange on first page load
        window.dispatchEvent(new CustomEvent("hashchange"));
    }
}

Routes.Load();



