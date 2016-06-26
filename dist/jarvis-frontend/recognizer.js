'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition || window.oSpeechRecognition;

var Recognizer = function () {
  function Recognizer() {
    _classCallCheck(this, Recognizer);

    this.listening = false;
    this.transcript = '';
    this.recognition = new SpeechRecognition();
    this.recognition.onresult = this.result.bind(this);
    this.recognition.onend = this.onEnd.bind(this);
  }

  _createClass(Recognizer, [{
    key: 'result',
    value: function result(event) {
      if (event.results.length > 0) {
        var transcripts = event.results[event.results.length - 1];
        if (transcripts.isFinal) {
          this.transcript = transcripts[0].transcript;
          this.stop();
        }
      }
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      this.listening ? this.stop() : this.start();
    }
  }, {
    key: 'start',
    value: function start() {
      this.listening = true;
      this.recognition.start();
    }
  }, {
    key: 'onEnd',
    value: function onEnd() {
      this.listening = false;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.recognition.stop();
    }
  }]);

  return Recognizer;
}();

exports.default = Recognizer;