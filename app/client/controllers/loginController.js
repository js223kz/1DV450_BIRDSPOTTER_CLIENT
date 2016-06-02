'use strict';

    
angular.module('birdSpotterApp')
     .controller('LoginController', ['constants', '$location', 'LoginService',  loginController]);  

    
function loginController(constants, $location, LoginService){
    let vm = this;
    vm.errorMessage = '';

    vm.login = function(email, password){
        LoginService.tryToLogin(email, password)
            .then()
            .catch(showErrorMessage);           
    }

    function showErrorMessage(response){
        vm.errorMessage = 'Felaktiga inloggningsuppgifter.';       
    }

}
