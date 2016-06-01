'use strict';

    
angular.module('birdSpotterApp')
     .controller('LoginController', ['constants', '$location', 'LoginService', loginController]);  

    
    function loginController(constants, $location, LoginService){
        let vm = this;
        
        vm.login = function(){
            LoginService.tryToLogin(vm.email, vm.password)
                .then(loggedIn)
                .catch(showErrorMessage);
        }
        
        function loggedIn(response){
            //let user = JSON.parse(sessionStorage.getItem(constants.USER_STORAGE));
            //console.log(user.username);
           $location.path( "/" );
        }
        
        function showErrorMessage(response){
            console.log(response.status);
        }
 
    }
