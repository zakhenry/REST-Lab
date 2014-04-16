angular.module('vendorModules', [
    'ui.bootstrap',
    'ui.router', // Handles state changes and routing of the site
    'ui.route', // Module to check for active urls, nothing to do with ui.router
    'chromeStorage'
]);