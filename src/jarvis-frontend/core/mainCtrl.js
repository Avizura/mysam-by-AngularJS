import Bus from './jarvis-frontend/core/bus.js';
import path from 'path';
import remote from 'remote';
const Menu = remote.require('menu');

class Jarvis {
    constructor($scope, $state, Recognizer, Classifier) {
        console.log(Classifier);
        console.log('MAINCTRL STARTED');
        this.$state = $state;
        this.Recognizer = Recognizer;
        this.Recognizer.recognition.onend = () => {
          this.asd = 'Of';
          $scope.$apply();
          console.log("ONEND");
        };
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
            // Bus.publish({
            //     name: 'recognitionOn'
            // });
            this.asd = 'On';
            this.Recognizer.start();
        } else {
            this.asd = 'Of';
            // $scope.$apply();
            this.Recognizer.stop();
        }
    }
}

angular.module('Jarvis')
    .controller('mainCtrl', Jarvis);
