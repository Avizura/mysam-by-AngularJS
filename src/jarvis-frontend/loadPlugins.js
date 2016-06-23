import { exec } from 'child_process';
import path from 'path';
import Q from 'q';
import remote from 'remote';
const Menu = remote.require('menu');

let ready;

angular.module('Jarvis')
    .config(($stateProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, ClassifierProvider) => {
        try {
            ready = Q.nfcall(exec, 'npm ls --depth=0 --parseable')
                .then((response) => {
                    console.log(response);
                    let modules = response.toString().trim().split('\n');
                    modules.forEach(loadModule.bind(this));
                });
        } catch(e) {
            console.log(e);
        }

        function loadModule(modulePath) {
            try {
                let pkgPath = require.resolve(path.join(modulePath, 'package.json'));
                let pkg = require(pkgPath);
                let config = pkg.jarvis;
                if (!config) {
                    // throw new Error(`${modulePath} is not a Jarvis plugin.`);
                    return;
                }
                console.log(`Found plugin ${pkg.name}`);

                let pluginName = config.name;

                if(pkg.main) {
                    let pluginController = require(modulePath);
                    $controllerProvider.register(`${pluginName}Ctrl`, pluginController);
                }

                if(config.server) {
                    let serverPath = path.join(modulePath, config.server);
                    let server = require(serverPath);
                    //Learning
                    server.actions.forEach((action) => ClassifierProvider.addPluginAction(action));
                    ClassifierProvider.addPluginDescription(server.description);
                } else {
                  throw new Error(`Server file in plugin ${pluginName} doesnt exist!`);
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
                    directives.forEach((directive) => $compileProvider.directive(directive.name, directive.fn));
                }

                if(config.filters) {
                    let filtersPath = config.filters.map((filterPath) => path.join(modulePath, filterPath));
                    let filters = filtersPath.map((filterPath) => require(filterPath));
                    filters.forEach((filter) => $filterProvider.register(filter.name, filter.fn))
                }

                if(config.services) {
                    let servicesPath = config.services.map((servicePath) => path.join(modulePath, servicePath));
                    let services = servicesPath.map((servicePath) => require(servicePath));
                    services.forEach((service) => $provide.service(service.name, service.fn));
                }

                $stateProvider
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
    })
    .run(($rootScope, $state, Classifier) => {
        let off = $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
            event.preventDefault();
            ready.then(() => {
                off();
                Classifier.mergeActions();
                Classifier.mergeDescriptions();
                $state.go(toState.name, toParams);
            });
        });

        let template = [{
            label: 'Electron',
            submenu: [{
                label: 'About Electron',
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                type: 'separator'
            }, {
                label: 'Preferences...',
                click: () => {
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
            }, ]
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
                click: function() {
                    remote.getCurrentWindow().reload();
                }
            }, {
                label: 'Toggle DevTools',
                accelerator: 'Alt+Command+I',
                click: function() {
                    remote.getCurrentWindow().toggleDevTools();
                }
            }, ]
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

        let menu = Menu.buildFromTemplate(template);

        Menu.setApplicationMenu(menu);
    });
