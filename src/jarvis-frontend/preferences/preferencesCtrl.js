import { exec } from 'child_process';
import path from 'path';
import Q from 'q';

class Preferences {

  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    Q.all([this.getInstalledModules(), this.getAvailableModules()])
      .then( (response) => {
        this.plugins.forEach(this.moduleIsInstalled.bind(this));
        this.$scope.$apply();
      });
  }

  getInstalledModules() {
    return Q.nfcall(exec, 'npm ls --depth=0 --parseable')
        .then( (response) => {
            this.installedModules = response.toString().trim().split('\n').map((module) => path.basename(module));
        });
  }

  getAvailableModules() {
    return Q(this.$http.get('https://registry.npmjs.org/-/_view/byKeyword?startkey=%5B%22jarvis-plugin%22%5D&endkey=%5B%22jarvis-plugin%22,%7B%7D%5D&group_level=3'))
        .then((response) => {
            this.plugins = response.data.rows;
        });
  }

  moduleIsInstalled(module) {
      let moduleName = module.key[1];
      module.isInstalled = this.installedModules.indexOf(moduleName) == -1? false : true;
  }

  installModule(plugin) {
    exec(`npm install ${plugin.key[1]} --save`, (err, data, lol) => {
      console.log(err);
      console.log(data);
      console.log(lol);
      console.log(`Plugin ${plugin.key[1]} has been installed`);
      console.log(__dirname);
      this.loadModules();
      console.log(plugin);
    });
  }

  loadModules() {
    exec('npm ls --depth=0 --parseable', (err, out, code) => {
        if(err) {
            console.log(err);
        }
        this.installedModules = out.toString().trim().split('\n');
        this.installedModules.forEach(this.loadModule.bind(this));
    });
  }

  loadModule(moduleName) {
    try {
       console.log('name: ', moduleName);
       let pkgPath = require.resolve(path.join(moduleName, 'package.json'));
       console.log(pkgPath);
       let pkg = require(pkgPath);
       console.log(pkg);
       let config = pkg.mysam;

       if(!config) {
         throw new Error(`${moduleName} is not a Mysam plugin.`);
       }

       console.log(`Found plugin ${pkg.name}`);

       let dirname = path.dirname(pkgPath);
       let staticPath = path.join(dirname, config.public || '.');


     } catch(e) {
       console.log(`${moduleName} is not a Mysam plugin.`);
     }
  }
}

angular.module('Jarvis')
    .controller('preferencesCtrl', ($scope, $http) => new Preferences($scope, $http));
