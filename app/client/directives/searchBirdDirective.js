'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('searchBird', searchBird)
    
    searchBird.$inject = ['Constants', 'ApiService']
    
    function searchBird(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'views/partials/searchBirdView.html',
            link: function(scope, elem, attrs){
                                
                /*scope.regex = function(value){
                     return '/^' + value + '/';
                }*/
                
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
                
                scope.birdExists = ((id)=>{
                    return scope.selectedBirds.some((bird)=>{
                        return bird.id === id;
                    })
                });
               
                scope.addBirdToSpot = function(bird){
                    if(scope.birdExists(bird.id)){
                        scope.errorMessage("Fågeln är redan registrerad i din spot");
                    }else{
                        scope.errorMessage("");
                        scope.selectedBirds.push({name: bird.birdName, id: bird.id});
                    }
                        
                        
                }
                   
            }
        }
     }
    
})();
