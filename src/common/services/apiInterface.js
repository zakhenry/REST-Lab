angular.module('apiInterface', [])
    .factory('apiInterface', function ($rootScope, $http, $q, $window, $stateParams, $location) {


        // Private methods, namespaced for code clarity
        var privateMethod = {
            sendRequest: function (method, url, data, requestHeaders) {

                var deferred = $q.defer();

                console.log('attempting $http '+method+' to '+url+' with data ', data, 'and headers', requestHeaders);

                requestHeaders = requestHeaders || {}; //default to object

                var defaultHeaders = {
                    'Content-Type' : 'application/json'
                };

                var headers = _.merge(requestHeaders, defaultHeaders);

                var saveConfig = {
                    method: method,
                    url:  url,
                    data: data,
                    headers: headers,
                    responseType: 'json'
                };

                $http(saveConfig).success(function (responseData, responseStatus, responseHeaders, responseConfig) {
                    console.log('$http method success');
//                    debugger;
                    deferred.resolve({
                        data:responseData,
                        status:responseStatus,
                        headers:responseHeaders,
                        config:responseConfig
                    });

                }).error(function(errorData, errorStatus, errorHeaders, errorConfig){
                        console.log('$http method error');
//                        debugger;
                    deferred.reject({
                        data:errorData,
                        status:errorStatus,
                        headers:errorHeaders,
                        config:errorConfig
                    });
                });


                return deferred.promise;
            }
        };

        var publicMethods = {

            /**
             *
             * @param url
             * @param responseData
             * @returns {*}
             */
            test: function (url, responseData){
                var deferred = $q.defer();
                deferred.resolve(responseData);
                return deferred.promise;
            },

            // Alias CRUD functions

            options: function(url, data, headers){
                return privateMethod.sendRequest('OPTIONS', url, data, headers);
            },

            get: function(url, data, headers){
                return privateMethod.sendRequest('GET', url, data, headers);
            },

            put: function(url, data, headers){
                return privateMethod.sendRequest('PUT', url, data, headers);
            },

            post: function(url, data, headers){
                return privateMethod.sendRequest('POST', url, data, headers);
            },

            patch: function(url, data, headers){
                return privateMethod.sendRequest('PATCH',url, data, headers);
            },

            remove: function(url, data, headers){
                return privateMethod.sendRequest('DELETE',url, data, headers);
            }

        };

        return publicMethods;
    })
;