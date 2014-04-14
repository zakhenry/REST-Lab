angular.module('projectStatsGraph', [])
    .directive('projectStatsGraph', function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                project: '@'
            },
            transclude: false,
            templateUrl: 'directives/projectStatsGraph/projectStatsGraph.tpl.html',
            link: function ($scope, element, attrs) {

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

                $scope.statsGraph = getProjectBarGraph($scope.project);
            }
        };
    })
;
