

angular.module('app.projects.endpoints', [])

    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('defaultLayout.projects.endpoints', {
            url: '/:projectKey/endpoints',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'EndpointsCtrl as EndpointsCtrl',
                    templateUrl: 'projects/endpoints/endpoints.tpl.html'
                }
            }

        });
    })

    .controller('EndpointsCtrl', function($rootScope, $scope, $stateParams, apiInterface) {


        var project = _.find($scope.$storage.restLab.projects, {key:$stateParams.projectKey});
        $scope.project = project;

        var emptyEndpoint = {
            uri: {
                key: null,
                definition: null,
                breakdown: null
            },
            methods: {
                OPTIONS : false,
                GET : false,
                HEAD : false,
                POST : false,
                PUT : false,
                DELETE : false,
                PATCH : false
            }
        };

        $scope.endpointFormMode = 'new';
        $scope.newEndpoint = emptyEndpoint;



        $scope.addFormVisible = project.endpoints.length === 0; //default to show when there are no endpoints

        $scope.showAddForm = function(show){
            $scope.addFormVisible = show;
            $scope.endpointFormMode = 'new';


            $scope.newEndpoint = emptyEndpoint; //clear
            $scope.addEndpointForm.$setPristine();
        };

        $scope.showEditForm = function(endpoint){
            $scope.addFormVisible = true;
            $scope.endpointFormMode = 'edit';


            $scope.newEndpoint = _.clone(endpoint, true); //clear
            $scope.addEndpointForm.$setPristine();
        };

        $scope.$watch('newEndpoint.uri.definition', function(name){
            var existing = false;
            if (name){

                var variableRegex = /(\[.*?\])/g;
                var splitUri = name.split(variableRegex);

                var uriObject = _.map(splitUri, function(piece){
                    var match = piece.match(/\[(.*?)\]/);
                    var type = 'segment';
                    if (match){
                        piece = match[1];
                        type = 'variable';
                    }
                    return {
                        type: type,
                        val: piece
                    };
                });

                $scope.newEndpoint.uri.key = _.pluck(_.filter(uriObject, {type:'segment'}), 'val').join('');

                existing = _.find(project.endpoints, function(endpoint){
                    return endpoint.uri.key == $scope.newEndpoint.uri.key;
                });

                if (!!existing && $scope.endpointFormMode == 'edit' && existing.uri.key == $scope.newEndpoint.uri.key){
                    existing = false;
                }

                $scope.newEndpoint.uri.breakdown = uriObject;

            }
            $scope.addEndpointForm.endpointUri.$setValidity('uriExists', !existing);
            $scope.addEndpointForm.endpointUri.$setValidity('uriValid', !!$scope.newEndpoint.uri.breakdown);


        });

        $scope.addEndpoint = function(endpoint){
            if ($scope.endpointFormMode == 'edit'){
                endpoint.updated = moment();
                var oldEndpoint = _.find(project.endpoints, {created:endpoint.created}); //created is used as a unique key

                oldEndpoint = _.merge(oldEndpoint, endpoint);

            }else{
                endpoint.created = moment();
                project.endpoints.push(endpoint);
            }

            $scope.newEndpoint = emptyEndpoint;
            $scope.addEndpointForm.$setPristine();
            $scope.addFormVisible = false;
        };

        $scope.deleteEndpoint = function(endpoint){
            project.endpoints = _.without(project.endpoints, endpoint); //created is used as a unique key
        };

        $scope.autodetectMethods = function(project, endpoint){

            var url = project.url.protocol + project.url.host + ':'+project.url.port + endpoint.uri.definition;
            apiInterface.options(url).then(function(response){
                var headers = response.headers();
                var allowedMethods = headers.allow.split(', ');

                endpoint.methods = _.mapValues(endpoint.methods, function(validity,method){
                    return allowedMethods.indexOf(method) !== -1;
                });
            });

            $scope.addEndpointForm.endpointMethod.$setViewValue($scope.addEndpointForm.endpointMethod.$viewValue); //dirty hack to setdirty

        };


    })

;
