angular.module('Jarvis')
    .config(($stateProvider, $urlRouterProvider, $locationProvider) => {
            $locationProvider.html5Mode(false);
            $urlRouterProvider.otherwise('/');
            // Now set up the states
            $stateProvider
                .state('main', {
                    url: '/',
                    // templateUrl: ''
                    // controller: 'mainCtrl'
                })
                .state('main.hi', {
                    url: '/action/hi',
                    templateUrl: 'jarvis-frontend/sayHi/hi.html',
                    controller: 'hiCtrl'
                })
                .state('main.replay', {
                    url: '/action/replay',
                    templateUrl: './ajarvis-frontend/replay/replay.html',
                    controller: 'replayCtrl'
                });
        });
