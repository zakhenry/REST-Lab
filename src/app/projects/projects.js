

angular.module('app.projects', ['app.projects.endpoints'])

    .config(function(stateHelperProvider) {

        stateHelperProvider.addState('defaultLayout.projects.project', {
            url: '/:projectKey',
            abstract: true

        });

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

        $scope.$on('$viewContentLoaded', function() { //all controllers have loaded
            if ($scope.$storage.restLab.projects.length === 0){
                console.log('broadcasting an add project event');
                $scope.showAddProjectForm();
            }
        });

        $scope.$on('projectChange', function(event, project){
            console.log('detected project edit',project);
            $scope.$broadcast('projectEdit', project); //fwd message to the children
        });

        $scope.$on('projectFormClosed', function(event, message){
            if (message.type == 'add'){
                $scope.addProjectFormVisible = false;
            }
        });

        $scope.showAddProjectForm = function(){
            $scope.addProjectFormVisible = true;
            $scope.$broadcast('projectAdd'); //fwd message to the children
        };

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
        $scope.projectFormMode = 'add';
        var defaultProject = {
            url : {
                port:80,
                protocol: 'http://'
            },
            endpoints: [],
            tests: []
        };
        $scope.newProject = _.clone(defaultProject);

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
            if (!$scope.project){
                console.log('detected project add',message);
                resetForm();
                $scope.projectFormMode = 'add';
                $scope.projectFormVisible = true;
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
            $scope.newProject = {};
            $scope.newProject = _.clone(defaultProject, true);
            $scope.addProjectForm.$setPristine();
            $scope.projectFormVisible = false;
        };

        $scope.addNewProject = function(project){
            project.created = moment();
            project = _.merge(project, _.clone(defaultProject, true));
            $scope.$storage.restLab.projects.push(project);
            $scope.closeForm();
        };

        $scope.updateProject = function(project){
            project.updated = moment();
            var oldProject = _.find($scope.$storage.restLab.projects, {created:project.created}); //created is used as a unique key

            oldProject = _.merge(oldProject, project);
            $scope.closeForm();
        };

        $scope.closeForm = function(){
            resetForm();
            $scope.$emit('projectFormClosed', {
                type: $scope.projectFormMode
            });
        };

    })

;
