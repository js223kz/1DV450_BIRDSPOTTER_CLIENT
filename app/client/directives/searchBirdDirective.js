'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('searchBird', searchBird)
    
    searchBird.$inject = ['Constants', 'ApiService']
    
    function searchBird(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/searchBirdView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
                
                   
            }
        }
     }
    
})();
