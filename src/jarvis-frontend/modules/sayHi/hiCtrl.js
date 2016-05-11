angular.module('Jarvis')
  .controller('hiCtrl', ($scope, $stateParams) => {
    $scope.action = $stateParams["extracted"]["subject"][0];
    console.log($scope.action);
  });
