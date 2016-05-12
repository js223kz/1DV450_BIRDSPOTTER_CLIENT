"use strict";
angular.module('birdSpotterApp')
     .factory('ApiService', ['constants', '$q', '$http', apiService]);  
   
    function apiService(constants, $q, $http){
         let deferred = $q.defer();
        return{
                getCollection: getCollection,
            };

        function getCollection(url){
            return $http({
                method: 'GET',
                url: url,
                headers: {}
            })
            .then(saveCollection)
            .catch(responseError);

        }

         function saveCollection(response){
            let collection = undefined;
            
             if(response.data.hasOwnProperty('birds')){
                collection = JSON.stringify(response.data.birds);
                sessionStorage.setItem(constants.BIRDS_STORAGE, collection);
                deferred.resolve();
            }else{
                collection = JSON.stringify(response.data.spots);
                sessionStorage.setItem(constants.SPOTS_STORAGE, collection);
                deferred.resolve();
            }
            return deferred.promise;
        }

        function responseError(response){
            //check which kind of response status
            return $q.reject('Kan inte hämta trafikinformation.' + response.status);
        }
    }