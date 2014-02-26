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
            require: ['?^form', 'ngModel'],
            link: function ($scope, element, attrs, controllers) {

                var formCtrl = controllers[0];
                var inputCtrl = controllers[1];


                console.log('controllers', controllers);

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
                var validateInput = function() {
                    var validRequired = typeof $scope.model !== 'undefined' && $scope.model !== '';
                    inputCtrl.$setValidity('required', validRequired);

                    console.log('testing validity');

                    var invalidHeaderChar = /[\(\)<>@,;:\\\/\[\]\?=\{\}"]/; //invalid chars are: ()<>,;:\/[]?={}"
                    var headerCharValid = !invalidHeaderChar.test($scope.model);
                    inputCtrl.$setValidity('headerCharValid', headerCharValid);
                    console.log('headerCharValid', headerCharValid);

                    return validRequired && headerCharValid;
                };

                inputCtrl.$parsers.push(validateInput);
                inputCtrl.$formatters.push(validateInput);

                $scope.$watch('model', function(newVal, oldVal){
                    validateInput();

                    if (newVal !== oldVal){
                        formCtrl.$setDirty();
                    }
                }, true);

            }
        };
    })
;
