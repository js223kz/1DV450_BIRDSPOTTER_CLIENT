

"use strict";
let BirdSpotterApp = angular.module('BirdSpotterApp',['ngRoute', 'ngMessages', 'base64', 'ngGeolocation']);

BirdSpotterApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'views/startView.html',
            controller: 'StartController'
        }).
        when('/login', {
                templateUrl: 'views/loginView.html',
                controller: 'LoginController'
        }).
        when('/addSpot', {
            templateUrl: 'views/addSpotView.html',
            controller: 'AddSpotController'
        }).
        when('/account', {
            templateUrl: 'views/accountView.html',
            controller: 'AccountController'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);