
/* JavaScript content from js/app.js in folder common */
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angular.filter', 'SharedData', 'adapterFactoryModule' ,'loginModule', 'searchModule', 
                           'packageDetailModule', 'buyPackageModule', 'browseModule', 'paymentCompletedModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    /*if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }*/
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	
  $ionicConfigProvider.views.swipeBackEnabled(false);
	
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl'
      }
    }
  })
  .state('app.packageDetail', {
    url: '/packageList/:packageId',
    views: {
      'menuContent': {
        templateUrl: 'templates/packageDetail.html',
        controller: 'PackageDetailCtrl'
      }
    }
  })
  .state('app.buyPackage', {
    url: '/packageList/:packageId/:numPersons/buyPackage',
    views: {
      'menuContent': {
        templateUrl: 'templates/buyPackage.html',
        controller: 'BuyPackageCtrl'
      }
    }
  })
  .state('app.paymentCompleted', {
    url: '/packageList/:packageId/buyPackage/paymentCompleted',
    views: {
      'menuContent': {
        templateUrl: 'templates/paymentCompleted.html',
        controller: 'PaymentCompletedCtrl'
      }
    }
  })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'BrowseCtrl'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    .state('app.feedback', {
      url: '/feedback',
      views: {
        'menuContent': {
          templateUrl: 'templates/feedback.html',
          controller: 'FeedbackCtrl'
        }
      }
    })
    .state('app.feedbackCompleted', {
      url: '/feedbackCompleted',
      views: {
        'menuContent': {
          templateUrl: 'templates/feedbackCompleted.html',
          controller: 'FeedbackCompletedCtrl'
        }
      }
    })
    .state('app.loginAPIM', {
      url: '/loginAPIM',
      views: {
        'menuContent': {
          templateUrl: 'templates/loginAPIM.html',
          controller: 'loginCtrl'
        }
      }
    });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/loginAPIM');
  
})
.controller("AppCtrl", function($scope, $rootScope, $state, $ionicHistory, $ionicPopup, $timeout, SharedData){
	
	$rootScope.$on("$stateChangeSuccess",
            function(event, toState, toParams, fromState, fromParams){
    	//console.log("stateChangeSuccess");
        g_callDemoCenter();
    });
	
	
	$scope.data = {
		currentUser: SharedData.sample.currentUser
	};
	
	
    $scope.getCurrentPage = function(){
        return $state.current.name;
    };
    
    $scope.logout = function(){
    	$state.go("app.loginAPIM")
    	.then(function(){
    		$ionicHistory.clearHistory();
    	});
    };

    $scope.formatDate = function(dateStr){   
        return moment(dateStr).format("YYYY-MM-DD"); 
    };
    
    $scope.getTimeAgo = function(dateStr){
    	return moment(dateStr).fromNow();
    };
    
    $scope.launchSearch = function(question){
    	//check for email in shared data, else don't auto login
    	if(SharedData.currentUser.username && SharedData.currentUser.username!=""){
    		$state.go("app.search");
    	}else{
    		$state.go("app.loginAPIM");
    	}
    }
	
}).controller("SettingsCtrl", function($scope, $rootScope, $state, $ionicHistory, $ionicPopup, $timeout, SharedData){
	
     $scope.watsonSearchServiceChange = function() {
       console.log('watsonSearchServiceChange ', $scope.watsonSearchService.checked);
       SharedData.settings.offline.watsonSearch = $scope.watsonSearchService.checked;
     };
     
     $scope.watsonSearchService = { checked: SharedData.settings.offline.watsonSearch };
    
}).controller("FeedbackCtrl", function($scope, $rootScope, $state, $ionicHistory, $ionicLoading, SharedData, AdapterFactory){
	
	$scope.model = {
			overallSat: 0,
			recommendFriends: 0,
			similarTrip: 0,
			customerService: 0,
			purchases: {
				restaurant1: 0,
				restaurant2: 0,
				restaurant3: 0,
				restaurant4: 0
			}
			
	}
	
	$scope.submitFeedback = function(){
		
		$ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
		//receiver, numOfActivities, type, contractID, description, dollarAmount, pointsToTransfer
		var params = {'params': [ SharedData.sample.currentUser.blockchainID,
	                          "4", //number of activities provided in the feedback
	                          "Earned", //type of points transfer
	                          SharedData.blockchainContractIDFeedback,
	                          "OpenTravel - Points for feedback of package and activities",
	                          "0", //dollar amount of the transaction
	                          "1000" //points to transfer
   	                         ]
   				};
   	
	    var promise = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "transferPoints", WLResourceRequest.GET, params, null);
	    promise.then(function(result) {
	    	$ionicLoading.hide();
	    	console.log(JSON.stringify(result.responseJSON));
   		
	    	if(result.responseJSON.isSuccessful===true){
	    		$state.go("app.feedbackCompleted");
	    		/*if(result.responseJSON.status==="created"){
	    			console.log("Feedback success");
	    			$state.go("app.feedbackCompleted");
	    			
	    		}else{
	    			console.log("Feedback failed");
	    			
	    			$state.go("app.feedbackCompleted");
	    		}*/
	    		
	    		
	    	}
	    }, function(error) {
	    	$ionicLoading.hide();
	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
//	    	WL.SimpleDialog.show(
//	    			"Error", error.errorCode +": "+error.errorMsg, 
//	    			[{text: "OK", handler: function() {return;}}]
//	    		);
	    	$state.go("app.feedbackCompleted");
	    });
    
	}
   
}).controller("FeedbackCompletedCtrl", function($scope, $rootScope, $state, $ionicHistory, $ionicLoading, SharedData, AdapterFactory){
	
	//fetch points balance and transaction list
	console.log("FeedbackCompletedCtrl:: start");
	
	$scope.model = {
			totalPoints: "",
			pointsEarned: 1400
	}
	
	$ionicLoading.show({
        template: '<ion-spinner></ion-spinner>'
    });
	
	$scope.refreshPoints = function() {
		
		console.log("refreshPoints:: start");
        var params = {'params': [SharedData.sample.currentUser.blockchainID]};
        var promise = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "getCustomerPoints", WLResourceRequest.GET, params, null);
        promise.then(function(result) {
        	$ionicLoading.hide();
        	if(result.responseJSON.isSuccessful===true){
        		console.log(result.responseJSON);
        		
        		$scope.model.totalPoints = result.responseJSON.Balance;
        	}
        	
        	$scope.$broadcast('scroll.refreshComplete');
        	
        }, function(result) {
        	$ionicLoading.hide();
        	$scope.$broadcast('scroll.refreshComplete');  
        	console.log("error "+ result.errorCode +" "+result.errorMsg);
        	WL.SimpleDialog.show(
	    			"Error", "Unable to retrieve OpenPoints balance. "+result.errorCode +" "+result.errorMsg, 
	    			[{text: "OK", handler: function() {return;}}]
	    		);
	    	
        });
        
    }
    $scope.refreshPoints();
	
		
   
});
