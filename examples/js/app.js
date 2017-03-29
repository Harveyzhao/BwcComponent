(function() {
    'use strict';

    angular.module('demoApp', ['ngRoute', 'ui.bootstrap', 'bwc.component'])

    .config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
        $routeProvider
            .when('/upload', {
                controller: 'UploadController',
                templateUrl: 'views/upload.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        // testing issue #521
        $compileProvider.debugInfoEnabled(false);
    }]);
})();