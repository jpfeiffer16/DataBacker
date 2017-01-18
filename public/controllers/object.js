angular.module('app')
  .controller('ObjectCtrl', function($scope, $routeParams, $http) {
    //TODO: Object stuff here
    console.log($routeParams.key, $routeParams.version);
    if ($routeParams.key && $routeParams.version) {
      $http.post('/get', {
        key: $routeParams.key,
        version: $routeParams.version
      })
      .then((response) => {
        console.log(response.data);
        $scope.object = response.data;
      });
    }
    
  });