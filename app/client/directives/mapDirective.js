'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myMap', myMap)
    
    myMap.$inject = ['Constants', 'ApiService']
    
    function myMap(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/mapView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
                scope.trafficInfoList = [];
                scope.selectedLayer = undefined;

                //set lat and long + zoom for map
                scope.map = L.map('map').setView([60, 17], 5);


                //Set layer on map with tribute to map supplier
                let layer = L.tileLayer(Constants.TRAFFICLAYER, {
                    attribution: Constants.ATTRIBUTION
                    }).addTo(scope.map);
            }
        }
     }
    
})();
