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
                let deferred = $q.defer();
            
                if(response.data.hasOwnProperty('birds')){
                    collection = JSON.stringify(response.data.birds);
                    console.log("save birds collection");
                    sessionStorage.setItem(Constants.BIRDS_STORAGE, collection);
                    deferred.resolve();
                }else{
                    collection = JSON.stringify(response.data.spots);
                    sessionStorage.setItem(Constants.SPOTS_STORAGE, collection);
                    deferred.resolve();
                }
                return deferred.Promise;
            },
            
            getList: function(url){
                let list = null;
                 if(url === Constants.BIRDS_URL){
                        list = JSON.parse(sessionStorage.getItem(Constants.BIRDS_STORAGE));
                        return $q.resolve(list);
                }else{
                        list = JSON.parse(sessionStorage.getItem(Constants.SPOTS_STORAGE));
                        return $q.resolve(list);
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
                return $q.resolve(response.data.message);
            },
            
            //user saved in loginService.js
            getUser: function(){
                return JSON.parse(sessionStorage.getItem(Constants.USER_STORAGE));
            }
        }
    }      
})();

