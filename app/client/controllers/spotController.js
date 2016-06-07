'use strict';

    
angular.module('birdSpotterApp')
     .controller('SpotController', ['constants', 'ApiService', spotController]);  

    function spotController(constants, ApiService){
        let vm = this;
        vm.showSearchResult = false;
        vm.showAddNewBirdView = false;
        vm.showAddSpotView = true;
        vm.birds = undefined;  
        vm.selectedBirds = [];
        vm.userPosition = undefined;
        vm.errorMessage = undefined;

       
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

        vm.addNewBirdToList = function(){
            vm.showAddSpotView = false;
            vm.showAddNewBirdView = true;
        }

        vm.addBirdToSpot = function(bird){
            vm.selectedBirds.push({name: bird.birdName, id: bird.id});
            console.log(bird);
        }
    
    }
/*vm.birds = JSON.parse(sessionStorage.getItem(constants.BIRDS_STORAGE));
        PositionService.getCurrentPosition()
            .then(setCurrentPosition)
            .catch(showErrorMessage); 

function setCurrentPosition(pos){
        vm.userPosition = pos.coords;
    }
    
    function showErrorMessage(error){
        vm.errorMessage = error;
    }*/