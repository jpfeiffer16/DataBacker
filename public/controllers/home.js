angular.module('app')
  .controller('HomeCtrl', function($scope, $http) {
    $http.post('/get')
      .then((response) => {
        console.log(response.data);
        $scope.objects = response.data;
      });
  });