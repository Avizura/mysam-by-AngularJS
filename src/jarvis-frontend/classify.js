import natural from 'natural';
import db from 'diskdb';
import path from 'path';
import pos from 'pos';

export default class Classifier {
  constructor() {
    var words = new pos.Lexer().lex('This is some sample text. This text can contain multiple sentences.');
    console.log(words);
    var tagger = new pos.Tagger();
    var taggedWords = tagger.tag(words);
    console.log(taggedWords);
    for (let i in taggedWords) {
        var taggedWord = taggedWords[i];
        var word = taggedWord[0];
        var tag = taggedWord[1];
        console.log(word + " /" + tag);
    }

    this.natural = natural;
    this.classifier = new natural.BayesClassifier();
    this.setup();
  }

  add(action) {
    this.classifier.addDocument(action.text, action.type);
  }

  setup() {
    db.connect(path.join(__dirname, '..', '/db-data'), ['actions']);
    db.actions.find().forEach(this.add.bind(this));
    this.classifier.train();
    console.log(this.classifier.classify('Can you tell me the weather in Turkey?'));
  }
}
