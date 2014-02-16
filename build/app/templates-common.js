angular.module('templates-common', ['directives/restlab-icon/restlab-icon.tpl.html']);

angular.module("directives/restlab-icon/restlab-icon.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("directives/restlab-icon/restlab-icon.tpl.html",
    "<div class=\"restlab-icon\" ng-style=\"{width:size+'px',height:size+'px'};\">\n" +
    "    <div class=\"icon\">\n" +
    "        <span class=\"tube\">\n" +
    "            <span class=\"sides\"></span>\n" +
    "            <span class=\"bottom\"></span>\n" +
    "        </span>\n" +
    "        <span class=\"tube-inner\">\n" +
    "            <span class=\"sides\">\n" +
    "\n" +
    "            </span>\n" +
    "            <span class=\"bottom\">\n" +
    "                <span class=\"brace\" ng-style=\"{'font-size': fontSize/2+'px'}\">\n" +
    "                    <span class=\"left\">{</span>\n" +
    "                    <span class=\"right\">}</span>\n" +
    "                </span>\n" +
    "            </span>\n" +
    "        </span>\n" +
    "    </div>\n" +
    "</div>");
}]);
