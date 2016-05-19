angular.module('Jarvis')
  .directive('keyboardEvents', ($document, $rootScope) => {
    return {
      restrict: 'A',
      link: ($scope, $element) => {
        $document.bind('keypress', (e) => {
          console.log(e);
          $rootScope.$broadcast('keypress', e);
          $rootScope.$broadcast('keypress:' + e.which, e);
        })
      }
    }
  })
