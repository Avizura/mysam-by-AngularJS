'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Preferences = function () {
    function Preferences($scope, $http, $state, Classifier) {
        var _this = this;

        _classCallCheck(this, Preferences);

        this.$scope = $scope;
        this.$http = $http;
        this.$stateProvider = $state;
        this.Classifier = Classifier;
        _q2.default.all([this.getInstalledModules(), this.getAvailableModules()]).then(function (response) {
            _this.plugins.forEach(_this.moduleIsInstalled.bind(_this));
            _this.$scope.$apply();
        });
        this.checkForUpdates();
    }

    _createClass(Preferences, [{
        key: 'getInstalledModules',
        value: function getInstalledModules() {
            var _this2 = this;

            return _q2.default.nfcall(_child_process.exec, 'npm ls --depth=0 --parseable').then(function (response) {
                _this2.installedModules = response.toString().trim().split('\n').map(function (module) {
                    return _path2.default.basename(module);
                });
            });
        }
    }, {
        key: 'getAvailableModules',
        value: function getAvailableModules() {
            var _this3 = this;

            return (0, _q2.default)(this.$http.get('https://registry.npmjs.org/-/_view/byKeyword?startkey=%5B%22jarvis-plugin%22%5D&endkey=%5B%22jarvis-plugin%22,%7B%7D%5D&group_level=3')).then(function (response) {
                console.log(response.data);
                _this3.plugins = response.data.rows;
                return response;
            });
        }
    }, {
        key: 'enableModule',
        value: function enableModule(moduleName) {
            var modulePath = _path2.default.join(__dirname, 'node_modules', moduleName);
            this.loadModule(modulePath);
        }
    }, {
        key: 'disableModule',
        value: function disableModule(moduleName) {
            stateProvider.removeState(moduleName);
        }
    }, {
        key: 'checkForUpdates',
        value: function checkForUpdates() {
            this.getAvailableModules().then(function (response) {
                response.data.rows.forEach(function (module) {
                    return (0, _child_process.exec)('npm outdated ' + module.key[1], function (err, data) {
                        if (data) {
                            console.log(data);
                            // data.split.
                        }
                    });
                });
            });
            // exec('npm outdated', (err ,data) => {
            //     console.log(data);
            // });
        }
    }, {
        key: 'updateAll',
        value: function updateAll() {
            (0, _child_process.exec)('npm update', function (err, data) {});
        }
    }, {
        key: 'updateModule',
        value: function updateModule(moduleName) {
            (0, _child_process.exec)('npm update ' + moduleName, function (err, data) {});
        }
    }, {
        key: 'moduleIsInstalled',
        value: function moduleIsInstalled(module) {
            var moduleName = module.key[1];
            module.isInstalled = this.installedModules.indexOf(moduleName) == -1 ? false : true;
        }
    }, {
        key: 'installModule',
        value: function installModule(plugin) {
            var _this4 = this;

            var moduleName = plugin.key[1];
            (0, _child_process.exec)('npm install ' + moduleName + ' --save', function (err, data) {
                console.log('Plugin ' + moduleName + ' has been installed');
                _this4.enableModule(moduleName);
            });
        }
    }, {
        key: 'loadModules',
        value: function loadModules() {
            var _this5 = this;

            (0, _child_process.exec)('npm ls --depth=0 --parseable', function (err, out, code) {
                if (err) {
                    console.log(err);
                }
                _this5.installedModules = out.toString().trim().split('\n');
                _this5.installedModules.forEach(_this5.loadModule.bind(_this5));
            });
        }
    }, {
        key: 'loadModule',
        value: function loadModule(modulePath) {
            var _this6 = this;

            try {
                var pkgPath = require.resolve(_path2.default.join(modulePath, 'package.json'));
                var pkg = require(pkgPath);
                var config = pkg.jarvis;
                if (!config) {
                    throw new Error(module + ' is not a Jarvis plugin.');
                    return;
                }
                console.log('Loading plugin ' + pkg.name);

                var pluginName = config.name;

                if (pkg.main) {
                    var pluginController = require(modulePath);
                    controllerProvider.register(pluginName + 'Ctrl', pluginController);
                }

                if (config.server) {
                    var serverPath = _path2.default.join(modulePath, config.server);
                    var server = require(serverPath);
                    //Learning
                    server.actions.forEach(function (action) {
                        return _this6.Classifier.trainAction(action);
                    });
                    this.Classifier.addPluginDescription(server.description);
                } else {
                    throw new Error('Server file doesnt exist!');
                }

                if (config.template) {
                    var pluginTemplate = _path2.default.join(modulePath, config.template);
                }

                if (config.styles) {
                    var styles = config.styles.map(function (stylePath) {
                        return _path2.default.join(modulePath, stylePath);
                    });
                }

                if (config.directives) {
                    var directivesPath = config.directives.map(function (directivePath) {
                        return _path2.default.join(modulePath, directivePath);
                    });
                    var directives = directivesPath.map(function (directivePath) {
                        return require(directivePath);
                    });
                    directives.forEach(function (directive) {
                        return compileProvider.directive(directive.name, directive.fn);
                    });
                }

                if (config.filters) {
                    var filtersPath = config.filters.map(function (filterPath) {
                        return _path2.default.join(modulePath, filterPath);
                    });
                    var filters = filtersPath.map(function (filterPath) {
                        return require(filterPath);
                    });
                    filters.forEach(function (filter) {
                        return filterProvider.register(filter.name, filter.fn);
                    });
                }

                if (config.services) {
                    var servicesPath = config.services.map(function (servicePath) {
                        return _path2.default.join(modulePath, servicePath);
                    });
                    var services = servicesPath.map(function (servicePath) {
                        return require(servicePath);
                    });
                    services.forEach(function (service) {
                        return provide.service(service.name, service.fn);
                    });
                }

                stateProvider.state('main.' + pluginName, {
                    controller: pluginName + 'Ctrl as ctrl',
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
    }]);

    return Preferences;
}();

angular.module('Jarvis').controller('preferencesCtrl', Preferences);