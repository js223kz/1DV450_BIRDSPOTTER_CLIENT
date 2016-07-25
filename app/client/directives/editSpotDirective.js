'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('editSpot', editSpot)
    
    editSpot.$inject = ['Constants', 'ApiService']
    
    function editSpot(Constants, ApiService){
        return{
            restrict: 'E',
            templateUrl: 'partials/editSpotView.html',
            require: '^myParentDirective',
            link: function(scope, elem, attrs){
                 scope.deleteBird = ((bird)=>{
                     scope.selectedSpot.birds.splice(bird, 1);
                 });
            }
        }
     }
    
})();
