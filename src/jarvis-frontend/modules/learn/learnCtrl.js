import db from 'diskdb';
import path from 'path';
import _ from 'lodash';

class Learn {
    constructor($scope, $stateParams, Classifier) {
        this.$scope = $scope;
        this.Classifier = Classifier;
        this.input = $stateParams["extracted"];
        this.words = $stateParams["extracted"].split(' ');
        this.data = [];
        this.words.forEach((word) => {
            this.data.push({
                word: word,
                selected: false
            });
        });
        this.actions = Classifier.descriptions;
        this.selectedAction = this.actions[0];
        this.$scope = $scope;

        $scope.keyPressed = 'no press :(';

        // For listening to a keypress event with a specific code
        $scope.$on('keypress:13', (onEvent, keypressEvent) => {
            this.learn();
        });
        $scope.$on('keypress:32', (onEvent, keypressEvent) => {
            $scope.main.toggle();
        });
    }

    select(item) {
        console.log(item);
        item.selected = !item.selected;
    }

    learn() {
        let tags = [];
        this.selectedAction.tags.forEach((tagLabel) => {
            let lastIndex = _.findLastIndex(this.data, {
                selected: true
            });
            let end = lastIndex !== this.data.length - 1 ? lastIndex : -1;
            tags.push({
                label: tagLabel,
                start: _.findIndex(this.data, {
                    selected: true
                }),
                end: end
            })
        });
        let action = {
            text: this.input,
            type: this.selectedAction.type,
            tags: tags
        };
        console.log(action);
        this.Classifier.trainClassifier(action);
        db.connect(path.join(__dirname, '/db-data'), ['actions']);
        db.actions.save(action);
        this.$scope.main.runAction(this.input);
    }

    selectEnd() {
        let index = _.findIndex(this.data, {
            selected: true
        });
        for (let i = index; i < this.data.length; i++) {
            this.data[i].selected = true;
        }
    }
}

angular.module('Jarvis')
    .controller('learnCtrl', Learn);
