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
            ['.*', JsonMocksHandler]
        ];


        // Private methods, namespaced for code clarity
        var privateMethods = {
            server  : new chrome.WebApplication({handlers:handlers, port:8887})
        };


        chrome.runtime.getBackgroundPage(function(bg){

            bg.cleanupSockets();

        });


        var publicMethods = {

            start : function(){
                if (this.info.running){
                    console.log('server is already running. no need to start');
                    return this;
                }

                privateMethods.server.start();


                chrome.runtime.getBackgroundPage(function(bg){

                    bg.addActiveSocket(privateMethods.server.sockInfo.socketId);

                });

                this.info.running = true;
                this.info.lastStarted = new Date();

                console.log('starting webserver');
                return this;
            },

            stop : function(){
                if (!this.info.running){
                    console.log('server is not running. no need to stop');
                    return this;
                }
                privateMethods.server.stop();

                chrome.runtime.getBackgroundPage(function(bg){

                    bg.clearActiveSockets();

                });

                this.info.running = false;
                this.info.lastStopped = new Date();
                console.log('stopping webserver');
                return this;
            },

            info : {
                running : false,
                lastStarted : null,
                lastStopped : null
            }

        };

        return publicMethods;
    })
;