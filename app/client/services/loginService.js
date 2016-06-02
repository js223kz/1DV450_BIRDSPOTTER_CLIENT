"use strict";
angular.module('birdSpotterApp')
     .factory('LoginService', ['constants', '$q', '$http', '$base64','$window', '$location', loginService]);  
   
    function loginService(constants, $q, $http, $base64, $window, $location){
        let deferred = $q.defer();
        //$rootScope.loggedInUser = null;
        
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
            $window.sessionStorage.setItem(constants.USER_STORAGE, JSON.stringify(response));
            $location.path(constants.HOME_PATH);
        }
        
        function failedLogin(response){
            deferred.reject(response);
            return deferred.promise;
        }
        
        function logout(){
            $window.sessionStorage.removeItem(constants.USER_STORAGE);
            $window.location.href = constants.HOME_PATH;
        }
        
         return{
            tryToLogin: tryToLogin,
            logout: logout
        };
    }