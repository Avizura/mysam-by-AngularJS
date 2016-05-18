import Bus from './jarvis-frontend/core/bus.js';
import path from 'path';
import remote from 'remote';
const Menu = remote.require('menu');

class Jarvis {
    constructor($scope, $state, Recognizer, Classifier) {
        this.$state = $state;
        this.Recognizer = Recognizer;
        this.Recognizer.recognition.onend = () => {
          this.recognition = false;
          $scope.$apply();
          console.log("ONEND");
        };
        this.Classifier = Classifier;
        this.recognition = false;

        Bus.when('transcript')
            .then((event) => this.runAction(event.value));
    }

    runAction(input) {
      let classification = this.Classifier.classify(input);
      let actionType = classification.actionType;
      let extracted = classification.extracted;
      console.log(actionType);
      try {
          this.$state.go(`main.${actionType}`, {extracted});
      } catch (e) {
          console.log(e);
      }
    }

    toggle() {
        this.recognition = !this.recognition;
        if (this.recognition) {
            this.Recognizer.start();
        } else {
            this.Recognizer.stop();
        }
    }
}

angular.module('Jarvis')
    .controller('mainCtrl', Jarvis);
