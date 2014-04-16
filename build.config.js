/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'build/app',
    compile_dir: 'bin/app',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/chrome-server/**/*.js'],
        jsunit: ['src/**/*.spec.js'],

        atpl: ['src/app/**/*.tpl.html'],
        ctpl: ['src/common/**/*.tpl.html'],

        html: ['src/index.html'],

        app_less: ['src/global.less', 'src/app/**/*.less', 'src/common/**/*.less'],

        files_from_src: ['.htaccess', 'manifest.json', 'main.js']
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     */
    vendor_files: {
        js: [
//            'vendor/jquery/jquery.js',
            'vendor/angular-unstable/angular.js',
            'vendor/angular-unstable/angular-resource.js',
            'vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'vendor/angular-ui-utils/modules/event/event.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'vendor/angular-ui-utils/modules/route/route.js',
            'vendor/lodash/dist/lodash.js',
            'vendor/restangular/dist/restangular.js',
            'vendor/moment/min/moment.min.js',
            'vendor/moment/min/lang/en-gb.js',
            'vendor/angular-chrome-storage/angular-chrome-storage.js',
            "local_vendor/chrome-server/common.js",
            "local_vendor/chrome-server/mime.js",
            "local_vendor/chrome-server/buffer.js",
            "local_vendor/chrome-server/request.js",
            "local_vendor/chrome-server/stream.js",
            "local_vendor/chrome-server/connection.js",
            "local_vendor/chrome-server/webapp.js",
            "local_vendor/chrome-server/handlers.js",
            "local_vendor/chrome-server/httplib.js"
        ],
        /**
         * Files to NOT be concatenated or minified, but will still be included in the project
         */
        js_separate: [],
        // Bootstrap is already included in the src/global.less file, no need to include here
        css: [],
        // Files you want copied to the src directory
        files_to_src: [],
        // Files you want copied to the assets directory
        files_to_assets: [
            'vendor/bootstrap/img/glyphicons-halflings.png',
            'vendor/bootstrap/img/glyphicons-halflings-white.png',
            'vendor/font-awesome/fonts/**'
        ]
    }
};
