'use strict';


export default class StartController {
  constructor() {
    this.name = "Bobby Tables";
      console.log("det funkar på något sätt");
  }
}


/*(function(){
    
angular.module('birdSpotterApp')
     .controller('StartController', ['constants', 'ApiService', startController]);  

    function startController(constants, ApiService){
        let vm = this;
        let map= L.map('map').setView([60, 17], 5);
     
         L.tileLayer(constants.TRAFFICLAYER, {
            attribution: constants.ATTRIBUTION
        }).addTo(map);
        
        ApiService.getCollection(constants.BIRDS_URL);
        
        
        
    }
}());*/
