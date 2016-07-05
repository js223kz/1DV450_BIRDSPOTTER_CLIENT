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
                
                
                scope.resetForm = (()=>{
                    scope.birdName = "";
                    scope.latinName = "";
                    scope.regularity = "";
                    scope.success = null;
                    scope.addNewBirdForm.$setPristine();
                });
                
                
                scope.closeAddBirdView = (() =>{
                    scope.showAddSpot= true;
                    scope.showAddBird = false;
                    scope.resetForm();
                });
                
                //update value to hide and show error message properly
                scope.updateDropdownValue = (() =>{ 
                    if(scope.regularity === null){
                        scope.regularityNotValid = true;
                    }else{
                         scope.regularityNotValid = false;
                    }
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
                        .then(scope.successMessage)
                        .then(scope.updateBirdlist)
                        
                        //error message function in parent directive
                        .catch(scope.errorMessage)
                    }
                });
                
                scope.successMessage = ((message)=>{
                    scope.success = message;
                });
                
                
            },
        }
     }
    
})();

