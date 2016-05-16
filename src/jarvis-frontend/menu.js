import natural from 'natural';

let classifier = new natural.LogisticRegressionClassifier();

classifier.addDocument("Hello my name is David", "namer");
classifier.addDocument("Say hi", "hi");
classifier.addDocument("What is the weather in Berlin", "weather");
classifier.addDocument("Tell me the weather", "weather");
classifier.addDocument("Show help", "help");
classifier.addDocument("Repeat after me", "repeat");
classifier.train();
var a = classifier.classify('Gorila previous');
console.log(classifier.getClassifications('Gorila previous'));
console.log('A', a);
var b = classifier.classify('Show me the weather');
console.log(classifier.getClassifications('Tell me the weather'));
console.log('A', b);
