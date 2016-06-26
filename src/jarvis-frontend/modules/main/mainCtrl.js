import Bus from './jarvis-frontend/core/bus.js';

class Main {
    constructor($scope, $state, Recognizer, Classifier) {
        this.$scope = $scope;
        this.$state = $state;
        this.Recognizer = Recognizer;
        this.Recognizer.recognition.onend = () => {
            this.recognition = false;
            $scope.$apply();
        };
        this.Classifier = Classifier;
        this.recognition = false;
        this.langs = Recognizer.getLangs();
        //russian language by default
        this.selectedLang = this.langs.filter(lang => lang.value === 'ru-Ru')[0].value;
        $scope.$watch('main.selectedLang', (lang) => Recognizer.selectLang(lang));

        $scope.$on('keypress:13', (onEvent, keypressEvent) => {
            this.runAction(this.input);
        });
        $scope.$on('keypress:32', (onEvent, keypressEvent) => {
            if(keypressEvent.ctrlKey) {
                $scope.main.toggle();
                this.$scope.$apply();
            }
        });

        Bus.when('transcript')
            .then((event) => this.runAction(event.value));
    }


    runAction() {
        if (!this.input)
            return; //error msg here
        let classification = this.Classifier.classify(this.input);
        let actionType = classification.actionType;
        let extracted = classification.extracted;
        console.log(actionType);
        try {
            this.$state.go(`main.${actionType}`, {
                extracted
            });
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
    .controller('mainCtrl', Main);
