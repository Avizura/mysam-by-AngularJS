import { exec } from 'child_process';
import path from 'path';

class Preferences {
  constructor($scope, $http) {
    this.$scope = $scope;
    this.$http = $http;
    $http.get('https://registry.npmjs.org/-/_view/byKeyword?startkey=%5B%22mysam-plugin%22%5D&endkey=%5B%22mysam-plugin%22,%7B%7D%5D&group_level=3')
        .then((response) => {
            console.log('PREFERENCES');
            console.log(response.data);
            this.plugins = response.data.rows;
        });
    // q.nfcall(exec, 'npm')
    exec('npm ls --depth=0 --parseable', (err, out, code) => {
        if(err) {
            console.log(err);
        }
        let modules = out.toString().trim().split('\n');
        modules.forEach(this.loadModule.bind(this));
        console.log(modules);
    })
  }

  installModule() {
    //узнать установлен ли уже плагин??????????????
    exec(`npm install ${pkg.key[1]} --save`, function(){
      console.log(`installed package ${pkg.key[1]}`);
    })
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

       console.log(`Setting up ${staticPath} at /${pkg.name}`);

      //  app.use(`/${pkg.name}`, feathers.static(staticPath));

      //  return Q.ninvoke(plugins, 'create', pkg)
      //    .then(() => {
      //      let pluginLoader = require(moduleName);
      //      pluginLoader(app);
      //    });
     } catch(e) {
       console.log(`${moduleName} is not a Mysam plugin.`);
     }

  }

}

angular.module('Jarvis')
    .controller('preferencesCtrl', ($scope, $http) => new Preferences($scope, $http));
