// angular.module('Jarvis')
//   .controller('repeatCtrl', () => {
//     console.log('REPEAT');
//     console.log(Classifier);
//     console.log(this.Classifier);
//     this.Classifier.add({type: 'asd', text: 'lol'});
//   });


class Repeat {
    constructor($scope, Classifier) {
        console.log(Classifier);
        console.log($scope.Classifier);
    }
}

angular.module('Jarvis')
    .controller('repeatCtrl', ($scope, Classifier) => new Repeat($scope, Classifier));
