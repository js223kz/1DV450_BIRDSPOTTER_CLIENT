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
                $scope.spotList = null;
                $scope.error = null;


                if(sessionStorage.getItem(Constants.USER_STORAGE) === null){
                    $scope.loggedIn = false;
                }else{
                    $scope.loggedIn = true;
                }

                $scope.updateList = ((url)=>{
                    ApiService.getCollection(url)
                    .then(()=>{
                        $scope.setList(url);
                    })
                    .catch($scope.errorMessage);

                });
                
                $scope.setList = ((url)=>{
                    if(url === Constants.BIRDS_URL){
                        $scope.birdList = JSON.parse(sessionStorage.getItem(Constants.BIRDS_STORAGE));
                    }else{
                        $scope.spotList = JSON.parse(sessionStorage.getItem(Constants.SPOTS_STORAGE));
                        console.log($scope.spotList);
                    }
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
                  
                  scope.updateList(Constants.BIRDS_URL);
                  scope.updateList(Constants.SPOTS_URL);
            }
        }
    }
}
    
})();

