import _ from 'lodash';

class Extractor {

    extract(exampleWords, tags, words) {
        let result = {};

        tags.forEach(tag => {
            let matches = [];
            let currentMatch = null;

            do {
                let startIndex = currentMatch ? currentMatch.start : 0;
                currentMatch = this._match(exampleWords, tag, words, startIndex);
                
                if (currentMatch.tag !== null && currentMatch.matches > 1) {
                    matches.push(currentMatch);
                }
            } while (currentMatch.start > 0);

            if(matches.length) {
              let bestMatch = _.max(matches, (match) => {
                  return match.matches;
              });

              result[tag.label] = bestMatch.tag;
            }
        });

        if(Object.keys(result).length)
            return result;
    }

    _match(exampleWords, tag, words, startIndex) {
        let word = exampleWords[tag.start - 1];
        let index = words.indexOf(word, startIndex || 0);
        let offset = index - tag.start + 1;
        let start = index + 1;
        let matches = 0;

        while (index !== -1 && typeof words[index] !== 'undefined' &&
            typeof exampleWords[index - offset] !== 'undefined' &&
            words[index] === exampleWords[index - offset]) {
            matches++;
            index--;
        }

        if (matches === 0) {
            return {
                tag: null,
                start: -1,
                matches
            };
        }

        let endIndex = tag.end === -1 ? words.length :
            start + (tag.start - tag.end);

        return {
            tag: words.slice(start, endIndex + 1).join(' '),
            start,
            matches
        };
    }
}

angular.module('Jarvis')
    .service('Extractor', Extractor);
