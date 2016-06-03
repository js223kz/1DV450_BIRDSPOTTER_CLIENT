"use strict";
angular.module('birdSpotterApp')
     .factory('PositionService', ['constants', '$q', '$window', positionService]);  
   
    function positionService(constants, $q, $window){
        
        function getCurrentPosition() {
            let deferred = $q.defer();            

            if (!$window.navigator.geolocation) {
                deferred.reject('Din webbläsare stödjer inte geolocation. För att kunna skapa en ny Spot prova med att byta webbläsare.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        }
        
        return{
            getCurrentPosition: getCurrentPosition
        };
    }