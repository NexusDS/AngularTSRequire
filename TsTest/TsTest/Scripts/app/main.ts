require.config({
    paths: {
        'jquery': '../lib/jquery/dist/jquery.min',
        'domReady': '../lib/requirejs-domReady/domReady',
        'angular': '../lib/angular/angular',
        'angular-route': '../lib/angular-route/angular-route',
        'angular-resource': '../lib/angular-resource/angular-resource',
        'kendo': '../lib/kendo/kendo.all.min'
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'kendo': {
            deps: ['jquery'],
            exports: 'kendo'
        }        
    }
});

require(['angular', 'domReady', 'App'], function (angular, domReady) {
    domReady(doc => angular.bootstrap(doc, ['scadaModule']));
});