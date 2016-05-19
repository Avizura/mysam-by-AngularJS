import natural from 'natural';
import brain from 'brain';

// let classifier = new natural.LogisticRegressionClassifier();
//
// classifier.addDocument("Hello my name is David", "namer");
// classifier.addDocument("Say hi", "hi");
// classifier.addDocument("What is the weather in Berlin", "weather");
// classifier.addDocument("Tell me the weather", "weather");
// classifier.addDocument("Show help", "help");
// classifier.addDocument("Repeat after me", "repeat");
// classifier.train();
// var a = classifier.classify('Gorila previous');
// console.log(classifier.getClassifications('Gorila previous'));
// console.log('A', a);
// var b = classifier.classify('Show me the weather');
// console.log(classifier.getClassifications('Tell me the weather'));
// console.log('A', b);


var net = new brain.NeuralNetwork();

net.train([
           {input: [0, 0], output: {michael: 1}},
           {input: [0, 1], output: {freezy: 1}},
           {input: [1, 0], output: {freezy: 1}},
           {input: [1, 1], output: {michael: 1}}
          ]);

var output = net.run([1, 1]);  // [0.987]
console.log(output);
