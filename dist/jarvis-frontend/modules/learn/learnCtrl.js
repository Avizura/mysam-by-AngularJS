'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _diskdb = require('diskdb');

var _diskdb2 = _interopRequireDefault(_diskdb);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Learn = function () {
    function Learn($scope, Classifier) {
        var _this = this;

        _classCallCheck(this, Learn);

        this.$scope = $scope;
        this.Classifier = Classifier;
        this.words = $scope.main.input.split(' ');
        this.data = [];
        this.words.forEach(function (word) {
            _this.data.push({
                word: word,
                selected: false
            });
        });
        this.actions = Classifier.descriptions;
        this.selectedAction = this.actions[0];
        this.$scope = $scope;

        // For listening to a keypress event ctrl+enter
        $scope.$on('keypress:13', function (onEvent, keypressEvent) {
            // if(keypressEvent.ctrlKey)
            _this.learn();
        });
    }

    _createClass(Learn, [{
        key: 'select',
        value: function select(item) {
            item.selected = !item.selected;
        }
    }, {
        key: 'learn',
        value: function learn() {
            var _this2 = this;

            var tags = [];
            this.selectedAction.tags.forEach(function (tagLabel) {
                var lastIndex = _lodash2.default.findLastIndex(_this2.data, {
                    selected: true
                });
                var end = lastIndex !== _this2.data.length - 1 ? lastIndex : -1;
                tags.push({
                    label: tagLabel,
                    start: _lodash2.default.findIndex(_this2.data, {
                        selected: true
                    }),
                    end: end
                });
            });
            var action = {
                text: this.$scope.main.input,
                type: this.selectedAction.type,
                tags: tags
            };
            console.log(action);
            this.Classifier.trainAction(action);
            _diskdb2.default.connect(_path2.default.join(__dirname, '/db-data'), ['actions']);
            _diskdb2.default.actions.save(action);
            this.$scope.main.runAction();
        }
    }, {
        key: 'selectEnd',
        value: function selectEnd() {
            var index = _lodash2.default.findIndex(this.data, {
                selected: true
            });
            for (var i = index; i < this.data.length; i++) {
                this.data[i].selected = true;
            }
        }
    }]);

    return Learn;
}();

angular.module('Jarvis').controller('learnCtrl', Learn);