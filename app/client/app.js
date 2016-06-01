"use strict";

let birdSpotterApp = angular.module('birdSpotterApp', ['ngRoute', 'ngMessages', 'base64']);

birdSpotterApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
          
    
    $routeProvider.
      when('/', {
        templateUrl: 'partials/startView.html',
        controller: 'StartController',
        controllerAs: 'start'
        
      }).
        when('/login', {
            templateUrl: 'partials/loginView.html',
            controller: 'LoginController',
            controllerAs: 'user'
          }).
        when('/ny_spot', {
            templateUrl: 'partials/addSpotView.html',
            controller: 'SpotController',
            controllerAs: 'spot',
            resolve: {
                auth: ["$q", "LoginService", function($q, LoginService) {
                    let userInfo = LoginService.getLoggedInUser();

                      if (userInfo) {
                        return $q.when(userInfo);
                      } else {
                        return $q.reject({ authenticated: false });
                      }
                    }]
            }
          }).
      otherwise({
        redirectTo: '/'
      });
      
      //pretty url:s without hashtag
      //$locationProvider.html5Mode(true);
  }]);


birdSpotterApp.run(["$rootScope", "$location", function($rootScope, $location) {
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log(userInfo);
  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/login");
    }
  });
}]);