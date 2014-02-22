angular.module('momentFilters', [])
    .filter('fromNow', function() {
        return function(dateString) {
            return moment(new Date(dateString)).fromNow();
        };
    })
    .filter('calendar', function() {
        return function(dateString) {
            return moment(new Date(dateString)).calendar();
        };
    })

;