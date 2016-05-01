const SpeechRecognition = window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.mozSpeechRecognition ||
  window.msSpeechRecognition ||
  window.oSpeechRecognition;

export default class Recognizer {
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
      }
    }
  }

  toggle() {
    this.listening ? this.stop() : this.start();
  }

  start() {
    this.listening = true;
    this.recognition.start();
  }

  onEnd() {
    this.listening = false;
  }

  stop() {
    this.recognition.stop();
  }
}
