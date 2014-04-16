angular.module('breadcrumbs', [])
    .directive('breadcrumbs', function ($state, $rootScope) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
//                size: '@'
            },
            templateUrl: 'directives/breadcrumbs/breadcrumbs.tpl.html',
            link: function ($scope, element, attrs) {
//                $scope.fontSize = $scope.size/ 3;


                var reloadBreadcrumbs = function(){
                    var thisState = _.last($state.$current.path);
                    $scope.breadcrumbs = _.chain(thisState.path)
                        .map(function(state){

                            if (!state.self.url){
                                return false;
                            }

                            var breadcrumb = {
                                title : state.self.url.replace('/', ''),
                                link : true,
                                url : $state.href(state.self.name, $state.params),
                                state: state
                            };

                            if (state.ownParams.length>0){ //state has variable
                                breadcrumb.title = $state.params[state.ownParams[0]]; //awkward hack as I don't know how to handle multiple params per crumb
                            }

                            if (state.self.abstract){
                                breadcrumb.link = false; //dont link to an abstract state
                                breadcrumb.url = $state.href(state.parent.self.name, $state.params); //link to parent instead
                            }

                            return breadcrumb;

                        })
                        .compact() //remove all the false values
                        .value()
                    ;
                };

                $scope.gotoState = function(state){
                    if (!state.self.abstract){
                        $state.go(state.self.name, $state.params);
                    }

                };


                reloadBreadcrumbs();
                $rootScope.$on('$stateChangeSuccess', reloadBreadcrumbs);
            }
        };
    })
;
