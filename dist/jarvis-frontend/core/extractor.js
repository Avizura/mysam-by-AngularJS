'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Extractor = function () {
    function Extractor() {
        _classCallCheck(this, Extractor);
    }

    _createClass(Extractor, [{
        key: 'extract',
        value: function extract(exampleWords, tags, words) {
            var _this = this;

            var result = {};

            tags.forEach(function (tag) {
                var matches = [];
                var currentMatch = null;

                do {
                    var startIndex = currentMatch ? currentMatch.start : 0;
                    currentMatch = _this._match(exampleWords, tag, words, startIndex);

                    if (currentMatch.tag !== null && currentMatch.matches > 1) {
                        matches.push(currentMatch);
                    }
                } while (currentMatch.start > 0);

                if (matches.length) {
                    var bestMatch = _lodash2.default.max(matches, function (match) {
                        return match.matches;
                    });

                    result[tag.label] = bestMatch.tag;
                }
            });

            if (Object.keys(result).length) return result;
        }
    }, {
        key: '_match',
        value: function _match(exampleWords, tag, words, startIndex) {
            var word = exampleWords[tag.start - 1];
            var index = words.indexOf(word, startIndex || 0);
            var offset = index - tag.start + 1;
            var start = index + 1;
            var matches = 0;

            while (index !== -1 && typeof words[index] !== 'undefined' && typeof exampleWords[index - offset] !== 'undefined' && words[index] === exampleWords[index - offset]) {
                matches++;
                index--;
            }

            if (matches === 0) {
                return {
                    tag: null,
                    start: -1,
                    matches: matches
                };
            }

            var endIndex = tag.end === -1 ? words.length : start + (tag.start - tag.end);

            return {
                tag: words.slice(start, endIndex + 1).join(' '),
                start: start,
                matches: matches
            };
        }
    }]);

    return Extractor;
}();

angular.module('Jarvis').service('Extractor', Extractor);