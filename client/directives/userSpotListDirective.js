'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAccount', myAccount)
    
    myAccount.$inject = ['Constants', 'ApiService', '$location']
    
    function myAccount(Constants, ApiService, $location){
        return{
            restrict: 'E',
            templateUrl: 'views/partials/userSpotList.html',         
            link: function(scope, elem, attrs){
                scope.showEditSpotPanel = false;
                
                
                scope.closeAccountPanel = (()=>{
                     $location.path('/');
                });
                
                /*scope.userSpots = ((spot)=>{
                    return (spot.birdspotterid === scope.user.id);
                });*/
                
               
                scope.deleteSpot = ((spotId)=>{
                    ApiService.deleteSpot(spotId, scope.user)
                    .then(scope.successMessage)
                    .then(scope.updateList(Constants.SPOTS_URL))
                    .catch(scope.errorMessage);
                });
                
                scope.editSpot = ((spot)=>{
                    
                    spot.birds.forEach((bird)=>{
                        scope.selectedBirds.push({name: bird.birdName, id: bird.id});
                    });
                    
                    scope.selectedSpot = spot;
                    scope.showEditSpotPanel = true;
                });
                
                   
            }
        }
     }
    
})();
