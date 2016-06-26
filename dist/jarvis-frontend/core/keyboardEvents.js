'use strict';

angular.module('Jarvis').directive('keyboardEvents', function ($document, $rootScope) {
  return {
    restrict: 'A',
    link: function link($scope, $element) {
      $document.bind('keypress', function (e) {
        console.log(e);
        $rootScope.$broadcast('keypress', e);
        $rootScope.$broadcast('keypress:' + e.which, e);
      });
    }
  };
});