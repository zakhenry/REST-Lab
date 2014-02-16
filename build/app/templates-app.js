angular.module('templates-app', ['_layouts/default.tpl.html', '_partials/navigation.tpl.html', 'endpoints/endpoints.tpl.html', 'home/home.tpl.html', 'projects/projects.tpl.html']);

angular.module("_layouts/default.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("_layouts/default.tpl.html",
    "<div id=\"header-container\" ui-view=\"navigation\"></div>\n" +
    "<div ui-view=\"main\" ng-animate=\"'fade'\"></div>");
}]);

angular.module("_partials/navigation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("_partials/navigation.tpl.html",
    "<div id=\"header\">\n" +
    "\n" +
    "    <nav class=\"navbar navbar-default\" role=\"navigation\">\n" +
    "        <div class=\"container-fluid\">\n" +
    "            <!-- Brand and toggle get grouped for better mobile display -->\n" +
    "            <div class=\"navbar-header\">\n" +
    "                <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n" +
    "                    <span class=\"sr-only\">Toggle navigation</span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                    <span class=\"icon-bar\"></span>\n" +
    "                </button>\n" +
    "                <a class=\"navbar-brand\" href=\"/\">\n" +
    "                    <span class=\"fa-stack fa-lg\">\n" +
    "                      <i class=\"fa fa-square fa-stack-2x\"></i>\n" +
    "                      <i class=\"fa fa-flask fa-stack-1x fa-inverse\"></i>\n" +
    "                    </span>\n" +
    "                    REST Lab</a>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Collect the nav links, forms, and other content for toggling -->\n" +
    "            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n" +
    "                <ul class=\"nav navbar-nav\">\n" +
    "                    <li ui-route=\"/projects\" ng-class=\"{active:$uiRoute}\">\n" +
    "                        <a href=\"/projects\">Projects</a>\n" +
    "                    </li>\n" +
    "                    <li ui-route=\"/endpoints\" ng-class=\"{active:$uiRoute}\">\n" +
    "                        <a href=\"/endpoints\">Endpoints</a>\n" +
    "                    </li>\n" +
    "                    <!--<li class=\"dropdown\">-->\n" +
    "                        <!--<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>-->\n" +
    "                        <!--<ul class=\"dropdown-menu\">-->\n" +
    "                            <!--<li><a href=\"#\">Action</a></li>-->\n" +
    "                            <!--<li><a href=\"#\">Another action</a></li>-->\n" +
    "                            <!--<li><a href=\"#\">Something else here</a></li>-->\n" +
    "                            <!--<li class=\"divider\"></li>-->\n" +
    "                            <!--<li><a href=\"#\">Separated link</a></li>-->\n" +
    "                            <!--<li class=\"divider\"></li>-->\n" +
    "                            <!--<li><a href=\"#\">One more separated link</a></li>-->\n" +
    "                        <!--</ul>-->\n" +
    "                    <!--</li>-->\n" +
    "                </ul>\n" +
    "                <!--<form class=\"navbar-form navbar-left\" role=\"search\">-->\n" +
    "                    <!--<div class=\"form-group\">-->\n" +
    "                        <!--<input type=\"text\" class=\"form-control\" placeholder=\"Search\">-->\n" +
    "                    <!--</div>-->\n" +
    "                    <!--<button type=\"submit\" class=\"btn btn-default\">Submit</button>-->\n" +
    "                <!--</form>-->\n" +
    "                <!--<ul class=\"nav navbar-nav navbar-right\">-->\n" +
    "                    <!--<li><a href=\"#\">Link</a></li>-->\n" +
    "                    <!--<li class=\"dropdown\">-->\n" +
    "                        <!--<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>-->\n" +
    "                        <!--<ul class=\"dropdown-menu\">-->\n" +
    "                            <!--<li><a href=\"#\">Action</a></li>-->\n" +
    "                            <!--<li><a href=\"#\">Another action</a></li>-->\n" +
    "                            <!--<li><a href=\"#\">Something else here</a></li>-->\n" +
    "                            <!--<li class=\"divider\"></li>-->\n" +
    "                            <!--<li><a href=\"#\">Separated link</a></li>-->\n" +
    "                        <!--</ul>-->\n" +
    "                    <!--</li>-->\n" +
    "                <!--</ul>-->\n" +
    "            </div><!-- /.navbar-collapse -->\n" +
    "        </div><!-- /.container-fluid -->\n" +
    "    </nav>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("endpoints/endpoints.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("endpoints/endpoints.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "    <h1>Endpoints <small>The url points that the api interface accesses</small></h1>\n" +
    "\n" +
    "    <button ng-if=\"showAddForm\" class=\"btn btn-primary\" ng-click=\"showAddForm = true\">Add Endpoint</button>\n" +
    "    <ng-form name=\"addEndpointForm\">\n" +
    "\n" +
    "    </ng-form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("home/home.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "    <h1>REST Lab<small> Putting your RESTful API through it's paces</small></h1>\n" +
    "\n" +
    "</div>");
}]);

angular.module("projects/projects.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("projects/projects.tpl.html",
    "<div class=\"container\">\n" +
    "\n" +
    "    <h1>Projects <small>Each distinct project you are testing</small></h1>\n" +
    "\n" +
    "    <button ng-if=\"!addFormVisible\" class=\"btn btn-primary\" ng-click=\"showAddForm(true)\">Add Project</button>\n" +
    "\n" +
    "    <div class=\"alert alert-info alert-dismissable\" ng-show=\"addFormVisible\">\n" +
    "        <button type=\"button\" class=\"close\" aria-hidden=\"true\" ng-click=\"showAddForm(false)\">&times;</button>\n" +
    "        <h2>Add new project</h2>\n" +
    "        <ng-form name=\"addProjectForm\" role=\"form\" class=\"form-horizontal\">\n" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error':addProjectForm.projectName.$dirty && addProjectForm.projectName.$invalid}\">\n" +
    "                <label for=\"projectName\" class=\"col-sm-2 control-label\">Project Name</label>\n" +
    "                <div class=\"col-sm-8\">\n" +
    "                    <input type=\"text\" ng-model=\"newProject.name\" class=\"form-control\" id=\"projectName\" name=\"projectName\" placeholder=\"Enter project name\" required>\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-show=\"addProjectForm.projectName.$invalid && addProjectForm.projectName.$dirty\">* Required</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error':addProjectForm.projectKey.$dirty && addProjectForm.projectKey.$invalid}\">\n" +
    "                <label for=\"projectKey\" class=\"col-sm-2 control-label\">Project Key</label>\n" +
    "                <div class=\"col-sm-8\">\n" +
    "                    <input disabled type=\"text\" ng-model=\"newProject.key\" class=\"form-control\" id=\"projectKey\" name=\"projectKey\" placeholder=\"Project key is determined by project name\">\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-show=\"addProjectForm.projectKey.$error.keyExists\">Project key already exists</span>\n" +
    "                <span class=\"help-block\" ng-show=\"addProjectForm.projectKey.$error.keyLength\">Project key invalid</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error':addProjectForm.projectBaseUrl.$dirty && addProjectForm.projectBaseUrl.$invalid}\">\n" +
    "                <label for=\"projectBaseUrl\" class=\"col-sm-2 control-label\">Project Base URL</label>\n" +
    "                <div class=\"col-sm-8\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <div class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span> {{newProject.url.protocol || 'Protocol'}}</button>\n" +
    "                            <ul class=\"dropdown-menu\">\n" +
    "                                <li><a ng-click=\"newProject.url.protocol = 'http://'\">http://</a></li>\n" +
    "                                <li><a ng-click=\"newProject.url.protocol = 'https://'\">https://</a></li>\n" +
    "                            </ul>\n" +
    "                        </div><!-- /btn-group -->\n" +
    "                        <input type=\"text\" ng-model=\"newProject.url.base\" class=\"form-control\" id=\"projectBaseUrl\" name=\"projectBaseUrl\" placeholder=\"Base URL of the project\" required>\n" +
    "                    </div><!-- /input-group -->\n" +
    "                </div>\n" +
    "                <span class=\"help-block\" ng-show=\"addProjectForm.projectBaseUrl.$dirty && addProjectForm.projectBaseUrl.$error.required\">* Required</span>\n" +
    "                <span class=\"help-block\" ng-show=\"addProjectForm.projectBaseUrl.$dirty && addProjectForm.projectBaseUrl.$error.urlInvalid\">Invalid url</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <button ng-disabled=\"!addProjectForm.$dirty || addProjectForm.$invalid\" class=\"btn btn-primary\" ng-click=\"addProject(newProject)\">Submit</button>\n" +
    "\n" +
    "        </ng-form>\n" +
    "    </div>\n" +
    "\n" +
    "    <pre>{{$storage.restLab.projects|json}}</pre>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);
