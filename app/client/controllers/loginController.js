'use strict';

    
angular.module('birdSpotterApp')
     .controller('LoginController', ['constants', '$window', 'LoginService', loginController]);  

    
    function loginController(constants, $window, LoginService){
        let vm = this;
        
        vm.login = function(){
            LoginService.tryToLogin(vm.email, vm.password)
                .then(loggedIn)
                .catch(showErrorMessage);
        }
        
        function loggedIn(response){
            //let user = JSON.parse(sessionStorage.getItem(constants.USER_STORAGE));
            //console.log(user.username);
            $window.location.href = "/";
           //$location.reload( "/" );
        }
        
        function showErrorMessage(response){
            console.log(response.status);
        }
 
    }
