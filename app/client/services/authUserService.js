"use strict";
angular.module('birdSpotterApp')
     .factory('AuthUserService', ['constants', '$q', '$http', '$base64', authUserService]);  
   
    function authUserService(constants, $q, $http, $base64){
         let deferred = $q.defer();
        return{
                tryToLogin: tryToLogin,
            };

        function tryToLogin(email, pwd){
            let credentials = $base64.encode(email+':'+ pwd);
            return $http({
                method: 'POST',
                url: constants.LOGIN_URL + credentials,
                headers: {}
            })
            .then(successfulLogin)
            .catch(failedLogin);

        }
        
        function successfulLogin(response){
            console.log(response.data);
        }
        
        function failedLogin(response){
            console.log(response);
        }

         
    }