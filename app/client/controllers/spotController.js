'use strict';

    
angular.module('birdSpotterApp')
     .controller('SpotController', ['constants', 'ApiService', spotController]);  

    function spotController(constants, ApiService){
        let vm = this;
        console.log("spotcontroller");
    }
