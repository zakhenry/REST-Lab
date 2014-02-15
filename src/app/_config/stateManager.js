angular.module('stateManager', ['siteModules', 'stateHelper'])
    .config(function(
        $stateProvider,
        stateHelperProvider,
        $locationProvider,
        $urlRouterProvider
    ) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise('/');
        // Create state for Default Layout
        $stateProvider
            .state('defaultLayout', {
                abstract: true,
                views: {
                    'app@': { // Points to the ui-view in the index.html
                        templateUrl: '_layouts/default.tpl.html'
                    },
                    'navigation@defaultLayout': { // Points to the ui-view="navigation" in default.tpl.html
                        templateUrl: '_partials/navigation.tpl.html',
                        controller: [
                            '$rootScope',
                            function ($rootScope) {

                            }
                        ]
                    }
                }
            })
        ;

        // Loop through each sub-module state and register them
        angular.forEach(stateHelperProvider.getStates(), function(state) {
            $stateProvider.state(state.name, state.options);
        });
    })
;