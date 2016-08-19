'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAddSpot', myAddSpot)
    
    myAddSpot.$inject = ['Constants', 'PositionService', 'LoginService', 'ApiService', '$location']
    
    function myAddSpot(Constants, PositionService, LoginService, ApiService, $location){
        return{
            restrict: 'E',
            templateUrl: 'views/partials/addSpotForm.html',
            link: function(scope, elem, attrs){
                
                scope.goToAddBird = (()=>{
                    scope.showAddBirdForm = true;
                    scope.query = "";
                }); 
                
                scope.resetSpotForm = (()=>{
                    scope.selectedBirds = [];
                    scope.query = null;
                });

                scope.saveSpot = (()=>{
                    let birds = [];
                    let auth = LoginService.getUser();
                    let errorMessage = 'Du måste godkänna att vi får använda din position.'+
                        'Utan den går det inte att registrera en ny birdspot.'
                    
                    if(scope.userPosition === null){
                        scope.errorMessage(errorMessage);
                         PositionService.getUserPosition()
                        
                        //functions in parent directive
                        .then(scope.setUserPosition)
                        .catch(scope.errorMessage); 
                    }else{
                        if(scope.selectedBirds.length === 0){
                            scope.errorMessage('Du måste lägga till minst en fågel.');
                            return;
                        }
                        
                        //get id:s of selected birds
                        scope.selectedBirds.forEach((item)=>{
                            birds.push(item.id);
                        });

                        let spot = {
                            "latitude": scope.userPosition.lat,
                            "longitude": scope.userPosition.lng,
                            "birdspotter": auth.id,
                            "bird": birds.toString()                       
                        }
                        
                        ApiService.saveItem(spot, auth.token, Constants.SPOTS_URL)
                        .then(scope.successMessage)
                        .then(scope.resetSpotForm)
                        .then(scope.updateList(Constants.SPOTS_URL))
                        
                        //error message function in parent directive
                        .catch(scope.errorMessage);
                    }
                });

                scope.closeAddSpotView = (()=>{
                    scope.resetSpotForm();
                    $location.path('/')
                });
                   
            }
        }
     }
    
})();
