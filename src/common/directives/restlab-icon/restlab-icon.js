angular.module('restlabIcon', [])
    .directive('restlabIcon', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                size: '@'
            },
            templateUrl: 'directives/restlab-icon/restlab-icon.tpl.html',
            // The linking function will add behavior to the template
            link: function ($scope, element, attrs) {
                $scope.fontSize = $scope.size/ 3;
            }
        };
    })
;
