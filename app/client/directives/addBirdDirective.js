'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAddBird', myAddBird)
    
    myAddBird.$inject = ['Constants', 'ApiService']
    
    function myAddBird(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/addBirdView.html',
            link: function(scope, elem, attrs){
                scope.regularities = Constants.REGULARITIES;
                scope.regularityNotValid = false;
                scope.success = null;
                scope.error = scope.errorMessage;
                
                
                scope.resetBirdForm = (()=>{
                    scope.birdName = "";
                    scope.latinName = "";
                    scope.regularity = "";
                    scope.addNewBirdForm.$setPristine();
                });

                
                scope.closeAddBirdView = (() =>{
                    scope.showAddSpot= true;
                    scope.showAddBird = false;
                    scope.success = "";
                    scope.resetBirdForm();
                });
         
                scope.saveBird = (() =>{
                    
                    if(scope.regularity === null){
                        scope.regularityNotValid = true;
                    }else{
                        let auth = JSON.parse(sessionStorage.getItem(Constants.USER_STORAGE));
                        let bird = {
                            name: scope.birdName,
                            latin: scope.latinName,
                            regularity: scope.regularity.charAt(0), //get the first letter of string eg B
                        }
                                                
                       ApiService.saveItem(bird, auth.token, Constants.BIRDS_URL)
                        .then(scope.birdSavedMessage)
                        .then(scope.resetBirdForm)
                        .then(scope.updateList(Constants.BIRDS_URL))
                       
                        
                        //error message function in parent directive
                        .catch(scope.errorMessage);
                    }
                });
                
                scope.birdSavedMessage = ((message)=>{
                    scope.success = message;
                });
                
                
            },
        }
     }
    
})();

