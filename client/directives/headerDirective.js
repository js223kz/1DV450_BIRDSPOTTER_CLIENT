'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myHeader', myHeader)
    
    myHeader.$inject = ['LoginService', '$location']
    
    function myHeader(LoginService, $location){
        return {
            restrict: 'E',
            templateUrl: 'views/partials/headerView.html',
            link: function(scope) {
                
                scope.showLoginView = null;

                scope.goToLogin = (()=>{
                    $location.path('/login');
                });
                
                scope.goToAccount = (()=>{
                    $location.path('/account');
                });
                                   
                scope.logout = (()=>{
                    LoginService.logout();
                    scope.loggedIn = false;
                });
                
                scope.goToAddSpot = (()=>{
                    $location.path('/addSpot');
                });
               
                scope.showAccountPanel = (()=>{
                    scope.showAddSpotView = false;
                    scope.showAccountView = true;
                });
            }
        }
     }   
})();
  