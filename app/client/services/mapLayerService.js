'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('LayerService', LayerService)
    
    LayerService.$inject = ['Constants', 'MarkerService']
    
    function LayerService(Constants, MarkerService){
        
        return{
            //plots all markers
            showAllMarkers: function(birdSpots){
                let markers = [];
                birdSpots.forEach((item) =>{
                    console.log(item);
                   let marker = MarkerService.createMarker(item);
                       markers.push(marker);
                });

                if(!markers){
                    return null
                }
                return L.layerGroup(markers);
            }
            
            
        }
    }      
})();

