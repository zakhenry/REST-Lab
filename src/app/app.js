angular.module('app', [
        // Templates
        'templates-app',
        'templates-common',
        // Vendor Modules - Live under /vendor
        'vendorModules',
        // Common Modules - Live under /src/common
        'commonModules',
        // State Manager
        'stateManager'
    ])
    .run(function run(titleService) {
        titleService.setSuffix(' » REST Lab');
        moment.lang('en-gb');
    })

    .controller('AppCtrl', function($scope, $rootScope, $localStorage, $http) {


        $rootScope.$storage = $localStorage;

        if (_.isUndefined($rootScope.$storage.restLab)){ //storage is empty (never been created)

            $rootScope.$storage.restLab = {
                projects : []
            };

        }

        console.log('localstorage bound');


    })
;