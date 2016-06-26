'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _natural = require('natural');

var _natural2 = _interopRequireDefault(_natural);

var _diskdb = require('diskdb');

var _diskdb2 = _interopRequireDefault(_diskdb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ClassifierProvider() {

    this.$get = function () {
        return new Classifier(Extractor);
    };

    var pluginActions = [];
    this.addPluginAction = function (action) {
        if (action) pluginActions.push(action);
    };

    var pluginDescriptions = [];
    this.addPluginDescription = function (description) {
        if (description) pluginDescriptions.push(description);
    };

    var Classifier = function () {
        function Classifier(Extractor) {
            _classCallCheck(this, Classifier);

            this.data = [];
            this.threshold = 0.3;
            this.Extractor = new Extractor();
            this.classifier = new _natural2.default.LogisticRegressionClassifier();
            this.tokenizer = new _natural2.default.WordTokenizer();
            this.setup();
        }

        _createClass(Classifier, [{
            key: 'classify',
            value: function classify(input) {
                var _this = this;

                console.log(this.classifier);
                console.log(input);
                var classifications = this.classifier.getClassifications(input);
                console.log('Classifications: ', classifications);
                var actionType = void 0;
                var extracted = [];
                var inputWords = this.tokenizer.tokenize(input);

                if (this.isRecognized(classifications)) {
                    actionType = classifications[0].label;
                    console.log('class: ', actionType);
                    var actions = this.actions.filter(function (action) {
                        return action.type == actionType;
                    });
                    actions.forEach(function (action) {
                        var exampleWords = _this.tokenizer.tokenize(action.text);
                        extracted.push(_this.Extractor.extract(exampleWords, action.tags, inputWords));
                    });
                    extracted = extracted.filter(function (item) {
                        return !!item;
                    })[0];
                    console.log(extracted);
                } else {
                    actionType = 'learn';
                }
                return {
                    actionType: actionType,
                    extracted: extracted
                };
            }
        }, {
            key: 'isRecognized',
            value: function isRecognized(classifications) {
                if (classifications[0].value >= this.threshold && classifications[0].value > classifications[1].value) return true;
                return false;
            }
        }, {
            key: 'mergeActions',
            value: function mergeActions() {
                var _this2 = this;

                console.log('Plugin actions', pluginActions);
                this.actions = this.actions.concat(pluginActions);
                console.log('Merged actions', this.actions);
                this.actions.forEach(function (action) {
                    return _this2.classifier.addDocument(action.text, action.type);
                });
                this.classifier.train();
            }
        }, {
            key: 'mergeDescriptions',
            value: function mergeDescriptions() {
                this.descriptions = this.descriptions.concat(pluginDescriptions);
            }
        }, {
            key: 'trainAction',
            value: function trainAction(action) {
                this.actions.push(action);
                this.classifier.addDocument(action.text, action.type);
                this.classifier.train();
            }
        }, {
            key: 'addPluginDescription',
            value: function addPluginDescription(description) {
                this.descriptions.push(description);
            }
        }, {
            key: 'setup',
            value: function setup() {
                _diskdb2.default.connect(_path2.default.join(__dirname, '/db-data'), ['actions', 'descriptions']);
                this.actions = _diskdb2.default.actions.find();
                console.log('base actions', this.actions);
                this.descriptions = _diskdb2.default.descriptions.find();
            }
        }]);

        return Classifier;
    }();
}

angular.module('Jarvis').provider('Classifier', ClassifierProvider);