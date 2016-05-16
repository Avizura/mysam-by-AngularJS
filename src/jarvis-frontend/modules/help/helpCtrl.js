class Help {
    constructor(Classifier) {
        this.actions = Classifier.descriptions.map((item) => item.description);
    }
}

angular.module('Jarvis')
    .controller('helpCtrl', Help);
