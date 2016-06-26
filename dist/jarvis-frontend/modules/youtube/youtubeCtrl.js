'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BrowserWindow = require('electron').remote.BrowserWindow;
//https://github.com/electron/electron/blob/master/docs/api/browser-window.md


var YouTube = function YouTube() {
  _classCallCheck(this, YouTube);

  var win = new BrowserWindow({ width: 800, height: 600, show: false });
  win.on('closed', function () {
    win = null;
  });
  win.loadURL('https://www.youtube.com/watch?v=psJpUPfAJDY');
  win.show();
};

angular.module('Jarvis').controller('youtubeCtrl', YouTube);