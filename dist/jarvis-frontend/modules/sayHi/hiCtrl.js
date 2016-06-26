'use strict';

angular.module('Jarvis').controller('hiCtrl', function ($scope, $stateParams, Synthesizer) {
    $scope.action = $stateParams["extracted"]["subject"];
    Synthesizer.speak('Welcome ' + $scope.action, 'en-US');
});