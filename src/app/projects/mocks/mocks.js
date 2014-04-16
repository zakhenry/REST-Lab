

angular.module('app.projects.mocks', [])

    .config(function(stateHelperProvider) {

        stateHelperProvider.addState('defaultLayout.projects.project.mocks', {
            url: '/mocks',
            abstract: false,
            views: {
                "app@jsonLayout": {
                    controller: 'MocksCtrl as MocksCtrl',
                    templateUrl: 'projects/mocks/mocks.tpl.html'
                }
            }
        });
    })

    .controller('MocksCtrl', function($rootScope, $scope, $stateParams) {
        var project = _.find($scope.$storage.restLab.projects, {key:$stateParams.projectKey});
        $scope.project = project;


    })

;
