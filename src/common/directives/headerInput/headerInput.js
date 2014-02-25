angular.module('headerInput', [])
    .directive('headerInput', function ($state, $rootScope, httpHeaderService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '=ngModel',
                placeholder: '@placeholder',
                name: '=',
                type: '@'
            },
            templateUrl: 'directives/headerInput/headerInput.tpl.html',
            require: ['^form', 'ngModel'],
            link: function ($scope, element, attrs, controllers) {

                var formCtrl = controllers[0];
                var inputCtrl = controllers[1];

                $scope.headerArray = [];

                switch($scope.type){
                    case 'request':
                        $scope.headerArray = httpHeaderService.getRequestHeaders();
                    break;
                    case 'response':
                        $scope.headerArray = httpHeaderService.getResponseHeaders();
                    break;
                    default:
                        $scope.headerArray = httpHeaderService.getAllHeaders();
                }

                //Required validation
                var validateSelected = function() {
                    var valid = typeof $scope.model !== 'undefined';
                    inputCtrl.$setValidity('required', valid);
                    return valid;
                };

                inputCtrl.$parsers.push(validateSelected);
                inputCtrl.$formatters.push(validateSelected);

//                $scope.$watch('model', function(newVal){
//                    inputCtrl.$setValidity('required', 'true');
//                }, true);

            }
        };
    })
;
