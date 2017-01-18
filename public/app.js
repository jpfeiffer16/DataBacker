//Create and configure app here
angular
  .module('app', ['ngRoute'])
  .config(($routeProvider, $locationProvider, $httpProvider) => {
    $locationProvider
     .html5Mode({
       enabled: true,
       requireBase: false
     });
    $routeProvider
      .when('/', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      }).when('/login', {
        templateUrl: '/views/leogin.html',
        controller: 'loginCtrl'
      })
      .when('/object/:key/:version', {
        templateUrl: '/views/object.html',
        controller: 'ObjectCtrl'
      });;
    // $httpProvider.interceptors.push('AuthenticationInterceptor');
  });