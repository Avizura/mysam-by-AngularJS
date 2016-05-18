angular.module('Jarvis')
  .controller('hiCtrl', ($scope, $stateParams) => {
    $scope.action = $stateParams["extracted"]["subject"];
    console.log($scope.action);
  });
