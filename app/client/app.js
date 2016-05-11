"use strict";
let birdSpotterApp = angular.module('birdSpotterApp', ['ngRoute']);

birdSpotterApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/startView.html',
        controller: 'StartController',
        controllerAs: 'start'
      }).
      otherwise({
        redirectTo: '/'
      });
      
      //pretty url:s without hashtag
      $locationProvider.html5Mode(true);
  }]);
