'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myMap', myMap)
    
    myMap.$inject = ['Constants', 'ApiService', 'LayerService', '$timeout']
    
    function myMap(Constants, ApiService, LayerService, $timeout){
        return{
            restrict: 'E',
            templateUrl: 'partials/mapView.html',
            require: '^myParentDirective',
            link: function(scope,elem,attr){
                scope.trafficInfoList = [];
              
                //set lat and long + zoom for map
                scope.map = L.map('map').setView([60, 17], 5);


                //Set layer on map with tribute to map supplier
                let layer = L.tileLayer(Constants.TRAFFICLAYER, {
                    attribution: Constants.ATTRIBUTION
                    }).addTo(scope.map);
                
                scope.setMarkers = (()=>{
                    let markers = LayerService.showAllMarkers(scope.spotList);
                    scope.map.addLayer(markers);
                });

                if(scope.spotList !== null){
                    scope.setMarkers();
                }else{
                    $timeout(scope.setMarkers, 10000);
                }
                
                
            } 
            
            
        }
     }
    
})();
