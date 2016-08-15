'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('editSpot', editSpot)
    
    editSpot.$inject = ['Constants', 'ApiService']
    
    function editSpot(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'views/partials/editSpotForm.html',
            link: function(scope, elem, attrs){
        
                scope.showAddNewBirdPanel = false;
                
                scope.deleteBird = ((birdIndex)=>{
                     scope.selectedBirds.splice(birdIndex, 1);
                 });
                
                scope.addNewBird = (()=>{
                    scope.showAddNewBirdForm = true;
                });
                
                scope.closeEditSpotForm = (()=>{
                    scope.selectedBirds = [];
                    scope.showAddNewBirdPanel = false;
                    scope.showEditSpotPanel = false;
                });
                
                scope.saveChanges = (()=>{
                    scope.selectedSpot.birds = [];
                    if(scope.selectedBirds.length === 0){
                        scope.errorMessage("Din spot måste innehålla minst en fågel.");
                        return;
                    }
                    
                    //get id:s of selected birds
                    scope.selectedBirds.forEach((bird)=>{
                        scope.selectedSpot.birds.push(bird.id);
                    });
                    
                    scope.selectedSpot.birds = scope.selectedSpot.birds.toString();  
                    
                    
                    ApiService.editSpot(scope.selectedSpot, scope.user)
                        .then(scope.successMessage)
                        .then(scope.updateList(Constants.SPOTS_URL))
                        .then(scope.closeEditSpotForm)
                        .catch(scope.errorMessage);
                   
                });
            }
        }
     }
    
})();
