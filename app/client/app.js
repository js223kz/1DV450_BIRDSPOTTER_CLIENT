"use strict";

let birdSpotterApp = angular.module('birdSpotterApp', ['ngRoute', 'ngMessages']);

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
      otherwise({
        redirectTo: '/'
      });
      
      //pretty url:s without hashtag
      //$locationProvider.html5Mode(true);
  }]);