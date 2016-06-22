'use strict';

    
angular.module('birdSpotterApp')
     .controller('SpotController', ['constants', 'PositionService', 'ApiService', spotController]);  

    function spotController(constants, PositionService, ApiService){
        let vm = this;
        let auth = JSON.parse(sessionStorage.getItem(constants.USER_STORAGE));
        vm.showSearchResult = false;
        vm.showAddNewBirdPanel = false;
        vm.showAddSpotPanel = true;
        vm.birds = JSON.parse(sessionStorage.getItem(constants.BIRDS_STORAGE));
        vm.selectedBirds = [];
        vm.userPosition = undefined;
        vm.errorMessage = undefined;
        vm.successMessage = undefined;
        vm.regularities = undefined;
        vm.dropDown = {
            default: 'Välj regularitet'
        };
        

        
        function showErrorMessage(message){
            vm.errorMessage = message;
        }
        
        function showSuccessMessage(message){
            vm.selectedBirds = [];
            vm.successMessage = message;
        }
        
        function setCurrentPosition(pos){
            vm.errorMessage = undefined;
            vm.userPosition = pos.coords; 
        }
        
        PositionService.getCurrentPosition()
                .then(setCurrentPosition)
                .catch(showErrorMessage); 
                    
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
            vm.showAddSpotPanel = false;
            vm.showAddNewBirdPanel = true;
            vm.regularities = constants.REGULARITIES;
        }

        vm.addBirdToSpot = function(bird){
            vm.selectedBirds.push({name: bird.birdName, id: bird.id});
        }
        
        vm.addSpot = function(){
            let birds = [];
            if(vm.userPosition === undefined){
                showErrorMessage('Du måste godkänna att vi får använda din position. Utan den går det inte att registrera en ny birdspot.');
                
                PositionService.getCurrentPosition()
                    .then(setCurrentPosition)
                    .catch(showErrorMessage); 
            }else{
                 if(vm.selectedBirds.length === 0){
                    showErrorMessage('Du måste lägga till minst en fågel.');
                    return;
                }
                //get id:s of selected birds
                vm.selectedBirds.forEach(function(item){
                    birds.push(item.id);
                });

                 let spot = {
                    latitude: vm.userPosition.latitude,
                    longitude: vm.userPosition.longitude,
                    birdspotter: auth.data.id,
                    bird: birds.toString()                       
                }
                

                 ApiService.saveItem(JSON.stringify(spot), auth.data.token, constants.SPOTS_URL)
                    .then(showSuccessMessage)
                    .catch(showErrorMessage);
            }
        }
        
        vm.closeAddNewBirdPanel = function(){
            vm.showAddSpotPanel = true;
            vm.showAddNewBirdPanel = false;
            console.log("click");
        }
        
        vm.saveNewBird = function(){
            console.log("spara fågel");
        }
    }

    