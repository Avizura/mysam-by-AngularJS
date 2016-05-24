const {BrowserWindow} = require('electron').remote;
//https://github.com/electron/electron/blob/master/docs/api/browser-window.md
class YouTube {
    constructor() {
      let win = new BrowserWindow({width: 800, height: 600, show: false});
      win.on('closed', () => {
        win = null;
      });
      win.loadURL('https://www.youtube.com/watch?v=psJpUPfAJDY');
      win.show();
    }
}

angular.module('Jarvis')
    .controller('youtubeCtrl', YouTube);
