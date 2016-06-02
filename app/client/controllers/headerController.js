'use strict';

    
angular.module('birdSpotterApp')
     .controller('HeaderController', ['constants', '$location', 'LoginService', headerController]); 
    
    function headerController(constants, $location, LoginService){
        let vm = this;
        vm.userLoggedIn = LoginService.isUserLoggedIn();
        
        console.log(vm.userLoggedIn);
        
        vm.login = function(){
            $location.path( "/login" );
        }
        
        vm.addSpot = function(){
            $location.path( "/ny_spot" );
        }
 
    }

