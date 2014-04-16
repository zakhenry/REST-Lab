angular.module('mocksServer', [])
    .factory('mocksServer', function ($rootScope) {


        function JsonMocksHandler() {
            BaseHandler.prototype.constructor.call(this);
        }
        _.extend(JsonMocksHandler.prototype, {
            get: function() {
                // handle get request
                this.write('OK!, ' + this.request.uri);
            }
        });
        for (var key in BaseHandler.prototype) {
            JsonMocksHandler.prototype[key] = BaseHandler.prototype[key];
        }



        var handlers = [
//        ['.*', MainHandler]
//        ['.*', PackageFilesHandler]
//        ['.*', DirectoryEntryHandler]
            ['.*', JsonMocksHandler]
        ];

        // Private methods, namespaced for code clarity
        var privateMethods = {
            server  : new chrome.WebApplication({handlers:handlers, port:8887})
        };

        var publicMethods = {

            start : function(){
                privateMethods.server.start();
                return this;
            },

            stop : function(){
                privateMethods.server.stop();
                return this;
            }

        };

        return publicMethods;
    })
;