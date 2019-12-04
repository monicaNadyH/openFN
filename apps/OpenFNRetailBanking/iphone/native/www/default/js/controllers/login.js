
/* JavaScript content from js/controllers/login.js in folder common */
angular.module('loginModule', [])
.controller('LoginCtrl', function($scope, $rootScope, LoginService, $state, $stateParams, $timeout, $ionicLoading, $ionicPopup, $ionicViewSwitcher, SharedData, AdapterFactory){
 	$scope.model = {
 			username: 'natalie_smith',
 			password: 'password123'
 	};
 	
 	$scope.setUsername = function(username){
 		$scope.model.username = username;
 	}
 	
 	$scope.receivedNotification = function(){
		$state.go('app.tabs.tab1');
	};
	
	//called from outside angular scope when launch offers is triggered 
	$scope.setConversationStartContext = function(){
		console.log('setConversationStartContext');
		SharedData.session.startContext.event.text = 'move';
		$rootScope.$broadcast('external.event');
	}
	
	$scope.showOverviewWithOffer = function(){
		console.log('showOverviewWithOffer::From Login');
		SharedData.session.startContext.event.text = 'show_offer';
		//$scope.showConversation();
		$rootScope.$broadcast('external.event');
		//$state.go('app.tabs.tab0');
		$scope.login();
	}
 	
    $scope.login = function() {
    	    	
    	LoginService.loginUser($scope.model.username, $scope.model.password).success(function(data) {
    		
    		//refresh shared data's current user based on new username 
        	SharedData.refreshCurrentUser($scope.model.username);
        	
    		$ionicLoading.show({
				template: 'Logging in...'
			});
			$timeout(function() {
				//$state.go('app.tabs');
				$state.go('app.conversation'); //changed from app.tabs 06/05/2017
				$ionicLoading.hide();
				
			}, 1000);
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Invalid username or password.'
            });
        });
    };
    
    $scope.$on('$ionicView.enter', function(event, data){
    	console.log('Login $ionicView.enter');
    	if(WL){
    		WL.App.hideSplashScreen();
    	}
    	
    });
    
    
    
});