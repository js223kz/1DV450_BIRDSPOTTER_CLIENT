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
                scope.user = ApiService.getUser();
                
                scope.closeAccountPanel = (()=>{
                    scope.showAccountView = false;
                });
                
                scope.userSpots = ((spot)=>{
                    return (spot.birdspotterid === scope.user.id);
                });
                
                   
            }
        }
     }
    
})();
