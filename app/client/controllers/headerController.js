'use strict';

    
angular.module('birdSpotterApp')
     .controller('HeaderController', ['constants', 'ApiService', 'CacheService', '$location', headerController]);  

    function headerController(constants, ApiService, CacheService, $location){
        let vm = this;
        
        vm.login = function(){
            $location.path( "/login" );
        }
 
    }

