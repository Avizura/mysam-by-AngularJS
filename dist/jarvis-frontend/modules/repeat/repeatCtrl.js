'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repeat = function Repeat($stateParams) {
    _classCallCheck(this, Repeat);

    this.output = $stateParams.extracted.subject;
};

angular.module('Jarvis').controller('repeatCtrl', Repeat);