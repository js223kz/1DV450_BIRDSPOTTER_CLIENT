'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('MarkerService', MarkerService)
    
    MarkerService.$inject = ['Constants', '$q', '$http', '$filter']
    
    function MarkerService(Constants, $q, $http, $filter){
        
        return{
            createMarker: function(item){
                let popupInfo = this.setPopupInfo(item),
                    marker = L.marker([item.latitude, item.longitude]).bindPopup(popupInfo);
                return marker;
            },
            
            setIcon: function(){
                let marker = L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                });
                return marker;
            },
            
            setPopupInfo: function(item){
               let  date = new Date(item.createdAt),
                    formattedDate = $filter('date')(date, 'yyyy-MM-dd hh:mm'),
                    latitude = item.latitude,
                    longitude =  item.longitude,
                    birds = item.birds,
                    htmlString = '';

                htmlString += '<p class="popup_title">' + 'Skapad: ' + formattedDate + '<br>' + 
                    'Latitud: ' + latitude + '<br>' + 'Longitud: ' + longitude + '</p>' + 
                    '<ul class="popup_birds"' 
                
                item.birds.forEach((bird)=>{
                    htmlString += '<li>' + bird.birdName + '</li>'
                });
                
                htmlString += '</ul>';
                return htmlString;
            }
            
            
        }
    }      
})();

