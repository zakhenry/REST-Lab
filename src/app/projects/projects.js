

angular.module('app.projects', ['app.projects.endpoints'])

    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('defaultLayout.projects', {
            url: '/projects',
            views: {
                "main@defaultLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'ProjectListControl as ProjectListControl',
                    templateUrl: 'projects/projects.tpl.html'
                },
                "projectView@defaultLayout.projects": {
                    controller: 'ProjectViewCtrl as ProjectViewCtrl',
                    templateUrl: 'projects/project-view.tpl.html'
                },
                "projectForm@defaultLayout.projects": {
                    controller: 'ProjectFormCtrl as ProjectFormCtrl',
                    templateUrl: 'projects/project-form.tpl.html'
                }
            }

        });
    })

    .controller('ProjectListControl', function($rootScope, $scope, $location) {


        $scope.projectFormMode = $scope.$storage.restLab.projects.length === 0; //default to show when there are no projects

        $scope.$on('projectChange', function(event, project){
            console.log('detected project edit',project);
            $scope.$broadcast('projectEdit', project); //fwd message to the children
        });

        $scope.$on('projectFormClosed', function(event, message){
            if (message.type === 'add'){
                $scope.projectFormMode = false;
            }
        });

        $scope.showAddProjectForm = function(){
            $scope.projectFormMode = true;
            $scope.$broadcast('projectAdd'); //fwd message to the children
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
                    count: testStats.passed,
                    type: 'success'
                },
                {
                    name: 'Failed',
                    value: roundingCalc[1],
                    count: testStats.failed,
                    type: 'danger'
                },
                {
                    name: 'Untested',
                    value: roundingCalc[2],
                    count: testStats.untested,
                    type: 'info'
                }
            ];
        };

        _.forEach($scope.$storage.restLab.projects, function(project){
            project.statsGraph = getProjectBarGraph(project); //called every time as this will likely be updated frequently
        });

    })

    .controller('ProjectViewCtrl', function($rootScope, $scope, $location) {

        $scope.showEditForm = function(project){
            $scope.$emit('projectChange', {
                project : project,
                type: 'edit'
            });
        };

        $scope.deleteProject = function(project){
            $scope.$storage.restLab.projects = _.without($scope.$storage.restLab.projects, project); //created is used as a unique key
        };

    })


    .controller('ProjectFormCtrl', function($rootScope, $scope, $location) {
        /* Init values */
        $scope.projectFormMode = 'new';
        var defaultProject = {
            url : {
                port:80,
                protocol: 'http://'
            },
            endpoints: [],
            tests: []
        };
        $scope.newProject = defaultProject;

        $scope.$on('projectEdit', function(event, message){

            if (!!$scope.project && message.project.key == $scope.project.key){ //only open the active project edit page
                $scope.projectFormVisible = true;
                $scope.projectFormMode = 'edit';

                $scope.newProject = _.clone(message.project, true); //clear
                $scope.addProjectForm.$setPristine();
            }else{
                $scope.projectFormVisible = false; //close others
            }

        });
        /* Listen to parents */
        $scope.$on('projectAdd', function(event, message){
            console.log('detected project add',message);
            if (_.isUndefined($scope.project)){
                $scope.projectFormVisible = true;
                $scope.projectFormMode = 'add';
                $scope.newProject = defaultProject;
                $scope.addProjectForm.$setPristine();
            }
        });

        /* watch form variables */
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


        var resetForm = function(){
            $scope.newProject = defaultProject;
            $scope.addProjectForm.$setPristine();
            $scope.projectFormVisible = false;
        };

        $scope.addNewProject = function(project){
            project.created = moment();
//            project.statsGraph = getProjectBarGraph(project);
            project = _.merge(project, defaultProject);
            $scope.$storage.restLab.projects.push(project);
        };

        $scope.updateProject = function(project){
            project.updated = moment();
            var oldProject = _.find($scope.$storage.restLab.projects, {created:project.created}); //created is used as a unique key

            oldProject = _.merge(oldProject, project);
        };

        $scope.closeForm = function(){
            resetForm();
            $scope.$emit('projectFormClosed', {
                type: $scope.projectFormMode
            });
        };

    })

;
