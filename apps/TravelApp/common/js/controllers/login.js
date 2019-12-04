
angular.module('loginModule', [])
.controller('loginCtrl', function($scope, $state, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicPopover, $ionicLoading, SharedData){
	
	
	
	$ionicSideMenuDelegate.canDragContent(false);
	//$ionicNavBarDelegate.showBar(false);
	
	$scope.data = SharedData.currentUser;
	
	$scope.view = {
			loginInProgress: false
	};
	
	$scope.doLogin = function(){
		localStorage.setItem("username",$scope.data.username);
		SharedData.currentUser.username = $scope.data.username;
		
        $scope.view.loginInProgress = true;
        
        $ionicLoading.show({
            template: 'Logging in...'
        });
        
    	$timeout(function(){
    		SharedData.currentUser = $scope.data;
    		$state.go("app.search");
    		$ionicLoading.hide();
    	}, 2000);
    };
    
    
	
});