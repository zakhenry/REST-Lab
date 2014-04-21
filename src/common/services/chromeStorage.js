/**
 *
 * Chrome storage service, functionality concepts copied from ngStorage
 *
 */
angular.module('chromeStorage', [])
    .factory('chromeStorage', function ($rootScope,$browser, $window) {

        var webStorage = chrome.storage.local;

        var $storage = {},
            _last$storage,
            _debounce
        ;

        //initialise from storage

        webStorage.get(null, function(storageItems){

            angular.forEach(storageItems, function (value, key){
                $storage[key] = value;
            });

            $rootScope.$apply();

        });

        _last$storage = angular.copy($storage);


        $rootScope.$watch(function() {
            if (!_debounce){
                _debounce = setTimeout(function() {
                    _debounce = null;

                    if (!angular.equals($storage, _last$storage)) {
                        angular.forEach($storage, function(v, k) {
                            if (angular.isDefined(v)) {

                                $storage[k] = v;

                                var saveObj = {};
                                saveObj[k] = v;

                                webStorage.set(saveObj);
                            }

                            delete _last$storage[k]; //unset the key from last storage so it isn't removed next
                        });

                        for (var k in _last$storage) {
                            webStorage.remove(k); //delete removed data.
                        }

                        _last$storage = angular.copy($storage); //refill the last storage values with the new

                    }

                }, 100);
            }
        });

        return $storage;
    })
;