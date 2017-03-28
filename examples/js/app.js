(function() {
    'use strict';

    angular.module('bwcCmp', ['ui.tree', 'ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
        $routeProvider
            .when('/upload', {
                controller: 'UploadController',
                templateUrl: 'views/uploadController.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        // testing issue #521
        $compileProvider.debugInfoEnabled(false);
    }]);
})();