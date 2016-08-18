'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('ApiService', ApiService)
    
    ApiService.$inject = ['Constants', '$q', '$http']
    
    function ApiService(Constants, $q, $http){
        
        return{
            getCollection: function(url){
                return $http({
                    method: 'GET',
                    url: url,
                    headers: {}
                })
                .then(this.saveCollection)
                .catch(this.responseError);
            },
            
            getSpotsByDistance: function(object){
                var deferred = $q.defer();
                return $http({
                    method: 'GET',
                    url: Constants.POSITION_URL,
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    params: {lat: object.latitude, lng: object.longitude, offset: object.offset}
                })
                .then(this.returnData)
                .catch(this.responseError);
            },
            
            saveCollection: function(response){
                let collection = undefined;
                let deferred = $q.defer();
                            
                if(response.data.hasOwnProperty('birds')){
                    collection = JSON.stringify(response.data.birds);
                    sessionStorage.setItem(Constants.BIRDS_STORAGE, collection);
                    deferred.resolve();
                }else{
                    collection = JSON.stringify(response.data.spots);
                    sessionStorage.setItem(Constants.SPOTS_STORAGE, collection);
                    deferred.resolve();
                }
                return deferred.Promise;
            },
            
            getCachedList: function(url){
                let list = null;
                 if(url === Constants.BIRDS_URL){
                        list = JSON.parse(sessionStorage.getItem(Constants.BIRDS_STORAGE));
                        
                }else{
                        list = JSON.parse(sessionStorage.getItem(Constants.SPOTS_STORAGE));
                }
                 return list;
            },
            
            saveItem: function(object, token, url){
                return $http({
                    method: 'POST',
                    url: url,
                    headers: {
                        "Authorization" : token,
                        "Content-Type": 'application/json'
                    },
                    data: { object: object }
                })
                .then(this.responseSuccess)
                .catch(this.responseError);

            },
            
            editSpot: function(spot, user){
                return $http({
                method: 'PUT',
                url: Constants.SPOTS_URL + '/' + spot.id,
                headers: {
                    "Authorization" : user.token,
                    "Content-Type": 'application/json'
                },
                data: { object: spot }
                })
                .then(this.responseSuccess)
                .catch(this.responseError);
                
            },
            
            
            deleteSpot: function(spotId, user){
                
                return $http({
                    method: 'DELETE',
                    url: Constants.SPOTS_URL + "/" + spotId,
                    headers: {
                        "Authorization" : user.token,
                        "Content-Type": 'application/json'
                    }
                })
            .then(this.responseSuccess)
            .catch(this.responseError);
            },
            
            returnData: function(response){
                return response.data.spots;       
            },
            
            responseError: function(error){
                console.log("error" + error.data);
                return error.data;
            },
            
            responseSuccess: function(response){
                return response.data.message;
            }
            
            
        }
    }      
})();