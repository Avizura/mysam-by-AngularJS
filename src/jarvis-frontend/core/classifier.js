import natural from 'natural';
import db from 'diskdb';
import path from 'path';

class Classifier {
  constructor(Extractor) {
    this.Extractor = Extractor;
    this.classifier = new natural.BayesClassifier();
    this.tokenizer = new natural.WordTokenizer();
    this.setup();
  }

  classify(input) {
    console.log(input);
    let actionType = this.classifier.classify(input);
    console.log('class: ', actionType);
    let action = db.actions.find({type: actionType});
    console.log(action);
    let exampleWords = this.tokenizer.tokenize(action[0].text);
    let inputWords = this.tokenizer.tokenize(input);
    console.log(inputWords);
    let extracted = this.Extractor.extract(exampleWords, action[0].tags, inputWords);
    console.log(extracted);
    return {
      actionType,
      extracted
    }
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
  .service('Classifier', (Extractor) => new Classifier(Extractor));
