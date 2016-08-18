'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myLogin', myLogin)
    
    myLogin.$inject = ['Constants', 'LoginService', '$location']
    
    function myLogin(Constants, LoginService, $location){
        return {
        restrict: 'E',
        templateUrl: 'views/partials/loginForm.html',
        link: function(scope) {
            
            scope.closeLogin = (()=>{
               $location.path('/');
            });
            scope.error = null;
        
            scope.errorMessage = ((error)=>{
                return scope.error = error;
            });

            scope.login = ((email, pwd)=>{
                LoginService.tryToLogin(email, pwd)
                    .then(scope.successfullLogin)
                    .catch(scope.errorMessage);
            });
            
            scope.successfullLogin = (()=>{
                $location.path('/');
            });
        }
      }
    }
    
})();

