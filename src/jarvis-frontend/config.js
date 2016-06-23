class Config {
    constructor($stateProvider, $urlRouterProvider) {
          this.$stateProvider = $stateProvider;
          this.$urlRouterProvider = $urlRouterProvider;
          this.setCoreRoutes();
    }

    setCoreRoutes() {
      console.log('setting core routes');
      this.$urlRouterProvider.otherwise('/');
      this.$stateProvider
          .state('main', {
              url: '/',
              templateUrl: './jarvis-frontend/core/main.html',
              controller: 'mainCtrl as main'
          })
          .state('main.hi', {
              templateUrl: './jarvis-frontend/modules/sayHi/hi.html',
              controller: 'hiCtrl as ctrl',
              params: {
                extracted: {}
              }
          })
          .state('main.repeat', {
              templateUrl: './jarvis-frontend/modules/repeat/repeat.html',
              controller: 'repeatCtrl as ctrl',
              params: {
                extracted: {}
              }
          })
          .state('main.help', {
              templateUrl: './jarvis-frontend/modules/help/help.html',
              controller: 'helpCtrl as ctrl'
          })
          .state('main.youtube', {
              controller: 'youtubeCtrl as ctrl',
              params: {
                extracted: {}
              }
          })
          .state('main.learn', {
              templateUrl: './jarvis-frontend/modules/learn/learn.html',
              controller: 'learnCtrl as ctrl',
              params: {
                extracted: {}
              }
          })
          .state('preferences', {
              templateUrl: './jarvis-frontend/preferences/preferences.html',
              controller: 'preferencesCtrl as prefs'
          })
          .state('auth', {
              templateUrl: './jarvis-frontend/auth/auth.html'
          });
    }
}

angular.module('Jarvis')
    .config(($stateProvider, $urlRouterProvider) => new Config($stateProvider, $urlRouterProvider));
