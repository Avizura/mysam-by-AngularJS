import Bus from './jarvis-frontend/core/bus.js';
import path from 'path';
import remote from 'remote';
const Menu = remote.require('menu');

//watch(recogizer.listening?)

class Jarvis {
    constructor($scope, $state, Recognizer, Classifier) {
        this.addPreferencesToMenu();
        this.$state = $state;
        this.asd = 'Of';
        Bus.when('recognitionOn')
            .then(() => {
                this.asd = 'On';
                Recognizer.start();
            });
        Bus.when('recognitionOf')
            .then(() => {
                this.asd = 'Of';
                // $scope.$apply();
                Recognizer.stop();
            });
        Bus.when('transcript')
            .then((event) => {
                $scope.input = event.value;
                let classification = Classifier.classify(event.value);
                let actionType = classification.actionType;
                let extracted = classification.extracted;
                console.log(actionType);
                try {
                    $state.go(`main.${actionType}`, {extracted});
                } catch (e) {
                    console.log(e);
                }
            });
    }

    toggle() {
        if (this.asd == 'Of') {
            Bus.publish({
                name: 'recognitionOn'
            });
        } else {
            Bus.publish({
                name: 'recognitionOf'
            });
        }
    }

    addPreferencesToMenu() {
      let template = [
        {
          label: 'Electron',
          submenu: [
            {
              label: 'About Electron',
              selector: 'orderFrontStandardAboutPanel:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Preferences...',
              click: () => {
                this.$state.go('preferences');
              }
            },
            {
              label: 'Services',
              submenu: []
            },
            {
              type: 'separator'
            },
            {
              label: 'Hide Electron',
              accelerator: 'Command+H',
              selector: 'hide:'
            },
            {
              label: 'Hide Others',
              accelerator: 'Command+Shift+H',
              selector: 'hideOtherApplications:'
            },
            {
              label: 'Show All',
              selector: 'unhideAllApplications:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit',
              accelerator: 'Command+Q',
              selector: 'terminate:'
            },
          ]
        },
        {
          label: 'Edit',
          submenu: [
            {
              label: 'Undo',
              accelerator: 'Command+Z',
              selector: 'undo:'
            },
            {
              label: 'Redo',
              accelerator: 'Shift+Command+Z',
              selector: 'redo:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Cut',
              accelerator: 'Command+X',
              selector: 'cut:'
            },
            {
              label: 'Copy',
              accelerator: 'Command+C',
              selector: 'copy:'
            },
            {
              label: 'Paste',
              accelerator: 'Command+V',
              selector: 'paste:'
            },
            {
              label: 'Select All',
              accelerator: 'Command+A',
              selector: 'selectAll:'
            }
          ]
        },
        {
          label: 'View',
          submenu: [
            {
              label: 'Reload',
              accelerator: 'Command+R',
              click: function() { remote.getCurrentWindow().reload(); }
            },
            {
              label: 'Toggle DevTools',
              accelerator: 'Alt+Command+I',
              click: function() { remote.getCurrentWindow().toggleDevTools(); }
            },
          ]
        },
        {
          label: 'Window',
          submenu: [
            {
              label: 'Minimize',
              accelerator: 'Command+M',
              selector: 'performMiniaturize:'
            },
            {
              label: 'Close',
              accelerator: 'Command+W',
              selector: 'performClose:'
            },
            {
              type: 'separator'
            },
            {
              label: 'Bring All to Front',
              selector: 'arrangeInFront:'
            }
          ]
        },
        {
          label: 'Help',
          submenu: []
        }
      ];

      let menu = Menu.buildFromTemplate(template);

      Menu.setApplicationMenu(menu);
    }
}

angular.module('Jarvis')
    .controller('mainCtrl', Jarvis);
