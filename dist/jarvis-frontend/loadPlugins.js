'use strict';

var _child_process = require('child_process');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

var _remote = require('remote');

var _remote2 = _interopRequireDefault(_remote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _remote2.default.require('menu');

var ready = void 0;

angular.module('Jarvis').config(function ($stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, ClassifierProvider) {
    try {
        ready = _q2.default.nfcall(_child_process.exec, 'npm ls --depth=0 --parseable').then(function (response) {
            console.log(response);
            var modules = response.toString().trim().split('\n');
            modules.forEach(loadModule.bind(undefined));
        });
    } catch (e) {
        console.log(e);
    }

    function loadModule(modulePath) {
        try {
            var pkgPath = require.resolve(_path2.default.join(modulePath, 'package.json'));
            var pkg = require(pkgPath);
            var config = pkg.jarvis;
            if (!config) {
                // throw new Error(`${modulePath} is not a Jarvis plugin.`);
                return;
            }
            console.log('Found plugin ' + pkg.name);

            var pluginName = config.name;

            if (pkg.main) {
                var pluginController = require(modulePath);
                $controllerProvider.register(pluginName + 'Ctrl', pluginController);
            }

            if (config.server) {
                var serverPath = _path2.default.join(modulePath, config.server);
                var server = require(serverPath);
                //Learning
                server.actions.forEach(function (action) {
                    return ClassifierProvider.addPluginAction(action);
                });
                ClassifierProvider.addPluginDescription(server.description);
            } else {
                throw new Error('Server file in plugin ' + pluginName + ' doesnt exist!');
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
                    return $compileProvider.directive(directive.name, directive.fn);
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
                    return $filterProvider.register(filter.name, filter.fn);
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
                    return $provide.service(service.name, service.fn);
                });
            }

            $stateProvider.state('main.' + pluginName, {
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
}).run(function ($rootScope, $state, Classifier) {
    var off = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        event.preventDefault();
        ready.then(function () {
            off();
            Classifier.mergeActions();
            Classifier.mergeDescriptions();
            $state.go(toState.name, toParams);
        });
    });

    var template = [{
        label: 'Electron',
        submenu: [{
            label: 'About Electron',
            selector: 'orderFrontStandardAboutPanel:'
        }, {
            type: 'separator'
        }, {
            label: 'Preferences...',
            click: function click() {
                $state.go('preferences');
            }
        }, {
            label: 'Services',
            submenu: []
        }, {
            type: 'separator'
        }, {
            label: 'Hide Electron',
            accelerator: 'Command+H',
            selector: 'hide:'
        }, {
            label: 'Hide Others',
            accelerator: 'Command+Shift+H',
            selector: 'hideOtherApplications:'
        }, {
            label: 'Show All',
            selector: 'unhideAllApplications:'
        }, {
            type: 'separator'
        }, {
            label: 'Quit',
            accelerator: 'Command+Q',
            selector: 'terminate:'
        }]
    }, {
        label: 'Edit',
        submenu: [{
            label: 'Undo',
            accelerator: 'Command+Z',
            selector: 'undo:'
        }, {
            label: 'Redo',
            accelerator: 'Shift+Command+Z',
            selector: 'redo:'
        }, {
            type: 'separator'
        }, {
            label: 'Cut',
            accelerator: 'Command+X',
            selector: 'cut:'
        }, {
            label: 'Copy',
            accelerator: 'Command+C',
            selector: 'copy:'
        }, {
            label: 'Paste',
            accelerator: 'Command+V',
            selector: 'paste:'
        }, {
            label: 'Select All',
            accelerator: 'Command+A',
            selector: 'selectAll:'
        }]
    }, {
        label: 'View',
        submenu: [{
            label: 'Reload',
            accelerator: 'Command+R',
            click: function click() {
                _remote2.default.getCurrentWindow().reload();
            }
        }, {
            label: 'Toggle DevTools',
            accelerator: 'Alt+Command+I',
            click: function click() {
                _remote2.default.getCurrentWindow().toggleDevTools();
            }
        }]
    }, {
        label: 'Window',
        submenu: [{
            label: 'Minimize',
            accelerator: 'Command+M',
            selector: 'performMiniaturize:'
        }, {
            label: 'Close',
            accelerator: 'Command+W',
            selector: 'performClose:'
        }, {
            type: 'separator'
        }, {
            label: 'Bring All to Front',
            selector: 'arrangeInFront:'
        }]
    }, {
        label: 'Help',
        submenu: []
    }];

    var menu = Menu.buildFromTemplate(template);

    Menu.setApplicationMenu(menu);
});