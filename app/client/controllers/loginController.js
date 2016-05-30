'use strict';

    
angular.module('birdSpotterApp')
     .controller('LoginController', ['constants', '$location', 'AuthUserService', loginController]);  

    function loginController(constants, $location, AuthUserService){
        let vm = this;
        
        vm.login = function(){
            AuthUserService.tryToLogin(vm.email, vm.password);
        }
        
        //info@marcus.se:hallojsa
 
    }
