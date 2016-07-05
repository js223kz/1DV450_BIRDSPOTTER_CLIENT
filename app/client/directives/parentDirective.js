'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myParentDirective', myParentDirective)
    
    myParentDirective.$inject = ['Constants', 'ApiService', '$q']
    
    function myParentDirective(Constants, ApiService, $q){
      return {
            restrict: 'E',
            scope: true,
            priority: 1000,
            controller: (($scope)=>{
                $scope.showLogin = false;
                $scope.showAddSpot = false;
                $scope.showAddBird = false;
                $scope.userPosition = null;
                $scope.birdList =  null;
                $scope.error = null;


                if(sessionStorage.getItem(Constants.USER_STORAGE) === null){
                    $scope.loggedIn = false;
                }else{
                    $scope.loggedIn = true;
                }

                 $scope.updateBirdlist = (()=>{
                    ApiService.getCollection(Constants.BIRDS_URL)
                    .then($scope.setBirdList)
                    .catch($scope.errorMessage);

                });

                $scope.setBirdList = (()=>{
                    $scope.birdList = JSON.parse(sessionStorage.getItem(Constants.BIRDS_STORAGE));
                    return $q.resolve($scope.birdList);
                });

                $scope.errorMessage = ((error)=>{
                    return $scope.error = error;
                });


                $scope.setUserPosition = ((position)=>{
                        $scope.userPosition = position;
                        $scope.showAddSpot = true;
                });
         }),
          link: {
              pre: function(scope,elem,attr){
                
                ApiService.getCollection(Constants.BIRDS_URL)
                    .then(ApiService.getCollection(Constants.SPOTS_URL))
                    .then(scope.setBirdList)
                    .catch(scope.errorMessage);
            }
        }
    }
}
    
})();

