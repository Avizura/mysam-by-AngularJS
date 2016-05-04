angular.module('Jarvis')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: './jarvis-frontend/core/main.html',
                    controller: 'mainCtrl as ctrl'
                })
                .state('main.hi', {
                    templateUrl: './jarvis-frontend/modules/sayHi/hi.html',
                    controller: 'hiCtrl',
                    params: {
                      extracted: {}
                    }
                })
                .state('main.replay', {
                    templateUrl: './jarvis-frontend/modules/replay/replay.html',
                    controller: 'replayCtrl',
                    params: {
                      extracted: {}
                    }
                });
        });
