import natural from 'natural';
import db from 'diskdb';
import path from 'path';

function ClassifierProvider() {

  this.$get = function() {
      return new Classifier(Extractor);
  }

  let pluginActions = [];
  this.addPluginAction = (action) => {
      pluginActions.push(action);
  }

  let actionDescriptions = [];
  this.addDescription = (description) => {
      actionDescriptions.push(description);
  }

  class Classifier {
    constructor(Extractor) {
      console.log(Extractor);
      console.log('INSTANTIATED');
      this.threshold = 0.3;
      this.Extractor = new Extractor();
      this.classifier = new natural.LogisticRegressionClassifier();
      this.tokenizer = new natural.WordTokenizer();
      this.setup();
    }

    classify(input) {
      console.log(input);
      let classifications = this.classifier.getClassifications(input);
      console.log('Classifications: ', classifications);
      let actionType, extracted;
      if(this.isRecognized(classifications)) {
        actionType = classifications[0].label;
        console.log('class: ', actionType);
        // let action = db.actions.find({type: actionType});
        let action = this.actions.filter((action) => action.type == actionType);
        console.log(action);
        let exampleWords = this.tokenizer.tokenize(action[0].text);
        let inputWords = this.tokenizer.tokenize(input);
        console.log(inputWords);
        extracted = this.Extractor.extract(exampleWords, action[0].tags, inputWords);
        console.log(extracted);
      } else {
        actionType = 'learn';
        extracted = input;
      }
      return {
        actionType,
        extracted
      }
    }

    isRecognized(classifications) {
        if(classifications[0].value >= this.threshold && classifications[0].value > classifications[1].value)
            return true;
        return false;
    }

    addPluginsActions() {
      console.log('ACTIONS', pluginActions);
      this.actions = this.actions.concat(pluginActions);
      console.log('HEREEEE222', this.actions);
      this.actions.forEach(this.add.bind(this));
      this.classifier.train();
    }

    addDescriptions() {
      this.descriptions = this.descriptions.concat(actionDescriptions);
    }

    add(action) {
      this.classifier.addDocument(action.text, action.type);
    }

    setup() {
      db.connect(path.join(__dirname, '/db-data'), ['actions', 'descriptions']);
      this.actions = db.actions.find();
      console.log('HEREEEE', this.actions);
      this.descriptions = db.descriptions.find();
    }
  }
}

angular.module('Jarvis')
  .provider('Classifier', ClassifierProvider);
