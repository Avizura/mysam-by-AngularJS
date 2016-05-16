class Repeat {
    constructor($scope, Classifier) {
        console.log(Classifier);
        console.log($scope.Classifier);
    }
}

angular.module('Jarvis')
    .controller('repeatCtrl', ($scope, Classifier) => new Repeat($scope, Classifier));
