'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('searchBird', searchBird)
    
    searchBird.$inject = ['Constants', 'ApiService']
    
    function searchBird(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/searchBirdView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
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
                   
            }
        }
     }
    
})();