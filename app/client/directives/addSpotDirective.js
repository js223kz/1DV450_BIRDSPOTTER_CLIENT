'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAddSpot', myAddSpot)
    
    myAddSpot.$inject = ['Constants', 'PositionService', 'ApiService']
    
    function myAddSpot(Constants, PositionService, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/addSpotView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
                scope.query = null;
                scope.showSearchResult = false;
                scope.selectedBirds = [];
                
                scope.success = null;
                let userPosition = undefined;
                
                scope.regex = function(value){
                     return '/^' + value + '/';
                }
                
                scope.updateSearchValue = function(){
                    //if one spot is successfully saved
                    //hide success message when user wants 
                    //to add a new spot
                    scope.success = "";
                    
                    if(scope.query.length > 0){
                        scope.showSearchResult = true;
                    }else{
                       scope.showSearchResult = false;
                    }
                }
               
                scope.addBirdToSpot = function(bird){
                    scope.selectedBirds.push({name: bird.birdName, id: bird.id});
                }
                
                //opens a new form to add a new bird to list
                scope.addNewBirdToList = function(){
                    scope.showAddSpotView = false;
                    scope.showAddBirdView = true;
                    scope.query = "";
                    scope.success = "";
                }
                
                scope.spotSavedMessage = ((message)=>{
                    scope.success = message;
                    
                });
                scope.resetSpotForm = (()=>{
                    scope.selectedBirds = [];
                    scope.query = null;
                });

                
                scope.saveSpot = (()=>{
                    let birds = [];
                    let auth = ApiService.getUser();
                    let errorMessage = 'Du måste godkänna att vi får använda din position.'+
                        'Utan den går det inte att registrera en ny birdspot.'
                    
                    if(scope.userPosition === undefined){
                        scope.errorMessage(errorMessage);
                        PositionService.getCurrentPosition()
                        
                        //functions in parent directive
                        .then(scope.setCurrentPosition)
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
                        .then(scope.spotSavedMessage)
                        .then(scope.resetSpotForm)
                        .then(scope.updateList(Constants.SPOTS_URL))
                        
                        //error message function in parent directive
                        .catch(scope.errorMessage);
                    }
                });

                scope.closeAddSpotView = (()=>{
                    scope.resetSpotForm();
                    scope.showAddSpotView = false;
                });
                   
            }
        }
     }
    
})();
