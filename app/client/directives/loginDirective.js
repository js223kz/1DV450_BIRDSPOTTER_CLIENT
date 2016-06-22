'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myLogin', myLogin)
    
    myLogin.$inject = ['Constants', 'LoginService']
    
    function myLogin(Constants, LoginService){
        return {
        restrict: 'E',
        require: '^myParentDirective',
        templateUrl: 'partials/loginView.html',
        link: function(scope) {
            
            scope.closeLogin = function(){
              scope.showLogin = false;
            };
            
            scope.login = function(email, pwd){
                LoginService.tryToLogin(email, pwd)
                    .then(scope.successfullLogin)
                    .catch(scope.errorMessage);
            };
            
            scope.successfullLogin = function(){
                scope.loggedIn = true;
                scope.closeLogin();
            }
        }
      }
     }
    
})();

