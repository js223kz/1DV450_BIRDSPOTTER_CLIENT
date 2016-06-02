"use strict";
angular.module('birdSpotterApp')
     .factory('LoginService', ['constants', '$q', '$http', '$base64', loginService]);  
   
    function loginService(constants, $q, $http, $base64){
        let deferred = $q.defer();
        let userInfo;
        
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
            userInfo = JSON.stringify(response.data);
            sessionStorage.setItem(constants.USER_STORAGE, userInfo);
            deferred.resolve(response);
            return deferred.promise;
        }
        
        function failedLogin(response){
            deferred.reject(response);
            return deferred.promise;
        }
        
        function logout(){
            let user = sessionStorage.getItem(constants.USER_STORAGE);
            user = null;
        }
        
        function isUserLoggedIn(){
            return JSON.parse(sessionStorage.getItem(constants.USER_STORAGE));
        }
        
         return{
            tryToLogin: tryToLogin,
            isUserLoggedIn: isUserLoggedIn
        };
    }