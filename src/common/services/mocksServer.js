angular.module('mocksServer', [])
    .factory('mocksServer', function ($rootScope, $window) {

        // Private methods, namespaced for code clarity
        var privateMethods = {
            server  : null,

            init : function(){

                this.server = new chrome.WebApplication({
                    handlers:this.getHandlers(),
                    port:8887
                });

                return this;
            },

            methodHandlers : {
                handleRequest: function() {
                    // handle get request
                    console.log(this);

                    var response = privateMethods.processRequest(this.request);

                    this.write(response.message, response.code);
                }
            },

            processRequest: function(request){

                var uri = request.uri.substr(request.uri.indexOf('/')+1); //remove the initial slash
                var projectKey = uri.substr(0, uri.indexOf('/')); //everything up to the first slash
                var endpointUrl = uri.substr(uri.indexOf('/')); //everything including and after the first slash

                //var project = projectService.getProject(projectKey);
                //var endpoint = project.getEndpoint(endpointUrl);

                return {
                    code : 400,
                    message : 'OK!, ' + request.uri + ' project key '+projectKey+ ' endointUrl: '+endpointUrl
                };

            },

            getHandlers : function (){

                function JsonMocksHandler() {
                    BaseHandler.prototype.constructor.call(this);
                }
                _.extend(JsonMocksHandler.prototype, this.methodHandlers);

                for (var key in BaseHandler.prototype) {
                    JsonMocksHandler.prototype[key] = BaseHandler.prototype[key];
                }

                var handlers = [
                    ['.*', JsonMocksHandler]
                ];

                return handlers;

            }
        };

        privateMethods.init();

        var publicMethods = {

            start : function(){
                if (this.info.running){
                    console.log('server is already running. no need to start');
                    return this;
                }

                privateMethods.server.start();


                chrome.runtime.getBackgroundPage(function(bg){

                    bg.setActiveSocket(privateMethods.server.sockInfo.socketId); //save new socket id to the bg app for cleanup on close

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

                    bg.unsetActiveSocket(); //clear the active socket

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