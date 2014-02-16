angular.module('templates-app', ['_layouts/default.tpl.html', '_partials/navigation.tpl.html', 'home/home.tpl.html']);

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
    "                    <li class=\"active\"><a href=\"#\">Link</a></li>\n" +
    "                    <li ui-route=\"/somewhere\" ng-class=\"{active:$uiRoute}\"><a href=\"/somewhere\">Link to somewhere</a></li>\n" +
    "                    <li class=\"dropdown\">\n" +
    "                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>\n" +
    "                        <ul class=\"dropdown-menu\">\n" +
    "                            <li><a href=\"#\">Action</a></li>\n" +
    "                            <li><a href=\"#\">Another action</a></li>\n" +
    "                            <li><a href=\"#\">Something else here</a></li>\n" +
    "                            <li class=\"divider\"></li>\n" +
    "                            <li><a href=\"#\">Separated link</a></li>\n" +
    "                            <li class=\"divider\"></li>\n" +
    "                            <li><a href=\"#\">One more separated link</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <form class=\"navbar-form navbar-left\" role=\"search\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Search\">\n" +
    "                    </div>\n" +
    "                    <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n" +
    "                </form>\n" +
    "                <ul class=\"nav navbar-nav navbar-right\">\n" +
    "                    <li><a href=\"#\">Link</a></li>\n" +
    "                    <li class=\"dropdown\">\n" +
    "                        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Dropdown <b class=\"caret\"></b></a>\n" +
    "                        <ul class=\"dropdown-menu\">\n" +
    "                            <li><a href=\"#\">Action</a></li>\n" +
    "                            <li><a href=\"#\">Another action</a></li>\n" +
    "                            <li><a href=\"#\">Something else here</a></li>\n" +
    "                            <li class=\"divider\"></li>\n" +
    "                            <li><a href=\"#\">Separated link</a></li>\n" +
    "                        </ul>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div><!-- /.navbar-collapse -->\n" +
    "        </div><!-- /.container-fluid -->\n" +
    "    </nav>\n" +
    "\n" +
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
