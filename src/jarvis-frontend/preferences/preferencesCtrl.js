import { exec } from 'child_process';
import path from 'path';
import Q from 'q';

class Preferences {

    constructor($scope, $http, Classifier) {
        this.$scope = $scope;
        this.$http = $http;
        this.Classifier = Classifier;
        Q.all([this.getInstalledModules(), this.getAvailableModules()])
            .then((response) => {
                this.plugins.forEach(this.moduleIsInstalled.bind(this));
                this.$scope.$apply();
            });
    }

    getInstalledModules() {
        return Q.nfcall(exec, 'npm ls --depth=0 --parseable')
            .then((response) => {
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
        module.isInstalled = this.installedModules.indexOf(moduleName) == -1 ? false : true;
    }

    installModule(plugin) {
        let moduleName = plugin.key[1];
        console.log(__dirname);
        exec(`npm install ${moduleName} --save`, (err, data) => {
            console.log(`Plugin ${moduleName} has been installed`);
            let modulePath = path.join(__dirname, 'node_modules', moduleName)
            console.log(modulePath);
            console.log(typeof(modulePath));
            this.loadModule(modulePath);
        });
    }

    loadModules() {
        exec('npm ls --depth=0 --parseable', (err, out, code) => {
            if (err) {
                console.log(err);
            }
            this.installedModules = out.toString().trim().split('\n');
            this.installedModules.forEach(this.loadModule.bind(this));
        });
    }

    loadModule(modulePath) {
        try {
            let pkgPath = require.resolve(path.join(modulePath, 'package.json'));
            let pkg = require(pkgPath);
            let config = pkg.jarvis;
            if (!config) {
                throw new Error(`${module} is not a Jarvis plugin.`);
                return;
            }
            console.log(`Loading plugin ${pkg.name}`);

            let pluginName = config.name;

            if(pkg.main) {
                let pluginController = require(modulePath);
                controllerProvider.register(`${pluginName}Ctrl`, pluginController);
            }

            if(config.server) {
                let serverPath = path.join(modulePath, config.server);
                let server = require(serverPath);
                //Learning
                server.actions.forEach((action) => this.Classifier.trainAction(action));
                this.Classifier.addPluginDescription(server.description);
            } else {
              throw new Error('Server file doesnt exist!');
            }

            if(config.template) {
                var pluginTemplate = path.join(modulePath, config.template);
            }

            if(config.styles) {
                var styles = config.styles.map((stylePath) => path.join(modulePath, stylePath));
            }

            if(config.directives) {
                let directivesPath = config.directives.map((directivePath) => path.join(modulePath, directivePath));
                let directives = directivesPath.map((directivePath) => require(directivePath));
                directives.forEach((directive) => compileProvider.directive(directive.name, directive.fn));
            }

            if(config.filters) {
                let filtersPath = config.filters.map((filterPath) => path.join(modulePath, filterPath));
                let filters = filtersPath.map((filterPath) => require(filterPath));
                filters.forEach((filter) => filterProvider.register(filter.name, filter.fn))
            }

            if(config.services) {
                let servicesPath = config.services.map((servicePath) => path.join(modulePath, servicePath));
                let services = servicesPath.map((servicePath) => require(servicePath));
                services.forEach((service) => provide.service(service.name, service.fn));
            }

            stateProvider
                .state(`main.${pluginName}`, {
                    controller: `${pluginName}Ctrl as ctrl`,
                    templateUrl: pluginTemplate,
                    data: {
                        'css': styles
                    },
                    params: {
                        extracted: {}
                    }
                });
        } catch (e) {
            console.log(e);
        }
    }
}

angular.module('Jarvis')
    .controller('preferencesCtrl', ($scope, $http, Classifier) => new Preferences($scope, $http, Classifier));
