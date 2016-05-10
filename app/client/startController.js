'use strict';

(function(){
    
angular.module('birdSpotterApp')
     .controller('startController', [ '$scope', 'constants', startController]);  

    function startController($scope, constants){
        $scope.map = L.map('map').setView([60, 17], 5);
        $scope.message = false;

        L.tileLayer(constants.TRAFFICLAYER, {
            attribution: constants.ATTRIBUTION
        }).addTo($scope.map);
        
    }
}());