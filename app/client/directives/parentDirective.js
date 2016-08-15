'use strict';

(function(){
    angular.module('BirdSpotterApp').directive('myParentDirective', myParentDirective)
    
    myParentDirective.$inject = ['Constants', 'ApiService', '$q']
    
    function myParentDirective(Constants, ApiService, $q){
      return {
            restrict: 'E',
            scope: true,
            priority: 2000,
            controller: (($scope)=>{
                $scope.showLoginView = false;
                $scope.showAddSpotView = false;
                $scope.showAddBirdView = false;
                $scope.showAccountView = false;
                $scope.selectedSpot = null;
                $scope.selectedBirds = [];
                
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
                        ApiService.getList(url).then((list)=>{
                            $scope.birdList = list;
                            console.log($scope.birdList);
                        })
                    }else{
                        ApiService.getList(url).then((list)=>{
                            $scope.spotList = list;
                            console.log($scope.spotList);
                        })
                    }
                });

                
                $scope.errorMessage = ((error)=>{
                    return $scope.error = error;
                });
                
                $scope.successMessage = ((success)=>{
                    return $scope.success = success;
                });


                $scope.setUserPosition = ((position)=>{
                        $scope.userPosition = position;
                        $scope.showAddSpotView = true;
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