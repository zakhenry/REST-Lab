

angular.module('app.projects.endpoints.tests', [])

    .config(function(stateHelperProvider) {


        stateHelperProvider.addState('defaultLayout.projects.project.endpoints.endpoint.tests', {
            url: '/tests',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'TestMethodsCtrl as TestMethodsCtrl',
                    templateUrl: 'projects/endpoints/tests/tests.tpl.html'
                },
                "testView@defaultLayout.projects.project.endpoints.endpoint.tests": {
                    controller: 'TestCtrl as TestCtrl',
                    templateUrl: 'projects/endpoints/tests/test-view.tpl.html'
                }
            }

        });
    })

    .controller('TestMethodsCtrl', function($rootScope, $scope, $stateParams) {
        var project = _.find($scope.$storage.restLab.projects, {key:$stateParams.projectKey});
        var endpoint = _.find(project.endpoints, {slug:$stateParams.endpointKey});
        $scope.project = project;
        $scope.endpoint = endpoint;

    })

    .controller('TestCtrl', function($scope) {
        console.log('test ctrl called');
        var test = $scope.methodTest;

        $scope.test = test;

    })

;
