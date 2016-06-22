'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myHeader', myHeader)
    
    myHeader.$inject = ['LoginService', 'PositionService']
    
    function myHeader(LoginService, PositionService){
        return {
            restrict: 'E',
            templateUrl: 'partials/headerView.html',
            require: '^myParentDirective',
            link: function(scope) {

                scope.showLoginView = function(){
                    scope.showLogin = true;
                };
                
                scope.logout = function(){
                    LoginService.logout();
                    scope.loggedIn = false;
                };
                
                scope.showAddSpotView = function(){
                    PositionService.getUserPosition()
                    
                        //functions in parent directive
                        .then(scope.setUserPosition)
                        .catch(scope.errorMessage);
                };
            }
        }
     }   
})();
  