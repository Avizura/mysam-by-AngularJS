import Bus from './jarvis-frontend/core/bus.js';

class Jarvis {
    constructor($scope, $state, Recognizer, Classifier) {
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
}

angular.module('Jarvis')
    .controller('mainCtrl', ($scope, $state, Recognizer, Classifier) => new Jarvis($scope, $state, Recognizer, Classifier));
