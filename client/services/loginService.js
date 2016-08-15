'use strict';

(function(){
    angular.module('BirdSpotterApp').factory('LoginService', LoginService)
    
    LoginService.$inject = ['Constants', '$q', '$http', '$base64']
    
    function LoginService(Constants, $q, $http, $base64){
        
        return{
            tryToLogin: function(email, pwd){
                let credentials = $base64.encode(email+':'+ pwd);
                return $http({
                    method: 'POST',
                    url: Constants.LOGIN_URL + credentials,
                    headers: {}
                })
                .then(this.successfulLogin)
                .catch(this.failedLogin);

            },
            
            successfulLogin: function(response){
                let user = {
                    token: response.data.token,
                    id: response.data.id,
                    username: response.data.username,
                    email: response.data.email
                }
                sessionStorage.setItem(Constants.USER_STORAGE, JSON.stringify(user));
                return $q.resolve();
            },

            failedLogin: function(response){
                return $q.reject(response.data);
            },

            logout: function(){
                sessionStorage.removeItem(Constants.USER_STORAGE);
            },
            
            getUser: function(){
                return JSON.parse(sessionStorage.getItem(Constants.USER_STORAGE));
            }
            
            
        }
    }      
})();
