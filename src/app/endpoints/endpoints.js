

angular.module('app.endpoints', [])

    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('defaultLayout.endpoints', {
            url: '/endpoints',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'EndpointsCtrl as EndpointsCtrl',
                    templateUrl: 'endpoints/endpoints.tpl.html'
                }
            }

        });
    })

    .controller('EndpointsCtrl', function($rootScope, $scope, $location) {

        $scope.showAddForm = $scope.$storage.endpoints.length === 0; //default to show when there are no endpoints

    })

;
