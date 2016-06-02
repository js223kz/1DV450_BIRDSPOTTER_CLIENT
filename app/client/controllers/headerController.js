'use strict';

    
angular.module('birdSpotterApp')
     .controller('HeaderController', ['constants', '$location', '$window', 'LoginService', headerController]); 
 
function headerController(constants, $location, $window, LoginService){
    let vm = this;
    
    vm.login = function(){
        if($window.sessionStorage.user === undefined){
            $location.path(constants.LOGIN_PATH);
        }else{
            LoginService.logout();
        }   
    }

    vm.addSpot = function(){
        $location.path(constants.NEWSPOT_PATH);
    }
}
