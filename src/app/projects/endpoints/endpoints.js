

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

        $scope.$watch('newEndpoint.uri', function(name){
            var existing = false;
            if (name){

                existing = _.find(project.endpoints, {uri:$scope.newEndpoint.uri});
                if (!!existing && $scope.endpointFormMode == 'edit' && existing.uri == $scope.newEndpoint.uri){
                    existing = false;
                }

            }
            $scope.addEndpointForm.endpointUri.$setValidity('uriExists', !existing);


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

            var url = project.url.protocol + project.url.host + ':'+project.url.port + endpoint.uri;
            apiInterface.options(url).then(function(response){
                console.log(response);
            });

            var response = ['HEAD','GET','DELETE'];

            endpoint.methods = _.mapValues(endpoint.methods, function(validity,method){
                return response.indexOf(method) !== -1;
            });

            $scope.addEndpointForm.endpointMethod.$setViewValue($scope.addEndpointForm.endpointMethod.$viewValue); //dirty hack to setdirty

        };


    })

;
