

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

        $scope.projectFormMode = 'new';
        $scope.newProject = {};
        $scope.addFormVisible = $scope.$storage.restLab.projects.length === 0; //default to show when there are no projects

        $scope.showAddForm = function(show){
            $scope.addFormVisible = show;
            $scope.projectFormMode = 'new';


            $scope.newProject = {}; //clear
            $scope.addProjectForm.$setPristine();
        };

        $scope.showEditForm = function(project){
            $scope.addFormVisible = true;
            $scope.projectFormMode = 'edit';


            $scope.newProject = _.clone(project, true); //clear
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

                var existing = _.find($scope.$storage.restLab.projects, {key:$scope.newProject.key});
                if (!!existing && $scope.projectFormMode == 'edit' && existing.key == $scope.newProject.key){
                    existing = false;
                }
                $scope.addProjectForm.projectKey.$setValidity('keyExists', !existing);

                $scope.addProjectForm.projectKey.$setValidity('keyLength', $scope.newProject.key.length!==0);

            }else{
                $scope.newProject.key = '';
            }

        });

        $scope.addProject = function(project){
            if ($scope.projectFormMode == 'edit'){
                project.updated = moment();
                var oldProject = _.find($scope.$storage.restLab.projects, {created:project.created}); //created is used as a unique key

                oldProject = _.merge(oldProject, project);

            }else{
                project.created = moment();
                project.statsGraph = getProjectBarGraph(project);
                $scope.$storage.restLab.projects.push(project);
            }

            $scope.newProject = {};
            $scope.addProjectForm.$setPristine();
            $scope.addFormVisible = false;
        };

        $scope.deleteProject = function(project){
            $scope.$storage.restLab.projects = _.without($scope.$storage.restLab.projects, project); //created is used as a unique key
        };

        var getProjectBarGraph = function(project){
            var testStats =  {
                passed : _.random(0,30),
                failed : _.random(0,30),
                untested: _.random(0,30)
            }; //@todo tmp
            var totalTests = testStats.passed + testStats.failed + testStats.untested;

            console.log('project bar graph called');

            return [
                {
                    name: 'Passed',
                    value: Math.round(testStats.passed/totalTests * 100),
                    type: 'success'
                },
                {
                    name: 'Failed',
                    value: Math.round(testStats.failed/totalTests * 100),
                    type: 'danger'
                },
                {
                    name: 'Untested',
                    value: Math.round(testStats.untested/totalTests * 100),
                    type: 'info'
                }
            ];
        };



        _.forEach($scope.$storage.restLab.projects, function(project){
            project.statsGraph = getProjectBarGraph(project); //called every time as this will likely be updated frequently
        });

    })

;
