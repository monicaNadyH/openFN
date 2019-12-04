
angular.module('packageDetailModule', [])
.controller('PackageDetailCtrl', function($scope, $state, $stateParams, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicPopover, $ionicLoading, SharedData){
	
	$scope.data = SharedData.currentUser;
	$scope.model={numPersons : 3, descriptionNumLimit: 325};
	
	console.log("$stateParams: "+JSON.stringify($stateParams));
	$scope.$stateParams = $stateParams;
	
	//get search results array from the shared data service
	$scope.model.searchResultsArray = SharedData.searchResults;
	
	$scope.model.packageDetail = SharedData.getLocationAndPackageDetail($stateParams.packageId);
	//console.log(JSON.stringify($scope.model.packageDetail));
	
	//console.log($scope.model.packageDetail.imageId);
	
	
	//$scope.numPersons = $stateParams.numPersons;
	
	$scope.buyPackage = function(){
		$state.go("app.buyPackage",{packageId:$stateParams.packageId, numPersons: $scope.model.numPersons});
	}
	
	$scope.showPackageDetail = function(packageId){
		$state.go('app.packageDetail',{packageId:packageId});
	}
	
	$scope.getRatingArr = function(n){
		return new Array(n);
	};
	
});