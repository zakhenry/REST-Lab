

angular.module('app.projects', ['app.projects.endpoints'])

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
        var defaultProject = {
            url : {
                port:80,
                protocol: 'http://'
            }
        };

        $scope.newProject = defaultProject;
        $scope.addFormVisible = $scope.$storage.restLab.projects.length === 0; //default to show when there are no projects

        $scope.showAddForm = function(show){
            $scope.addFormVisible = show;
            $scope.projectFormMode = 'new';


            $scope.newProject = defaultProject; //clear
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

        var projectDefaults = {
            endpoints: [],
            tests: []
        };

        $scope.addProject = function(project){
            if ($scope.projectFormMode == 'edit'){
                project.updated = moment();
                var oldProject = _.find($scope.$storage.restLab.projects, {created:project.created}); //created is used as a unique key

                oldProject = _.merge(oldProject, project);

            }else{
                project.created = moment();
                project.statsGraph = getProjectBarGraph(project);
                project = _.merge(project, projectDefaults);
                $scope.$storage.restLab.projects.push(project);
            }

            $scope.newProject = defaultProject;
            $scope.addProjectForm.$setPristine();
            $scope.addFormVisible = false;
        };

        $scope.deleteProject = function(project){
            $scope.$storage.restLab.projects = _.without($scope.$storage.restLab.projects, project); //created is used as a unique key
        };

        var calculateRounding = function(list, target) {
            var off = target - _.reduce(list, function(acc, x) { return acc + Math.round(x); }, 0);
            return _.chain(list).
                sortBy(function(x) { return Math.round(x) - x; }).
                map(function(x, i) { return Math.round(x) + (off > i) - (i >= (list.length + off)); }).
                value();
        };

        var getProjectBarGraph = function(project){
            var testStats =  {
                passed : _.random(0,30),
                failed : _.random(0,30),
                untested: _.random(0,30)
            }; //@todo tmp
            var totalTests = testStats.passed + testStats.failed + testStats.untested;

            console.log('project bar graph called : passed:'+testStats.passed +', failed:' + testStats.failed +', failed:'+ testStats.untested+', total:'+totalTests);

            var roundingCalc = calculateRounding(
                [
                    Math.round(testStats.passed/totalTests * 100),
                    Math.round(testStats.failed/totalTests * 100),
                    Math.round(testStats.untested/totalTests * 100)
                ],
            100);

            return [
                {
                    name: 'Passed',
                    value: roundingCalc[0],
                    type: 'success'
                },
                {
                    name: 'Failed',
                    value: roundingCalc[1],
                    type: 'danger'
                },
                {
                    name: 'Untested',
                    value: roundingCalc[2],
                    type: 'info'
                }
            ];
        };



        _.forEach($scope.$storage.restLab.projects, function(project){
            project.statsGraph = getProjectBarGraph(project); //called every time as this will likely be updated frequently
        });

    })

;
