(function(){
    
    angular.module('birdSpotterApp')
        .constant('constants', {
        
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
        
            //Paths
            HOME_PATH: '/',
            LOGIN_PATH: '/login',
            NEWSPOT_PATH: '/ny_spot',
        
        });
}());
