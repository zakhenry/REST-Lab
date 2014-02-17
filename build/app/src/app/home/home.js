angular.module('app.home', []).config([
  'stateHelperProvider',
  function (stateHelperProvider) {
    stateHelperProvider.addState('defaultLayout.home', {
      url: '/',
      views: {
        'main@defaultLayout': {
          controller: 'HomeCtrl as HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      }
    });
  }
]).controller('HomeCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  function ($rootScope, $scope, $location) {
  }
]);
;