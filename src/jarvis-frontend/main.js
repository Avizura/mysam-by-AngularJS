import remote from 'remote';
const Menu = remote.require('menu');
import path from 'path';
import Jarvis from './jarvis.js';

const jarvis = window.jarvis = new Jarvis();

// $('body').on('submit', 'form', function (ev) {
//   ev.preventDefault();
// });
//
// $(document).on('keydown', null, 'ctrl+space', function() {
//   sam.recognizer.toggle();
// });
//
// $(document).on('keydown', null, 'ctrl+return', function() {
//   element.find('form').submit();
// });

var template = [
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
        label: 'Preferences...'
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

let btn = document.getElementById('start');
btn.addEventListener('click', () => {
  let recognition = new webkitSpeechRecognition();
  recognition.onresult = (event) => {
    console.log(event.results[0][0]);
    document.getElementById('output').innerHTML = capitalize(event.results[0][0].transcript);
  }
  recognition.start();
});

// const base = path.join(__dirname, '..', 'node_modules/natural/lib');
// console.log(base);
// const Tagger = require(base + "/natural").BrillPOSTagger;
//
// var base_folder = path.join(base, "/natural/brill_pos_tagger");
// console.log(base_folder);
// var rules_file = base_folder + "/data/tr_from_posjs.txt";
// var lexicon_file = base_folder + "/data/lexicon_from_posjs.json";
// var default_category = 'N';
//
// var tagger = new Tagger(lexicon_file, rules_file, default_category, function(error) {
//   if (error) {
//     console.log(error);
//   }
//   else {
//     var sentence = ["I", "see", "the", "man", "with", "the", "telescope"];
//     console.log(JSON.stringify(tagger.tag(sentence)));
//   }
// });


// try{
//   let package = require.resolve('mysam-weather/package.json');
//   console.log(package);
// } catch(e){
//   console.log('FREEZY');
// }
