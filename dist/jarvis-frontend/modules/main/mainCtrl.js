'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bus = require('./jarvis-frontend/core/bus.js');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Main = function () {
    function Main($scope, $state, Recognizer, Classifier) {
        var _this = this;

        _classCallCheck(this, Main);

        this.$scope = $scope;
        this.$state = $state;
        this.Recognizer = Recognizer;
        this.Recognizer.recognition.onend = function () {
            _this.recognition = false;
            $scope.$apply();
        };
        this.Classifier = Classifier;
        this.recognition = false;
        this.langs = Recognizer.getLangs();
        //russian language by default
        this.selectedLang = this.langs.filter(function (lang) {
            return lang.value === 'ru-Ru';
        })[0].value;
        $scope.$watch('main.selectedLang', function (lang) {
            return Recognizer.selectLang(lang);
        });

        $scope.$on('keypress:13', function (onEvent, keypressEvent) {
            _this.runAction(_this.input);
        });
        $scope.$on('keypress:32', function (onEvent, keypressEvent) {
            if (keypressEvent.ctrlKey) {
                $scope.main.toggle();
                _this.$scope.$apply();
            }
        });

        _bus2.default.when('transcript').then(function (event) {
            return _this.runAction(event.value);
        });
    }

    _createClass(Main, [{
        key: 'runAction',
        value: function runAction() {
            if (!this.input) return; //error msg here
            var classification = this.Classifier.classify(this.input);
            var actionType = classification.actionType;
            var extracted = classification.extracted;
            console.log(actionType);
            try {
                this.$state.go('main.' + actionType, {
                    extracted: extracted
                });
            } catch (e) {
                console.log(e);
            }
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.recognition = !this.recognition;
            if (this.recognition) {
                this.Recognizer.start();
            } else {
                this.Recognizer.stop();
            }
        }
    }]);

    return Main;
}();

angular.module('Jarvis').controller('mainCtrl', Main);