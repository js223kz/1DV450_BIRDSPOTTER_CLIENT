'use strict';

(function(){
    angular.module('BirdSpotterApp').controller('AddSpotController', AddSpotController)
    
    AddSpotController.$inject = ['ApiService', 'Constants', 'PositionService', '$scope']
    
    function AddSpotController(ApiService, Constants, PositionService, $scope){
        
        //shared variables between directives
        $scope.birdList = ApiService.getCachedList(Constants.BIRDS_URL);
        $scope.showAddBirdForm = null;
        $scope.showSearchResult = false;
        $scope.selectedBirds = [];
        $scope.query = null;
        $scope.success = null;
        $scope.error = null;
        $scope.userPosition = null;
        
        
        $scope.setUserPosition = ((position)=>{
            $scope.userPosition = position;
        });
        
        $scope.goToAddBird = (()=>{
            $scope.showAddBirdForm = true;
            $scope.query = "";
        }); 
        
        $scope.setList = ((url)=>{
            if(url === Constants.BIRDS_URL){
                let collection = ApiService.getCachedList(Constants.BIRDS_URL);
                $scope.birdList = collection;
            
            }else{
                let collection = ApiService.getCachedList(Constants.SPOTS_URL);
                $scope.spotList = collection;
            }
        });
        $scope.errorMessage = ((error)=>{
            return $scope.error = error;
        });
                
        $scope.successMessage = ((success)=>{
            return $scope.success = success;
        });
        
         $scope.updateList = ((url)=>{
            ApiService.getCollection(url)
            .then(()=>{
                $scope.setList(url);
            })
            .catch($scope.errorMessage);

        });
    
        PositionService.getUserPosition()
                    
            //functions in parent directive
            .then($scope.setUserPosition)
            .catch($scope.errorMessage);
            
     }   
})();
  