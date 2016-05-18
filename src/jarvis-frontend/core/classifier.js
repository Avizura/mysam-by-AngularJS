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
      console.log(this.classifier);
      console.log(input);
      let classifications = this.classifier.getClassifications(input);
      console.log('Classifications: ', classifications);
      let actionType;
      let extracted = [];
      let inputWords = this.tokenizer.tokenize(input);

      if(this.isRecognized(classifications)) {
        actionType = classifications[0].label;
        console.log('class: ', actionType);
        let actions = this.actions.filter((action) => action.type == actionType);
        actions.forEach((action) => {
            let exampleWords = this.tokenizer.tokenize(action.text);
            extracted.push(this.Extractor.extract(exampleWords, action.tags, inputWords));
        })
        extracted = extracted.filter(item => !!item)[0];
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
      this.actions.forEach(action => this.classifier.addDocument(action.text, action.type));
      this.classifier.train();
    }

    addDescriptions() {
      this.descriptions = this.descriptions.concat(actionDescriptions);
    }

    trainClassifier(action) {
      this.actions.push(action);
      this.classifier.addDocument(action.text, action.type);
      this.classifier.train();
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
