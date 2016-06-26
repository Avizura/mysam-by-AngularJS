"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Brain = function () {
    function Brain() {
        _classCallCheck(this, Brain);

        this.brain = new brain.NeuralNetwork(options);
        this.data = [];
    }

    _createClass(Brain, [{
        key: "addExample",
        value: function addExample(features, label) {
            var output = {};
            output[label] = 1;

            this.data.push({
                input: features,
                output: output
            });
        }
    }, {
        key: "train",
        value: function train() {
            return this.brain.train(this.data);
        }
    }, {
        key: "getClassifications",
        value: function getClassifications(features) {
            var result = [];
            var data = this.brain.run(features);

            Object.keys(data).forEach(function (label) {
                result.push({
                    label: label,
                    value: data[label]
                });
            });

            return result;
        }
    }, {
        key: "classify",
        value: function classify(features) {
            var classifications = this.getClassifications(features);
            var max = 0;
            var result = null;

            classifications.forEach(function (current) {
                if (current.value > max) {
                    result = current.label;
                    max = current.value;
                }
            });

            return result;
        }
    }]);

    return Brain;
}();