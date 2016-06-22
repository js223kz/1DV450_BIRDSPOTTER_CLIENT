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
            
            saveCollection: function(response){
                let collection = undefined;
            
                if(response.data.hasOwnProperty('birds')){
                    collection = JSON.stringify(response.data.birds);

                    sessionStorage.setItem(Constants.BIRDS_STORAGE, collection);
                    return $q.resolve();
                }else{
                    collection = JSON.stringify(response.data.spots);
                    sessionStorage.setItem(Constants.SPOTS_STORAGE, collection);
                    return $q.resolve();
                }
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
            
            responseError: function(error){
                return $q.reject(error.data);
            },
            
            responseSuccess: function(response){
                console.log(response.data.message);
                return $q.resolve(response.data.message);
            }
        }
    }      
})();

