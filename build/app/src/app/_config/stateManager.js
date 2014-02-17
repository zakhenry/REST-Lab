angular.module('stateManager', [
  'siteModules',
  'stateHelper'
]).config([
  '$stateProvider',
  'stateHelperProvider',
  '$locationProvider',
  '$urlRouterProvider',
  function ($stateProvider, stateHelperProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('defaultLayout', {
      abstract: true,
      views: {
        'app@': { templateUrl: '_layouts/default.tpl.html' },
        'navigation@defaultLayout': {
          templateUrl: '_partials/navigation.tpl.html',
          controller: [
            '$rootScope',
            function ($rootScope) {
            }
          ]
        }
      }
    });
    ;
    angular.forEach(stateHelperProvider.getStates(), function (state) {
      $stateProvider.state(state.name, state.options);
    });
  }
]);
;