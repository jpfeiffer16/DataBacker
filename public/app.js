//Create and configure app here
angular
  .module('app', ['ngRoute'])
  .config(($routeProvider, $locationProvider) => {
    $locationProvider
     .html5Mode({
       enabled: true,
       requireBase: false
     });
    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl',
        page: 'time'
      });
  });