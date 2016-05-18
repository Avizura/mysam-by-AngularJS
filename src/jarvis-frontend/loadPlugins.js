import { exec } from 'child_process';
import path from 'path';
import Q from 'q';

let ready;

angular.module('Jarvis')
    .config(($stateProvider, $controllerProvider, ClassifierProvider) => {

        ready = Q.nfcall(exec, 'npm ls --depth=0 --parseable')
            .then((response) => {
                let modules = response.toString().trim().split('\n');
                modules.forEach(loadModule.bind(this));
            });


        function loadModule(module) {
            try {
                let pkgPath = require.resolve(path.join(module, 'package.json'));
                let pkg = require(pkgPath);
                let config = pkg.jarvis;
                if (!config) {
                    // throw new Error(`${module} is not a Jarvis plugin.`);
                    return;
                }
                console.log(`Found plugin ${pkg.name}`);
                let dirname = path.dirname(pkgPath);
                let pluginName = config.name;
                let pluginTemplate = path.join(dirname, config.template || '');
                let pluginController = require(module);
                console.log('PluginController: ', pluginController);
                let serverPath = path.join(dirname, config.server);
                let server = require(serverPath);
                let styles = path.join(dirname, config.styles);
                console.log(styles);
                server.actions.forEach((action) => ClassifierProvider.addPluginAction(action));
                ClassifierProvider.addDescription(server.description);
                $controllerProvider.register(`${pluginName}Ctrl`, pluginController);
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
                Classifier.addPluginsActions();
                Classifier.addDescriptions();
                // Classifier.classify('What is the weather  in London');
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
