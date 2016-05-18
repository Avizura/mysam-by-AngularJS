class Repeat {
    constructor($stateParams) {
        this.output = $stateParams.extracted.subject;
    }
}

angular.module('Jarvis')
    .controller('repeatCtrl', Repeat);
