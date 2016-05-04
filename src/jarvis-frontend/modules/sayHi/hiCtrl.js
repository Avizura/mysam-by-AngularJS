angular.module('Jarvis')
  .controller('hiCtrl', ($scope, $stateParams) => {
    console.log('HELLO CONTROLLER');
    $scope.action = $stateParams["extracted"]["subject"][0];
    console.log($scope.action);
  });
