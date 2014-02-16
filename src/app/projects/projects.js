

angular.module('app.projects', [])

    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('defaultLayout.projects', {
            url: '/projects',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'ProjectsCtrl as ProjectsCtrl',
                    templateUrl: 'projects/projects.tpl.html'
                }
            }

        });
    })

    .controller('ProjectsCtrl', function($rootScope, $scope, $location) {

        $scope.newProject = {};
        $scope.addFormVisible = $scope.$storage.restLab.projects.length === 0; //default to show when there are no projects

        $scope.showAddForm = function(show){
            $scope.addFormVisible = show;


            $scope.newProject = {}; //clear
            $scope.addProjectForm.$setPristine();
        };

        $scope.$watch('newProject.name', function(name){

            if (name){
                $scope.newProject.key = name
                    .toLowerCase()
                    .replace(/[^\w ]+/g,'')
                    .replace(/ +/g,'-')
                ;

                $scope.addProjectForm.projectKey.$setViewValue($scope.addProjectForm.projectKey.$viewValue); //dirty hack to setdirty
//                $scope.addProjectForm.projectKey.$setDirty();
                var existing = _.find($scope.$storage.restLab.projects, {key:$scope.newProject.key});
                $scope.addProjectForm.projectKey.$setValidity('keyExists', !existing);

                $scope.addProjectForm.projectKey.$setValidity('keyLength', $scope.newProject.key.length!==0);

            }else{
                $scope.newProject.key = '';
            }

        });

        $scope.addProject = function(project){
            project.created = moment();
            $scope.$storage.restLab.projects.push(project);
            $scope.newProject = {};
            $scope.addProjectForm.$setPristine();
            $scope.addFormVisible = false;
        };

    })

;
