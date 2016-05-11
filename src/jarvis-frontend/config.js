import {exec} from 'child_process';
import path from 'path';

class Config {
    constructor($stateProvider, $urlRouterProvider) {
          this.$stateProvider = $stateProvider;
          this.$urlRouterProvider = $urlRouterProvider;
          this.setCoreRoutes();
          // this.setPluginsRoutes();
    }

    setCoreRoutes() {
      console.log('setting core routes');
      this.$urlRouterProvider.otherwise('/');
      this.$stateProvider
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
          .state('main.repeat', {
              templateUrl: './jarvis-frontend/modules/repeat/repeat.html',
              controller: 'repeatCtrl',
              params: {
                extracted: {}
              }
          })
          .state('main.learn', {
              templateUrl: './jarvis-frontend/modules/learn/learn.html',
              controller: 'learnCtrl',
              params: {
                input: ''
              }
          })
          .state('preferences', {
              templateUrl: './jarvis-frontend/preferences/preferences.html',
              controller: 'preferencesCtrl as prefs'
          });
    }

    // setPluginsRoutes() {
    //   exec('npm ls --depth=0 --parseable', (err, out, code) => {
    //       if(err) {
    //           console.log(err);
    //       }
    //       let modules = out.toString().trim().split('\n');
    //       modules.forEach(this.loadModule.bind(this));
    //       console.log(modules);
    //   });
    // }
    //
    // loadModule(module) {
    //   try {
    //      let pkgPath = require.resolve(path.join(module, 'package.json'));
    //      let pkg = require(pkgPath);
    //      console.log(pkg);
    //      let config = pkg.jarvis;
    //      console.log(config);
    //      if(!config) {
    //        throw new Error(`${module} is not a Jarvis plugin.`);
    //      }
    //      console.log(`Found plugin ${pkg.name}`);
    //      let dirname = path.dirname(pkgPath);
    //      let pluginName = pkg.name;
    //      let pluginTemplate = path.join(dirname, config.template || '');
    //      let pluginController = require(module);
    //      console.log('PluginController: ', pluginController);
    //
    //      angular.module('Jarvis')
    //         .controller(`WeatherCtrl`, [pluginController]);
    //
    //      this.$stateProvider
    //         .state(`main.${pluginName}`, {
    //           templateUrl: pluginTemplate,
    //           controller: `WeatherCtrl`
    //         });
    //    } catch(e) {
    //      console.log(e);
    //     //  console.log(`${module} is not a Jarvis plugin.`);
    //    }
    // }
}

angular.module('Jarvis')
    .config(($stateProvider, $urlRouterProvider) => new Config($stateProvider, $urlRouterProvider));
