'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myLogin', myLogin)
    
    myLogin.$inject = ['Constants', 'LoginService']
    
    function myLogin(Constants, LoginService){
        return {
        restrict: 'E',
        templateUrl: 'views/partials/loginForm.html',
        link: function(scope) {
            
            scope.closeLogin = (()=>{
                scope.showLoginView = false;
            });
            
            scope.login = ((email, pwd)=>{
                LoginService.tryToLogin(email, pwd)
                    .then(scope.successfullLogin)
                    .catch(scope.errorMessage);
            });
            
            scope.successfullLogin = (()=>{
                scope.loggedIn = LoginService.getUser();
                scope.closeLogin();
            });
        }
      }
    }
    
})();

