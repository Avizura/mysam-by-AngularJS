'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Help = function Help(Classifier) {
    _classCallCheck(this, Help);

    this.descriptions = Classifier.descriptions.map(function (item) {
        return item.description;
    });
};

angular.module('Jarvis').controller('helpCtrl', Help);