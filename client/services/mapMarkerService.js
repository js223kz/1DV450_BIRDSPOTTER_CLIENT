'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('MarkerService', MarkerService)
    
    MarkerService.$inject = ['Constants', '$q', '$http']
    
    function MarkerService(Constants, $q, $http){
        
        return{
            createMarker: function(item){
                let marker = L.marker([item.latitude, item.longitude]);
                return marker;
            },
            
            //show popup depending on user choice
            showPopup: function(clickedItem){
                let latLng = [clickedItem.latitude, clickedItem.longitude],
                    popupInfo = this.setPopupInfo(clickedItem),
                    popup = L.popup().setContent(popupInfo).setLatLng(latLng);
                    return popup;       
            },
            
            setIcon: function(){
                let marker = L.icon({
                    iconSize: [25, 41],
                    iconAnchor: [12, 41]
                });
                return marker;
            },
            
            setPopupInfo: function(item){
                /*let date = new Date(item.createddate),
                    formattedDate = $filter('date')(date, 'yyyy-MM-dd hh:mm'),
                    category = setCategory(item.category),
                    description =  item.description,
                    title = item.title,
                    exactlocation = item.exactlocation;


                return '<p class="popup_title">' + title + ' ' + 
                    exactlocation + '</p><p class="popup_description">' +
                    '<p class= "date">Skapad: ' + formattedDate + '</p>' +
                    '<p class= "category">Kategori: ' + category + 
                    '</p>' + description +'</p>';*/
            }
            
            
        }
    }      
})();

