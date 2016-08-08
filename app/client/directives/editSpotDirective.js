'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('editSpot', editSpot)
    
    editSpot.$inject = ['Constants', 'ApiService']
    
    function editSpot(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/editSpotView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
        
                scope.showAddNewBirdPanel = false;
                
                scope.deleteBird = ((birdIndex)=>{
                     scope.selectedBirds.splice(birdIndex, 1);
                 });
                
                scope.addNewBird = (()=>{
                    scope.showAddNewBirdPanel = true;
                });
                
                scope.closeEditSpotPanel = (()=>{
                    scope.selectedBirds = [];
                    scope.showAddNewBirdPanel = false;
                    scope.showEditSpotPanel = false;
                });
                
                scope.saveChanges = (()=>{
                    scope.selectedSpot.birds = [];
                    
                    //get id:s of selected birds
                    scope.selectedBirds.forEach((bird)=>{
                        scope.selectedSpot.birds.push(bird.id);
                    });
                    
                    scope.selectedSpot.birds = scope.selectedSpot.birds.toString();  
                    
                    
                    ApiService.editSpot(scope.selectedSpot)
                    .then(scope.successMessage)
                    .then(scope.updateList(Constants.SPOTS_URL))
                    .then(scope.closeEditSpotPanel)
                    .catch(scope.errorMessage);
                   
                });
            }
        }
     }
    
})();
