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
                "check":function(LoginService,$location){   //function to be resolved, accessFac and $location Injected
                    if(LoginService.isUserLoggedIn()){    //check if the user has permission -- This happens before the page loads

                    }else{
                        $location.path('/login').replace();                //redirect user to home if it does not have permission.
                    }
                }
            }
          }).
      otherwise({
        redirectTo: '/'
      });
      
      //pretty url:s without hashtag
      //$locationProvider.html5Mode(true);
  }]);

