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
    vm.showSearchResult = false;
    vm.birds = undefined;  
    vm.selectedBirds = [];
    vm.userPosition = undefined;
    vm.errorMessage = undefined;
    
    
    
    vm.login = function(){
        if($window.sessionStorage.user === undefined){
            $location.path(constants.LOGIN_PATH);
        }else{
            LoginService.logout();
        }   
    }
    
    function setCurrentPosition(pos){
        vm.userPosition = pos.coords;
    }
    
    function showErrorMessage(error){
        vm.errorMessage = error;
    }
    

    vm.showAddSpotPanel = function(){
        vm.addSpot = true;
        vm.birds = JSON.parse(sessionStorage.getItem(constants.BIRDS_STORAGE));
        PositionService.getCurrentPosition()
            .then(setCurrentPosition)
            .catch(showErrorMessage);    
    }
    
    vm.closeAddSpotPanel = function(){
        vm.addSpot = false;
    }
    
    vm.regex = function(value){
        return '/^' + value + '/';
    }
    
    vm.updateSearchValue = function(){
        if(vm.query.length > 0){
            vm.showSearchResult = true;
        }else{
           vm.showSearchResult = false; 
        }
    }
    
    vm.addBirdToSpot = function(bird){
        vm.selectedBirds.push({name: bird.birdName, id: bird.id});
        console.log(bird);
    }
    
    
}
    
