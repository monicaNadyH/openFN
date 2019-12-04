
/* JavaScript content from js/controllers/paymentCompleted.js in folder common */

angular.module('paymentCompletedModule', [])
.controller('PaymentCompletedCtrl', function($scope, $state, $stateParams, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicPopover, $ionicLoading, SharedData){
	
	console.log("packageId is "+$stateParams.packageId);
	
	$scope.model = {
			searchResultsArray: null,
			packageDetail: null
	};
	//get search results array from the shared data service
	$scope.model.searchResultsArray = SharedData.searchResults;
	
	$scope.model.packageDetail = SharedData.getLocationAndPackageDetail($stateParams.packageId);
	
	$scope.showPackageDetail = function(packageId){
		$state.go('app.packageDetail',{packageId:packageId});
	}
	
});