'use strict';

(function(){
    angular.module('BirdSpotterApp').controller('StartController', StartController)
    
    StartController.$inject = ['ApiService', 'Constants', 'LayerService', 'LoginService', 'PositionService', 'MarkerService', '$scope', '$q']
    
    function StartController(ApiService, Constants, LayerService, LoginService, PositionService, MarkerService, $scope, $q){
        $scope.spotList = null;
        $scope.birdList = null;
        $scope.error = null;
        $scope.loggedIn = LoginService.getUser();
        $scope.showLoginView = false;
        $scope.selectedBirds = [];
        $scope.userPosition = null;
        $scope.mapMarkers = null;
            
        //set lat and long + zoom for map
        $scope.map = L.map('map').setView([63, 20], 5);
                 L.tileLayer(Constants.MAPLAYER, {
                        attribution: Constants.ATTRIBUTION
                }).addTo($scope.map);
        
       $scope.setUserPosition = ((position)=>{
            $scope.userPosition = position;
        });
        
        $scope.errorMessage = ((error)=>{
            return $scope.error = error;
        });
                
        $scope.successMessage = ((success)=>{
            return $scope.success = success;
        });
        
        $scope.reset = (()=>{
            $scope.selectedBirds = [];
            $scope.errorMessage("");
        });
        
        $scope.setMarkers = ((list)=>{
            $scope.mapMarkers = LayerService.showAllMarkers(list);
            $scope.map.addLayer($scope.mapMarkers);
        });
        
        $scope.filterByUserId = ((spot)=>{
            return (spot.birdspotterId === $scope.loggedIn.id);
        });
        
        $scope.isInArray = ((needle, hayStack)=>{
            hayStack.filter(function(spot){ 
                return spot.id === needle;
            });
        });
        
        $scope.filterByBirds = ((result)=>{
            let matches = [];
            //check unique
            for(let i=0; i < result.length; i++){
                for(let j=0; j < result[i].birds.length; j++){
                    for(let k=0; k < $scope.selectedBirds.length; k++){
                        
                        if(result[i].birds[j].birdName === $scope.selectedBirds[k].name){
                            if(!$scope.isInArray(result[i].id, matches)){
                                 matches.push(result[i]);
                            }
                           
                        }
                    }         
                }
            }
            return matches;
        });
        
        $scope.filterMapQuery = ((usersOnly, offset)=>{
             let result = $scope.spotList;
             $scope.map.removeLayer($scope.mapMarkers);
            if(offset !== undefined){
                //check if valid integer
                if(offset.match(/^\d+$/)){
                    $scope.error = null;
                }else{
                    $scope.errorMessage("Avstånd måste anges som ett heltal.");
                    return;  
                }
                
                //check if userposition is set
                if($scope.userPosition === null){
                    $scope.errorMessage("Du måste dela din position annars kan vi inte hämta birdspots inom begärd radie.");
                    
                    PositionService.getUserPosition()
                    .then($scope.setUserPosition)
                    .catch($scope.errorMessage);
                }else{
                    let nearBy = {
                        latitude: $scope.userPosition.lat,
                        longitude: $scope.userPosition.lng,
                        offset: $scope.offset
                    };
                    ApiService.getSpotsByDistance(nearBy)
                    .then((response)=>{
                        result = response;
                    });
                    
                }
             }
            
            if(usersOnly){
                result = result.filter($scope.filterByUserId);
            }
            
            if($scope.selectedBirds.length > 0){
                result = $scope.filterByBirds(result);
            }
            if(result.length === 0){
                $scope.errorMessage("Sökningen gav inga resultat.")
            }else{
                $scope.setMarkers(result);
            }
           
            
            
        });
        
        //on application start get user position
        //and get all birds and spots from api
        PositionService.getUserPosition()
            //functions in parent directive
            .then($scope.setUserPosition)
            .catch($scope.errorMessage);
        
        let collections =  [ApiService.getCollection(Constants.SPOTS_URL),  
                            ApiService.getCollection(Constants.BIRDS_URL)];
        
        $q.all(collections)
            .then(()=>{
                $scope.spotList = ApiService.getCachedList(Constants.SPOTS_URL); 
                $scope.birdList = ApiService.getCachedList(Constants.BIRDS_URL);
                $scope.setMarkers($scope.spotList);
                
            }).catch((error)=>{
                $scope.error = error;
        });
     }   
})();