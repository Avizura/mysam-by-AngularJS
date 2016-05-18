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
          this.data.push({word: word, selected: false});
      });
      this.actions = Classifier.descriptions;
      this.selectedAction = this.actions[0];
      this.$scope = $scope;
    }

    select(item) {
      console.log(item);
      item.selected = !item.selected;
    }

    onClick() {
        let tags = [];
        this.selectedAction.tags.forEach((tag) => {
            tags.push({
              label: tag,
              start: _.findIndex(this.data, {selected: true}),
              end: -1
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
}

angular.module('Jarvis')
    .controller('learnCtrl', Learn);
