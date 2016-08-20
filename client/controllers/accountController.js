'use strict';

(function(){
    angular.module('BirdSpotterApp').controller('AccountController', AccountController)
    
    AccountController.$inject = ['$scope', 'ApiService', 'Constants', 'LoginService',]
    
    function AccountController($scope, ApiService, Constants, LoginService){
        $scope.user = LoginService.getUser();
        $scope.spots = ApiService.getCachedList(Constants.SPOTS_STORAGE);
        $scope.birdList = ApiService.getCachedList(Constants.BIRDS_URL);
        $scope.selectedBirds = [];
        $scope.success = null;
        $scope.error = null;
        
        
        //methods used in directives
         $scope.setList = (()=>{
            return $scope.spots = ApiService.getCachedList(Constants.SPOTS_STORAGE);
         });
        
         $scope.errorMessage = ((error)=>{
            return $scope.error = error;
        });
                
        $scope.successMessage = ((success)=>{
            return $scope.success = success;
        });
        
         $scope.updateList = ((url)=>{
            ApiService.getCollection(url)
            .then($scope.setList)
            .catch($scope.errorMessage);

        });
                
            
     }   
})();
  