'use strict';

    
angular.module('birdSpotterApp')
     .controller('LoginController', ['constants', 'ApiService', 'CacheService', '$location', loginController]);  

    function loginController(constants, ApiService, CacheService, $location){
       
        
        console.log("login");
 
    }
