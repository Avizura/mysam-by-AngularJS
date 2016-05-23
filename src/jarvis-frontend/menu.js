import natural from 'natural';
// import brain from 'brain';
//
// // let classifier = new natural.LogisticRegressionClassifier();
// //
// // classifier.addDocument("Hello my name is David", "namer");
// // classifier.addDocument("Say hi", "hi");
// // classifier.addDocument("What is the weather in Berlin", "weather");
// // classifier.addDocument("Tell me the weather", "weather");
// // classifier.addDocument("Show help", "help");
// // classifier.addDocument("Repeat after me", "repeat");
// // classifier.train();
// // var a = classifier.classify('Gorila previous');
// // console.log(classifier.getClassifications('Gorila previous'));
// // console.log('A', a);
// // var b = classifier.classify('Show me the weather');
// // console.log(classifier.getClassifications('Tell me the weather'));
// // console.log('A', b);
//
//
// var net = new brain.NeuralNetwork();
//
// net.train([
//            {input: [0, 0], output: {michael: 1}},
//            {input: [0, 1], output: {freezy: 1}},
//            {input: [1, 0], output: {freezy: 1}},
//            {input: [1, 1], output: {michael: 1}}
//           ]);
//
// var output = net.run([1, 1]);  // [0.987]
// console.log(output);

// console.log(natural.PorterStemmerRu.stem("И в чем же причина инертности молекулярного газа"));
//
// natural.PorterStemmerRu.attach();
// console.log("Ну и какой был в этом смысл?".tokenizeAndStem());
// console.log("Можешь сказать какая самая высокая гора в мире".tokenizeAndStem());

    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    // #1 Tokenize
    //
    // tokenize('Ну и какой был в этом смысл?')
    // // -> [ 'Ну', 'и', 'какой', 'был', 'в', 'этом', 'смысл']
    // tokenize('Какая же самая высокая гора в мире?')
    // // -> [ 'Какая', 'же', 'самая', 'высокая', 'гора', 'в', 'мире']
    //
    // #2 Stem
    //
    // stem([ 'Ну', 'и', 'какой', 'был', 'в', 'этом', 'смысл' ])
    // // -> [ 'Как', 'эт', 'смысл' ]
    // stem([ 'Какая', 'же', 'самая', 'высокая', 'гора', 'в', 'мире' ])
    // // -> [ 'Как', 'самый', 'высок', 'гор', 'мир' ]
    //
    // join([ 'Как', 'эт', 'смысл' ], [ 'Как', 'самый', 'высок', 'гор', 'мир' ])
    // // -> [ 'Как', 'эт', 'смысл', 'самый', 'высок', 'гор', 'мир' ]
    //
    // #3 Featurize
    //
    //   // [ 'Как', 'эт', 'смысл', 'самый', 'высок', 'гор', 'мир' ]
    //   features([ 'Как', 'эт', 'смысл' ])
    //   // -> [ 1, 1, 1, 0, 0, 0, 0 ]
    //   features([ 'Как', 'самый', 'высок', 'гор', 'мир' ])
    //   // -> [ 1, 0, 0, 1, 1, 1, 1 ]
    //
    // #4 Train
    // var net = new brain.NeuralNetwork();
    // // [ 'Как', 'эт', 'смысл', 'самый', 'высок', 'гор', 'мир' ]
    // net.train([
    //   // [ 'Как', 'эт', 'смысл' ]
    //   { input: [ 1, 1, 1, 0, 0, 0, 0 ], output: { 'сорок два': 1 } },
    //   // [ 'Как', 'самый', 'высок', 'гор', 'мир' ]
    //   { input: [ 1, 0, 0, 1, 1, 1, 1 ], output: { 'Эверест': 1 } }
    // ]);
    //
    // #5 Classify
    //
    // tokenizeAndStem('Можешь сказать какая самая высокая гора в мире')
    // // -> [ 'можеш', 'сказ', 'как', 'самый', 'высок', 'гор', 'мир' ]
    // features([ 'можеш', 'сказ', 'как', 'самый', 'высок', 'гор', 'мир' ])
    // // -> [ 1, 1, 1, 0, 0, 0, 0 ]
    // net.run([ 1, 1, 1, 0, 0, 0, 0 ]);
    // // -> { Эверест: 0.9326151115201983, "сорок два": 0.06951084324415624 }
