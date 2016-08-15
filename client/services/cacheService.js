"use strict";
angular.module('birdSpotterApp')
     .factory('CacheService', ['constants', cacheService]);  
   
    function cacheService(constants){
        return{
                getCachedCollection: getCachedCollection,
            };

        function getCachedCollection(storage){
            return JSON.parse(sessionStorage.getItem(storage));
        }
    }