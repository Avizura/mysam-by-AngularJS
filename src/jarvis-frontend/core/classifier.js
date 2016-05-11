import natural from 'natural';
import db from 'diskdb';
import path from 'path';

class Classifier {
  constructor(Extractor) {
    this.threshold = 0.3;
    this.Extractor = Extractor;
    this.classifier = new natural.BayesClassifier();
    this.tokenizer = new natural.WordTokenizer();
    this.setup();
  }

  classify(input) {
    console.log(input);
    let classifications = this.classifier.getClassifications(input);
    let actionType, extracted;
    if(this.isRecognized(classifications)) {
      console.log('Classifications: ', classifications);
      actionType = classifications[0].label;
      console.log('class: ', actionType);
      let action = db.actions.find({type: actionType});
      console.log(action);
      let exampleWords = this.tokenizer.tokenize(action[0].text);
      let inputWords = this.tokenizer.tokenize(input);
      console.log(inputWords);
      extracted = this.Extractor.extract(exampleWords, action[0].tags, inputWords);
      console.log(extracted);
    } else {
      actionType = 'learn';
    }
    return {
      actionType,
      extracted
    }
  }

  isRecognized(classifications) {
      if(classifications[0].value > this.threshold && classifications[0].value > classifications[1].value)
          return true;
      return false;
  }

  add(action) {
    this.classifier.addDocument(action.text, action.type);
  }

  setup() {
    db.connect(path.join(__dirname, '/db-data'), ['actions']);
    db.actions.find().forEach(this.add.bind(this));
    this.classifier.train();
  }
}

angular.module('Jarvis')
  .service('Classifier', Classifier);
