angular.module('app', [
  'templates-app',
  'templates-common',
  'vendorModules',
  'commonModules',
  'stateManager'
]).run([
  'titleService',
  function run(titleService) {
    titleService.setSuffix(' \xbb REST Lab');
    moment.lang('en-gb');
  }
]).controller('AppCtrl', [
  '$scope',
  '$rootScope',
  '$localStorage',
  '$http',
  function ($scope, $rootScope, $localStorage, $http) {
    $rootScope.$storage = $localStorage;
    console.log('localstorage bound');
  }
]);
;