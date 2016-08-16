'use strict';

(function(){
    angular.module('BirdSpotterApp').controller('StartController', StartController)
    
    StartController.$inject = ['ApiService', 'Constants', 'LayerService', 'LoginService', '$scope', '$q']
    
    function StartController(ApiService, Constants, LayerService, LoginService, $scope, $q){
        $scope.spotList = null;
        $scope.birdList = null;
        $scope.error = null;
        $scope.loggedIn = LoginService.getUser();
        $scope.showLoginView = false;
        $scope.selectedBirds = [];
            
        //set lat and long + zoom for map
        $scope.map = L.map('map').setView([60, 17], 5);
                 L.tileLayer(Constants.TRAFFICLAYER, {
                        attribution: Constants.ATTRIBUTION
                }).addTo($scope.map);
        
       let collections =  [
                            ApiService.getCollection(Constants.SPOTS_URL),  
                            ApiService.getCollection(Constants.BIRDS_URL)
                        ];
        
        $scope.errorMessage = ((error)=>{
            return $scope.error = error;
        });
                
        $scope.successMessage = ((success)=>{
            return $scope.success = success;
        });
        
        $scope.setMarkers = ((list)=>{
            let markers = LayerService.showAllMarkers(list);
            $scope.map.addLayer(markers);
        });
        
        $q.all(collections)
            .then(()=>{
                $scope.spotList = ApiService.getCachedList(Constants.SPOTS_URL); 
                $scope.birdList = ApiService.getCachedList(Constants.BIRDS_URL);
                $scope.setMarkers($scope.spotList);
                
            }).catch((error)=>{
                $scope.error = error;
        });
        
        $scope.showSelectedMapMarkers = ((usersOnly, distance)=>{
            if(distance !== undefined){
                //hämta från Api
                console.log("get from api");
            }else{
                if(usersOnly){
                    console.log("user selected");
                    //Filtrera birdspots på användare
                }
                
                if($scope.selectedBirds.length > 0){
                    console.log("birds selected");
                    //filtrera på fåglar
                }
            }
           
        });
        
     }   
})();