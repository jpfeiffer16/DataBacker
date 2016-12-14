angular.module('app')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.username = '';
    $scope.passoword = '';
    $scope.login = function() {
      //TODO: Do login here
    };
  });