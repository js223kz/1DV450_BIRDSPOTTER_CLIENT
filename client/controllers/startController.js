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
                
        //set lat and long + zoom for map
        $scope.map = L.map('map').setView([60, 17], 5);
                 L.tileLayer(Constants.TRAFFICLAYER, {
                        attribution: Constants.ATTRIBUTION
                }).addTo($scope.map);
        
        
        ApiService.getCollection(Constants.SPOTS_URL)
            .then( ApiService.getCollection(Constants.BIRDS_URL))
            .then(ApiService.getCachedList(Constants.SPOTS_URL))
            .then($scope.setAllmarkers)
            .catch((error)=>{
                $scope.error = error;
        });
                           
        $scope.setAllmarkers = ((spots)=>{
            let markers = LayerService.showAllMarkers(spots);
            $scope.map.addLayer(markers);
        });
        
     }   
})();
  