"use strict";
angular.module('birdSpotterApp')
     .factory('ApiService', ['constants', '$q', '$http', apiService]);  

    function apiService(constants, $q, $http){
        let deferred = $q.deferred;
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
            console.log(response);
            /*let trafficInfo = response.data.sr.messages.message;
            let defaultDescription = constants.DEFAULT_DESCRIPTION;
            let defaultExactLocation = '';
            let infoArray = [];


            trafficInfo.forEach((item) =>{
                if(Object.keys(item.description).length == 0){
                    item.description = defaultDescription;
                }

                if(Object.keys(item.exactlocation).length == 0){
                    item.exactlocation = defaultExactLocation;
                } 
            });
            sessionStorage.setItem(constants.TRAFFICINFO_STORAGE, JSON.stringify(trafficInfo));
            sessionStorage.setItem(constants.LATESTUPDATE_STORAGE, Date.now());
            deferred.resolve();
            return deferred.promise;*/

        }

        function responseError(response){
            //check which kind of response status
            return $q.reject('Kan inte hämta trafikinformation.' + response.status);
        }
    }