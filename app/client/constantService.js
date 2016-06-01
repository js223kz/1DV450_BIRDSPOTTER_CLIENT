(function(){
    
    angular.module('birdSpotterApp')
        .constant('constants', {
            TRAFFICLAYER: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            ATTRIBUTION: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            SPOTS_URL: '/spots',
            BIRDS_URL: '/birds',
            LOGIN_URL: '/login/',
            BIRDS_STORAGE: 'birds',
            SPOTS_STORAGE: 'spots',
            USER_STORAGE: 'user'
            
        });
}());
