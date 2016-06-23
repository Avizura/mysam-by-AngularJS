import Bus from './jarvis-frontend/core/bus.js';

class Synthesizer {
    constructor() {
        this.voices = speechSynthesis.getVoices();
    }

    speak(text, lang, volume, rate, pitch) {
      // Create a new instance of SpeechSynthesisUtterance.
    	var msg = new SpeechSynthesisUtterance();

      // Set the text.
    	msg.text = text;
      // Set the attributes.
      msg.lang = lang || 'ru-Ru';
    	msg.volume = volume || 1;
    	msg.rate = rate || 1;
    	msg.pitch = pitch || 1;

      msg.onend = Bus.publish({
          name: 'synthesisOf'
      });

      msg.onerror = Bus.publish({
          name: 'synthesisError'
      });

      // Queue this utterance.
    	speechSynthesis.speak(msg);
    }
}

angular.module('Jarvis')
  .service('Synthesizer', Synthesizer);
