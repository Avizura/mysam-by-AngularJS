'use strict';

angular.module('Jarvis').directive('learnDirective', function () {
  return {
    template: '<div>{{input}}</div>',
    controller: 'mainCtrl'
  };
});