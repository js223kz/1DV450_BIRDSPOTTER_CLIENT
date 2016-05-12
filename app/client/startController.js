'use strict';

    
angular.module('birdSpotterApp')
     .controller('StartController', ['constants', 'ApiService', 'CacheService', startController]);  

    function startController(constants, ApiService, CacheService){
        let vm = this;
        let map= L.map('map').setView([60, 17], 5);
     
         L.tileLayer(constants.TRAFFICLAYER, {
            attribution: constants.ATTRIBUTION
        }).addTo(map);
        
        ApiService.getCollection(constants.BIRDS_URL);
        
         ApiService.getCollection(constants.BIRDS_URL)
             .then(getCollection)
             .catch(showErrorMessage);
        
        function getCollection(){
            console.log(CacheService.getCachedCollection(constants.BIRDS_STORAGE));
        }
        
        function showErrorMessage(error){
            //show in text
            console.log(error);
        }

    }
