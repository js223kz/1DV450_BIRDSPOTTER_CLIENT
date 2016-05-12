'use strict';

    
angular.module('birdSpotterApp')
     .controller('StartController', ['constants', 'ApiService', 'CacheService', startController]);  

    function startController(constants, ApiService, CacheService){
        let vm = this;
        let map= L.map('map').setView([60, 17], 5);
     
         L.tileLayer(constants.TRAFFICLAYER, {
            attribution: constants.ATTRIBUTION
        }).addTo(map);
        
        if(sessionStorage.getItem(constants.SPOTS_STORAGE) === null){
            Promise.all([
                ApiService.getCollection(constants.BIRDS_URL),
                ApiService.getCollection(constants.SPOTS_URL),  
            ])
            .then(getCachedCollections)
            .catch(showErrorMessage);

        }else{
            getCachedCollections();
        }
        vm.showErrorMessage = ((error) =>{
            console.log(error);
        });
        
        function getCachedCollections(){
            let markers = [];
            console.log("inne i get cached");
            vm.birds = CacheService.getCachedCollection(constants.BIRDS_STORAGE);
            vm.spots = CacheService.getCachedCollection(constants.SPOTS_STORAGE);
            
            
            vm.spots.forEach((value) =>{
                var circle = L.circle([Number(value.latitude), Number(value.longitude)], 500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            });
            
                markers.push(circle);

            });
             let layer = L.layerGroup(markers);
                map.addLayer(layer);
        }

    }
