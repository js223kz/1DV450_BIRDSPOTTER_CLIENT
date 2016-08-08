'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myHeader', myHeader)
    
    myHeader.$inject = ['LoginService', 'PositionService', '$location']
    
    function myHeader(LoginService, PositionService, $location){
        return {
            restrict: 'E',
            templateUrl: 'partials/headerView.html',
            require: '^myParentDirective',
            link: function(scope) {

                scope.showLoginPanel = (()=>{
                    scope.showLoginView = true;
                });
                                   
                scope.logout = (()=>{
                    LoginService.logout();
                    scope.loggedIn = false;
                });

                scope.showAddSpotPanel = (()=>{
                    scope.showAccountView = false;
                    PositionService.getUserPosition()
                    
                        //functions in parent directive
                        .then(scope.setUserPosition)
                        .catch(scope.errorMessage);
                });
                                    
                scope.showAccountPanel = (()=>{
                    scope.showAddSpotView = false;
                    scope.showAccountView = true;
                });
            }
        }
     }   
})();
  