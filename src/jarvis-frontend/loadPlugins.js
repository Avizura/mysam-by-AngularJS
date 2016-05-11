import { exec } from 'child_process';
import path from 'path';

function setPluginsRoutes() {
    angular.module('Jarvis')
        .config(($stateProvider, $controllerProvider) => {
            exec('npm ls --depth=0 --parseable', (err, out, code) => {
                if (err) {
                    console.log(err);
                }
                let modules = out.toString().trim().split('\n');
                modules.forEach(loadModule.bind(this));
            });


            function loadModule(module) {
                try {
                    let pkgPath = require.resolve(path.join(module, 'package.json'));
                    let pkg = require(pkgPath);
                    let config = pkg.jarvis;
                    if (!config) {
                        throw new Error(`${module} is not a Jarvis plugin.`);
                        return;
                    }
                    console.log(`Found plugin ${pkg.name}`);
                    let dirname = path.dirname(pkgPath);
                    let pluginName = pkg.name;
                    let pluginTemplate = path.join(dirname, config.template || '');
                    let pluginController = require(module);
                    console.log('PluginController: ', pluginController);
                    let serverPath = path.join(dirname, 'server.js');
                    let server = require(serverPath);
                    console.log('Server: ', server);
                    $controllerProvider.register(`${pluginName}Ctrl`, pluginController);
                    $stateProvider
                        .state(`main.${pluginName}`, {
                            templateUrl: pluginTemplate,
                            controller: `${pluginName}Ctrl as ctrl`
                        });
                } catch (e) {
                    console.log(e);
                }
            }
        })
}

setPluginsRoutes();
