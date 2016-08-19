'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myAddBird', myAddBird)
    
    myAddBird.$inject = ['Constants', 'ApiService', 'LoginService']
    
    function myAddBird(Constants, ApiService, LoginService){
        return{
            restrict: 'E',
            templateUrl: 'views/partials/addBirdForm.html',
            link: function(scope, elem, attrs){
                scope.regularities = Constants.REGULARITIES;
                scope.regularityNotValid = false;
                
                scope.resetBirdForm = (()=>{
                    scope.birdName = "";
                    scope.latinName = "";
                    scope.regularity = "";
                    scope.addNewBirdForm.$setPristine();
                });

                
                scope.closeAddBirdForm = (() =>{
                    scope.showAddBirdForm = false;
                    scope.success = "";
                    scope.resetBirdForm();
                });
         
                scope.saveBird = (() =>{
                    
                    if(scope.regularity === null){
                        scope.regularityNotValid = true;
                    }else{
                        let auth = LoginService.getUser();
                        let bird = {
                            name: scope.birdName,
                            latin: scope.latinName,
                            regularity: scope.regularity.charAt(0), //get the first letter of string eg B
                        }
                                                
                       ApiService.saveItem(bird, auth.token, Constants.BIRDS_URL)
                        .then(scope.successMessage)
                        .then(scope.resetBirdForm)
                        .then(scope.updateList(Constants.BIRDS_URL))
                       
                        
                        //error message function in parent directive
                        .catch(scope.errorMessage);
                    }
                });    
            },
        }
     }
    
})();

