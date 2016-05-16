import Bus from './jarvis-frontend/core/bus.js';

const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition;

class Recognizer {
  constructor() {
    this.listening = false;
    this.transcript = '';
    this.recognition = new SpeechRecognition();
    this.recognition.onresult = this.result.bind(this);
    this.recognition.onend = this.onEnd.bind(this);
  }

  result(event) {
    if (event.results.length > 0) {
      let transcripts = event.results[event.results.length-1];
      if(transcripts.isFinal) {
        this.transcript = transcripts[0].transcript;
        this.stop();
        console.log('Trascript');
        Bus.publish({
          name: 'transcript',
          value: this.transcript
        });
      }
    }
  }

  toggle() {
    this.listening ? this.stop() : this.start();
  }

  start() {
    this.listening = true;
    console.log('Started!');
    this.recognition.start();
  }

  onEnd() {
    console.log('onEnd');
    this.listening = false;
    // Bus.publish({
    //     name: 'recognitionOf'
    // });
  }

  stop() {
    console.log('stopped!');
    this.recognition.stop();
  }
}

angular.module('Jarvis')
  .service('Recognizer', Recognizer);
