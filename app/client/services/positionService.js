
'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('PositionService', PositionService)
    
    PositionService.$inject = ['$q', '$window', '$geolocation', 'Constants']
    
    function PositionService($q, $window, $geolocation, Constants){
        let position = {};
        let deferred = $q.defer();
        return {
            
            supported: function(){
                return 'geolocation' in $window.navigator;
            },
            getUserPosition: function(){
                
                if(!this.supported()){
                    deferred.reject('Din webbläsare stödjer inte geolocation.');  
                }
                
                let geoLocation = $geolocation;
                geoLocation.getCurrentPosition()
                .then((pos) =>{
                    position = {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                    }

                    if(pos.coords.error){
                        deferred.reject('Det går inte att hämta din position för tillfället.');      
                    }
                    deferred.resolve(position);
                 });
                
                return deferred.promise;
              }  
        }
    }      
})();
