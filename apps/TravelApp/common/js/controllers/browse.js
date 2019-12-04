angular.module('browseModule', [])
.controller('BrowseCtrl', function($scope, $state, $stateParams, $timeout, SharedData, AdapterFactory){

    
    $scope.doRefresh = function() {
    	var lat = 32.9422269;
		var lon = -96.9941577;
		var username = SharedData.currentUser.username;
		
		console.log("sending location update event to APIM adapter. username= "+username+" lat="+lat+" lon="+lon);
		
		var params = {'params': [SharedData.currentUser.username, lat, lon]};
	    var promise = AdapterFactory.callAdapter($scope, "APIMAdapter", "locationUpdate", WLResourceRequest.POST, params, null);
	    promise.then(function(result) {
	    	if(result.responseJSON.isSuccessful===true){
	    		//console.log(result.responseJSON);
	    		console.log(JSON.stringify(result.responseJSON));	
	    	}
	        $scope.$broadcast('scroll.refreshComplete');
	    }, function(error) {
	        $scope.$broadcast('scroll.refreshComplete');
	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
	    });
    };
    
    $scope.doRefresh();
	
});

