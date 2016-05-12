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
            .then(saveResponse)
            .catch(responseError);

        }

         function saveResponse(response){
            let birds = JSON.stringify(response.data.birds);
            sessionStorage.setItem(constants.BIRDS_STORAGE, birds);
            deferred.resolve();
            return deferred.promise;
        }

        function responseError(response){
            //check which kind of response status
            return $q.reject('Kan inte hämta trafikinformation.' + response.status);
        }
    }