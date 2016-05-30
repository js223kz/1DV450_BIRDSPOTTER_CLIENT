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

/*'use strict';

    
angular.module('birdSpotterApp')
    

.controller('StartController', ['constants', 'ApiService', 'CacheService', startController]); 
    
    function startController([constants, ApiService, CacheService]){
        let vm = this;
        let map= L.map('map').setView([60, 17], 5);
        vm.errorMessage = undefined;
     
         L.tileLayer(constants.TRAFFICLAYER, {
            attribution: constants.ATTRIBUTION
        }).addTo(map);
        
        if(sessionStorage.getItem(constants.SPOTS_STORAGE) === null){
            Promise.all([
                ApiService.getCollection(constants.BIRDS_URL),
                ApiService.getCollection(constants.SPOTS_URL),  
            ])
            .then(vm.getCachedCollections)
            .catch(vm.showErrorMessage);

        }else{
            vm.getCachedCollections();
        }
        vm.showErrorMessage = ((error) =>{
            console.log(error);
        });
        
        function getCachedCollections(){
            let markers = [];
            vm.birds = CacheService.getCachedCollection(constants.BIRDS_STORAGE);
            vm.spots = CacheService.getCachedCollection(constants.SPOTS_STORAGE);
            
            
            vm.spots.forEach((value) =>{
                var circle = L.circle([Number(value.latitude), Number(value.longitude)],500, {
                color: 'red',
                fillColor: '#f03',
                fillOpacity: 0.5
            });
            
                markers.push(circle);

            });
             let layer = L.layerGroup(markers);
                map.addLayer(layer);
        }
        
        vm.showErrorMessage =((message) =>{
            vm.errorMessage = message;
        });

    }*/
