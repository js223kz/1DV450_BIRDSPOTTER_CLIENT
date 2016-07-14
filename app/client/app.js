"use strict";

(function(){
    angular.module('BirdSpotterApp', ['ngRoute', 'ngMessages', 'base64', 'ngGeolocation']);
    
    angular.module('BirdSpotterApp').config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
        $routeProvider.
          when('/account', {
            templateUrl: 'partials/accountView.html',
          }).
          otherwise({
            redirectTo: '/'
          });

          //pretty url:s without hashtag
          $locationProvider.html5Mode(true);
      }]);
}());

