'use strict';

    
angular.module('birdSpotterApp')
     .controller('HeaderController', 
                 [
                    'constants', 
                    '$location', 
                    '$window', 
                    '$scope', 
                    'LoginService', 
                    'PositionService',
                    headerController
                ]); 
 
function headerController(constants, $location, $window, $scope, LoginService, PositionService){
    let vm = this;
    vm.showAddSpotView = false;
    
    vm.login = function(){
        if($window.sessionStorage.user === undefined){
            $location.path(constants.LOGIN_PATH);
        }else{
            LoginService.logout();
        }   
    }
    
    vm.showAddSpotPanel = function(){
        console.log(vm.showAddSpotView);
        vm.showAddSpotView = true;
    }
    
    vm.closeAddSpotPanel = function(){
        vm.showAddSpotView = false;
    }
}
    
