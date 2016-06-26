class Help {
    constructor(Classifier) {
        this.descriptions = Classifier.descriptions.map((item) => item.description);
    }
}

angular.module('Jarvis')
    .controller('helpCtrl', Help);
