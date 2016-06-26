'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
    function Config($stateProvider, $urlRouterProvider) {
        _classCallCheck(this, Config);

        this.$stateProvider = $stateProvider;
        this.$urlRouterProvider = $urlRouterProvider;
        this.setCoreRoutes();
    }

    _createClass(Config, [{
        key: 'setCoreRoutes',
        value: function setCoreRoutes() {
            this.$urlRouterProvider.otherwise('/');
            this.$stateProvider.state('main', {
                url: '/',
                templateUrl: './jarvis-frontend/modules/main/main.html',
                controller: 'mainCtrl as main',
                data: {
                    'css': './jarvis-frontend/modules/main/main.css'
                }
            }).state('main.hi', {
                templateUrl: './jarvis-frontend/modules/sayHi/hi.html',
                controller: 'hiCtrl as ctrl',
                params: {
                    extracted: {}
                }
            }).state('main.repeat', {
                templateUrl: './jarvis-frontend/modules/repeat/repeat.html',
                controller: 'repeatCtrl as ctrl',
                params: {
                    extracted: {}
                }
            }).state('main.help', {
                templateUrl: './jarvis-frontend/modules/help/help.html',
                controller: 'helpCtrl as ctrl'
            }).state('main.youtube', {
                controller: 'youtubeCtrl as ctrl',
                params: {
                    extracted: {}
                }
            }).state('main.learn', {
                templateUrl: './jarvis-frontend/modules/learn/learn.html',
                controller: 'learnCtrl as ctrl',
                params: {
                    extracted: {}
                }
            }).state('preferences', {
                templateUrl: './jarvis-frontend/preferences/preferences.html',
                controller: 'preferencesCtrl as prefs'
            }).state('auth', {
                templateUrl: './jarvis-frontend/auth/auth.html'
            });
        }
    }]);

    return Config;
}();

angular.module('Jarvis').config(function ($stateProvider, $urlRouterProvider) {
    return new Config($stateProvider, $urlRouterProvider);
});