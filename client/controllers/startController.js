'use strict';

(function(){
    angular.module('BirdSpotterApp').controller('StartController', StartController)
    
    StartController.$inject = ['ApiService', 'Constants', 'LayerService', 'LoginService', '$scope', '$q']
    
    function StartController(ApiService, Constants, LayerService, LoginService, $scope, $q){
        $scope.birdSpots = null;
        $scope.birds = null;
        $scope.error = null;
        $scope.loggedIn = LoginService.getUser();
        $scope.showLoginView = false;
        
        console.log($scope.loggedIn);
        
        //set lat and long + zoom for map
        $scope.map = L.map('map').setView([60, 17], 5);
                 L.tileLayer(Constants.TRAFFICLAYER, {
                        attribution: Constants.ATTRIBUTION
                }).addTo($scope.map);
        
        let collections =  [
                            ApiService.getCollection(Constants.SPOTS_URL),  
                            ApiService.getCollection(Constants.BIRDS_URL)
                        ];
        
        let lists =  [
                            
                        ];
        
        $q.all(collections)
            .then(()=>{
                $scope.birdSpots = ApiService.getCachedList(Constants.SPOTS_URL); 
                $scope.birds = ApiService.getCachedList(Constants.BIRDS_URL);
                let markers = LayerService.showAllMarkers($scope.birdSpots);
                $scope.map.addLayer(markers);
                
            }).catch((error)=>{
                $scope.error = error;
        })
        
     }   
})();
  