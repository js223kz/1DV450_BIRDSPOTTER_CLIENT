'use strict';

    
angular.module('birdSpotterApp')
     .controller('HeaderController', ['constants', '$location', headerController]);  

    function headerController(constants, $location){
        let vm = this;
        
        vm.login = function(){
            $location.path( "/login" );
        }
        
        vm.addSpot = function(){
            $location.path( "/ny_spot" );
        }
 
    }

