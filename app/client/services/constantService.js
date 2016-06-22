(function(){
    
    angular.module('BirdSpotterApp')
        .constant('Constants', {
        
            //map
            TRAFFICLAYER: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ATTRIBUTION: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            
            //Api-urls
            SPOTS_URL: '/spots',
            BIRDS_URL: '/birds',
            LOGIN_URL: '/login/',
            
            //Seessionstorage
            BIRDS_STORAGE: 'birds',
            SPOTS_STORAGE: 'spots',
            USER_STORAGE: 'user',
            POSITION_STORAGE: 'position',
        
            REGULARITIES: [
                            'B - arter som regelbundet häckar i Sverige',
                            'b - arter vars status som regelbunden häckningsfågel är osäker',
                            'M - flyttfåglar som uppträder i Sverige på regelbunden basis',
                            'R - tillfälliga gäster som anträffats i mer än 100 exemplar'
                          ]
        
        });
}());
