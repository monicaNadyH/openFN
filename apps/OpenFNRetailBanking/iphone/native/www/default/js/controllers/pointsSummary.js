
/* JavaScript content from js/controllers/pointsSummary.js in folder common */
angular.module('pointsSummaryModule', ['angularMoment'])
.controller('PointsSummaryCtrl', function($scope, $state, $stateParams, $timeout, $ionicLoading, $ionicSideMenuDelegate, SharedData, AdapterFactory){
	
	$ionicSideMenuDelegate.canDragContent(false);
	
    $scope.model = {
    		memberID: SharedData.sample.currentUser.blockchainID,
    		points: "",
    		activitiesArray: [],
    		contractsArray:[],
    		numTransactions:""
    }
    
	//fetch points balance and transaction list
	console.log("PointsSummaryCtrl:: start");
	
	$scope.refreshPoints = function() {
		console.log("refreshPoints:: start");
		
		$ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
		
        var params = {'params': [SharedData.sample.currentUser.blockchainID]};
        var promise = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "getCustomerPoints", WLResourceRequest.GET, params, null);
        promise.then(function(result) {
        	$ionicLoading.hide();
        	if(result.responseJSON.isSuccessful===true){
        		console.log(result.responseJSON);
        		$scope.model.memberID = result.responseJSON.UserId;
        		$scope.model.points = result.responseJSON.Balance;
        		$scope.model.numTransactions = result.responseJSON.NumberOfTransactions;
        	}
        	
        	$scope.$broadcast('scroll.refreshComplete');
        	
        }, function(result) {
        	$ionicLoading.hide();
        	$scope.$broadcast('scroll.refreshComplete');  
        	console.log("error "+ result.errorCode +" "+result.errorMsg);
        	WL.SimpleDialog.show(
	    			"Error", "Unable to retrieve customer points. "+result.errorCode +": "+result.errorMsg, 
	    			[{text: "OK", handler: function() {return;}}]
	    		);
        });
        
        var promise1 = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "getTransactions", WLResourceRequest.GET, params, null);
        promise1.then(function(result) {
        	
        	if(result.responseJSON.isSuccessful===true){
        		console.log(result.responseJSON);
        		$scope.model.activitiesArray = result.responseJSON.transactions;
        	}
        	
        	$scope.$broadcast('scroll.refreshComplete');
        	
        }, function(result) {
        	
        	$scope.$broadcast('scroll.refreshComplete');  
        	console.log("error "+ result.errorCode +" "+result.errorMsg);
	    	  
	    	  WL.SimpleDialog.show(
		    			"Error", "Unable to retrieve points/activities. "+result.errorCode +": "+result.errorMsg, 
		    			[{text: "OK", handler: function() {return;}}]
		    		);
        	  
        });
        
        var promise2 = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "getSmartContracts", WLResourceRequest.GET, params, null);
        promise2.then(function(result) {
        	
        	if(result.responseJSON.isSuccessful===true){
        		console.log(result.responseJSON);
        		$scope.model.contractsArray = result.responseJSON.array;
        	}
        	
        	$scope.$broadcast('scroll.refreshComplete');
        	
        }, function(result) {
        	
        	$scope.$broadcast('scroll.refreshComplete');  
        	console.log("error "+ result.errorCode +" "+result.errorMsg);
	    	  
	    	  WL.SimpleDialog.show(
		    			"Error", "Unable to retrieve smart contracts. "+result.errorCode +": "+result.errorMsg, 
		    			[{text: "OK", handler: function() {return;}}]
		    		);
        	  
        });
        
    }
    $scope.refreshPoints();
    
    $scope.showTransactions = function(){
		$state.go('app.tabs.points_detail');
	}
	
	
});

