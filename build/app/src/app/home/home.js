

angular.module('app.home', [])

    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('defaultLayout.home', {
            url: '/home',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'HomeCtrl as HomeCtrl',
                    templateUrl: 'home/home.tpl.html'
                }
            }

        });
    })

    .controller('HomeCtrl', function($rootScope, $scope, $location) {

    })

;
