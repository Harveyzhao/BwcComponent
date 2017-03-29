(function() {
    'use strict';

    angular.module('demoApp', ['ngRoute', 'ui.bootstrap', 'bwc.component'])

    .config(['$routeProvider', '$compileProvider', function($routeProvider, $compileProvider) {
        $routeProvider
            .when('/upload', {
                controller: 'UploadController',
                templateUrl: 'views/upload.html'
            })
            .when('/card', {
                controller: 'CardController',
                templateUrl: 'views/card.html'
            })
             .when('/layout', {
                controller: 'LayoutController',
                templateUrl: 'views/layout.html'
            })
            .otherwise({
                redirectTo: '/'
            });

        // testing issue #521
        $compileProvider.debugInfoEnabled(false);
    }]);
})();