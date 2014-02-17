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
  function ($scope, $rootScope, $localStorage) {
    $rootScope.$storage = $localStorage;
    if (_.isUndefined($rootScope.$storage.restLab)) {
      $rootScope.$storage.restLab = { projects: [] };
    }
    console.log('localstorage bound');
  }
]);
;