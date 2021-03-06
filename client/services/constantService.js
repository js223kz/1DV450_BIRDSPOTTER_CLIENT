(function(){
    
    angular.module('BirdSpotterApp')
        .constant('Constants', {
        
            //map
            MAPLAYER: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ATTRIBUTION: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            
            //Api-urls
            SPOTS_URL: '/spots',
            BIRDS_URL: '/birds',
            LOGIN_URL: '/login/',
            POSITION_URL: 'spots/position',
            
            //Seessionstorage
            BIRDS_STORAGE: 'birds',
            SPOTS_STORAGE: 'spots',
            USER_STORAGE: 'user',
            POSITION_STORAGE: 'position',
        
            //map
            TRAFFICLAYER: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ATTRIBUTION: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',

            REGULARITIES: [
                            'B - arter som regelbundet häckar i Sverige',
                            'b - arter vars status som regelbunden häckningsfågel är osäker',
                            'M - flyttfåglar som uppträder i Sverige på regelbunden basis',
                            'R - tillfälliga gäster som anträffats i mer än 100 exemplar'
                          ]
        
        });
}());
