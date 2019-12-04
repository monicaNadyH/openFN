
angular.module('searchModule', [])
.controller('SearchCtrl', function($scope, $state, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicPopover, $ionicLoading, SharedData, AdapterFactory){
	
	$scope.model = {
			question: "Which Caribbean island is the best destination for a winter vacation with children?",
			showPopup: true
	}
	
	$scope.data = SharedData.currentUser;
	$scope.searchResultsArray = [];
	
	//$ionicNavBarDelegate.showBackButton(false);
	
	/*$scope.packageList = [
	                    { title: 'Ocho Rios #1', id: 1 },
	                    { title: 'Cayman Island #2', id: 2 },
	                    { title: 'Barbados #3', id: 3 }
	                  ];
	*/
		
    $scope.search = function(){
		$scope.searchResultsArray = [];
		$ionicLoading.show({
            template: '<ion-spinner></ion-spinner>'
        });
		
		var displayResults = function(responseJSON){
    		//console.log(result.responseJSON);
    		//console.log(JSON.stringify(result.responseJSON));
    		$scope.searchResultsArray = responseJSON.docs;
    		SharedData.searchResults = responseJSON.docs;	
    		    
		};
	
		//Check if offline mode is enabled and return offline json response
		if(!!SharedData.settings.offline.watsonSearch){
			$timeout(function(){
				$ionicLoading.hide();
				displayResults(g_WatsonRnRSearch);
	    	}, 1000);
			return;
		}
		
		
		var params = {'params': [$scope.model.question]};
	    var promise = AdapterFactory.callAdapter($scope, "WatsonRnRAdapter", "getPackages", WLResourceRequest.GET, params, null);
	    promise.then(function(result) {
	    	$ionicLoading.hide();
	    	if(!!result.responseJSON.isSuccessful){
	    		displayResults(result.responseJSON);
	    	}
	    }, function(error) {
	    	$ionicLoading.hide();
	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
	    	WL.SimpleDialog.show(
	    			"Error", error.errorCode +": "+error.errorMsg, 
	    			[{text: "OK", handler: function() {return;}}]
	    		);
	    });
    }
	
	$scope.showPackageDetail = function(packageId){
		$state.go('app.packageDetail',{packageId:packageId});
	}
	
	$scope.getRatingArr = function(n){
		return new Array(n);
	};
	
	if($scope.model.question && $scope.model.question.trim()!=""){
		$scope.search();
	}
	
	
	
});