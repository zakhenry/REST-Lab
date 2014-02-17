angular.module('stateManager', [
  'siteModules',
  'stateHelper'
]).config([
  '$stateProvider',
  'stateHelperProvider',
  '$locationProvider',
  '$urlRouterProvider',
  '$compileProvider',
  function ($stateProvider, stateHelperProvider, $locationProvider, $urlRouterProvider, $compileProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
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