angular.module('app')
  .factory('AuthenticationInterceptor', function ($q) {
    return {
      responseError: function (rejection) {
        if (rejection.status == 401 && rejection.config.url != '/api/userinfo') {
          $location.path('/login');
        }
        return $q.reject(rejection);
      }
    };
});