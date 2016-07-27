'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAccount', myAccount)
    
    myAccount.$inject = ['Constants', 'ApiService']
    
    function myAccount(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/accountView.html',
            require: '^myParentDirective',
         
            link: function(scope, elem, attrs){
                scope.success = null;
                scope.showEditSpotPanel = false;
               
                scope.user = ApiService.getUser();
                
                scope.closeAccountPanel = (()=>{
                    scope.showAccountView = false;
                });
                
                scope.userSpots = ((spot)=>{
                    return (spot.birdspotterid === scope.user.id);
                });
                
                scope.deleteSpot = ((spotId)=>{
                    ApiService.deleteSpot(spotId, scope.user)
                    .then(scope.spotDeletedMessage)
                    .then(scope.updateList(Constants.SPOTS_URL))
                    .catch(scope.errorMessage);
                });
                
                scope.spotDeletedMessage = ((message)=>{
                    scope.success = message;
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
