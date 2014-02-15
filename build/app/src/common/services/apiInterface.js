angular.module('apiInterface', []).factory('apiInterface', [
  '$rootScope',
  '$http',
  '$q',
  '$window',
  '$stateParams',
  '$location',
  'STAGE_API_URL',
  '$route',
  function ($rootScope, $http, $q, $window, $stateParams, $location, STAGE_API_URL, $route) {
    var apiUrl = STAGE_API_URL;
    var privateMethod = {
        sendRequest: function (method, url, data, requestHeaders) {
          var deferred = $q.defer();
          console.log('attempting $http ' + method + ' to ' + url + ' with data ', data, 'and headers', requestHeaders);
          requestHeaders = requestHeaders || {};
          var defaultHeaders = { 'Content-Type': 'application/json' };
          var headers = _.merge(requestHeaders, defaultHeaders);
          var saveConfig = {
              method: method,
              url: apiUrl + url,
              data: data,
              headers: headers,
              responseType: 'json'
            };
          $http(saveConfig).success(function (data, status, headers, config) {
            console.log('$http method success');
            deferred.resolve({
              origin: 'remote',
              data: data,
              status: status,
              headers: headers,
              config: config
            });
          }).error(function (data, status, headers, config) {
            console.log('$http method error');
            deferred.reject({
              origin: 'remote',
              data: data,
              status: status,
              headers: headers,
              config: config
            });
          });
          return deferred.promise;
        }
      };
    var publicMethods = {
        test: function (url, responseData) {
          var deferred = $q.defer();
          deferred.resolve(responseData);
          return deferred.promise;
        },
        get: function (url, data, headers) {
          return privateMethod.sendRequest('GET', url, data, headers);
        },
        put: function (url, data, headers) {
          return privateMethod.sendRequest('PUT', url, data, headers);
        },
        post: function (url, data, headers) {
          return privateMethod.sendRequest('POST', url, data, headers);
        },
        patch: function (url, data, headers) {
          return privateMethod.sendRequest('PATCH', url, data, headers);
        },
        remove: function (url, data, headers) {
          return privateMethod.sendRequest('DELETE', url, data, headers);
        },
        deleteUI: function (id) {
          console.log('requested to delete', $stateParams.collectionId, '/', id);
          $rootScope.api.deleteModal = {
            show: true,
            collection: $stateParams.collectionId,
            id: id,
            deleteConfirmed: function () {
              console.log('delete confirmed', this.id);
              publicMethods.remove('/' + this.collection + '/' + this.id);
              this.show = false;
              var thisPath = $location.path();
              var targetPath = '/api/' + this.collection;
              if (thisPath == targetPath) {
                $window.location.reload();
              } else {
                $location.path(targetPath);
              }
            }
          };
        }
      };
    return publicMethods;
  }
]);
;