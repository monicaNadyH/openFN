
/* JavaScript content from js/controllers/buyPackage.js in folder common */

angular.module('buyPackageModule', [])
.controller('BuyPackageCtrl', function($scope, $window, $state, $stateParams, $timeout, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicPopover, $ionicLoading, SharedData, AdapterFactory){
	
	
	$scope.model = {
			openPointsBalance: "",
			applyPointsForPurchase: 0,
			passcode: "182097",
			showOpenPay: false,
			touchIDResult: "",
			paymentInfo:{
				accountName: "",
				accountLast4Digits: "",
				accessToken: ""
			}
			
	};
	
	$scope.$on("$ionicView.afterLeave", function(event, data){
		$scope.model.showOpenPay=false;
	});
	
	$scope.setTouchIDResult = function(str){
		console.log("setTouchIDResult::"+str);
		//$scope.model.touchIDResult=str;
		if(str==="success" || str==="touchidUnavailable"){ //ignore touch ID auth if it is not available on demo devices. Proceed with payment.
    	   	//$scope.model.showOpenPay=false;
    	   	//$scope.model.touchIDResult="";
    	   	
    	   /*$timeout(function() {
    		   $state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
    		    }, 0);
    	   	*/
    	   	
    	   	$ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
    	   	
    	   	
    	   	//Note - If the APIM call fails, errors are being ignored and payment confirmation is being displayed for demo purposes. 
    	   	
    	   	/*var params = {'params': ["4147202108664444"]};
	   	    var promise = AdapterFactory.callAdapter($scope, "APIMAdapter", "cardAuthorization", WLResourceRequest.GET, params, null);
	   	    promise.then(function(result) {
	   	    	$ionicLoading.hide();
   	    		console.log(JSON.stringify(result.responseJSON));
   	    		
	   	    	if(result.responseJSON.isSuccessful===true){
	   	    		
	   	    		if(result.responseJSON.card_authorization_request_accepted===true){
	   	    			console.log("card transaction authorization accepted");
	   	    			$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    		}else{
	   	    			console.log("card transaction authorization rejected");
	   	    			
	   	    			$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    		}
	   	    		
	   	    	}
	   	    }, function(error) {
	   	    	$ionicLoading.hide();
	   	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
//	   	    	WL.SimpleDialog.show(
//	   	    			"Error", error.errorCode +": "+error.errorMsg, 
//	   	    			[{text: "OK", handler: function() {return;}}]
//	   	    		);
	   	    	$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    });*/
    	   	
    	   	var params = {'params': [$scope.model.paymentInfo.accessToken, 
    	   	                         SharedData.blockchainContractIDDoublePoints, 
    	   	                         $scope.model.payTotal()+"", 
    	   	                         $scope.model.applyPointsForPurchase+"",
    	   	                         "",
    	   	                         $scope.model.passcode+""
    	   	                         ]
    	   				};
    	   	
    	   	console.log("submitting payment::"+JSON.stringify(params));
    	   	
	   	    var promise = AdapterFactory.callAdapter($scope, "APIMAdapter", "submitPayment", WLResourceRequest.GET, params, null);
	   	    promise.then(function(result) {
	   	    	$ionicLoading.hide();
   	    		console.log(JSON.stringify(result.responseJSON));
   	    		
	   	    	if(result.responseJSON.isSuccessful===true){
	   	    		
	   	    		if(result.responseJSON.status==="created"){
	   	    			console.log("Payment ACCEPTED");
	   	    			$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    		}else{
	   	    			console.log("Payment FAILED");
	   	    			
	   	    			//$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   		   	    	WL.SimpleDialog.show(
	   	    			"Error", "Payment could not be completed.", 
	   	    			[{text: "OK", handler: function() {return;}}]
	   		   	    	);
	   	    			
	   	    		}
	   	    		
	   	    	}
	   	    }, function(error) {
	   	    	$ionicLoading.hide();
	   	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
//	   	    	WL.SimpleDialog.show(
//	   	    			"Error", error.errorCode +": "+error.errorMsg, 
//	   	    			[{text: "OK", handler: function() {return;}}]
//	   	    		);
	   	    	$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    });
    	   
    	   
    	   
       }else if(str==="failure"){
    	   WL.SimpleDialog.show(
	    			"Error", "TouchID verification failed.", 
	    			[{text: "OK", handler: function() {return;}}]
	    		);
       }
	}
	
	/*$scope.$watch('model.touchIDResult', function(newVal, oldVal) {
	       console.log('oldVal='+oldVal+" newVal="+newVal);
	       if(newVal==="success"){
	    	   	//$scope.model.showOpenPay=false;
	    	   	//$scope.model.touchIDResult="";
	    	   	
	    	   $timeout(function() {
	    		   $state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	    		    }, 0);
	    	   	
	    	   	
	    	   	$ionicLoading.show({
	                template: '<ion-spinner></ion-spinner>'
	            });
	    	   	
	    	   	var params = {'params': ["4147202108664444"]};
		   	    var promise = AdapterFactory.callAdapter($scope, "APIMAdapter", "cardAuthorization", WLResourceRequest.GET, params, null);
		   	    promise.then(function(result) {
		   	    	$ionicLoading.hide();
	   	    		console.log(JSON.stringify(result.responseJSON));
	   	    		
		   	    	if(result.responseJSON.isSuccessful===true){
		   	    		
		   	    		if(result.responseJSON.card_authorization_request_accepted===true){
		   	    			console.log("card transaction authorization accepted");
		   	    			$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
		   	    		}else{
		   	    			console.log("card transaction authorization rejected");
		   	    			WL.SimpleDialog.show(
				   	    			"Payment not approved", "Card authorization failed - transaction was not approved.", 
				   	    			[{text: "OK", handler: function() {return;}}]
				   	    		);
		   	    		}
		   	    		
		   	    	}
		   	    }, function(error) {
		   	    	$ionicLoading.hide();
		   	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
		   	    	WL.SimpleDialog.show(
		   	    			"Error", error.errorCode +": "+error.errorMsg, 
		   	    			[{text: "OK", handler: function() {return;}}]
		   	    		);
		   	    });
	    	   
	    	   
	    	   
	       }else if(newVal==="failure"){
	    	   WL.SimpleDialog.show(
		    			"Error", "TouchID verification failed.", 
		    			[{text: "OK", handler: function() {return;}}]
		    		);
	       }
	      
	   });*/
	
	$scope.cancel = function(){
		$scope.model.showOpenPay=false;
	};
	
	$scope.showPayment = function(){
		$scope.model.showOpenPay=true;
	};
	
	/*$scope.paymentAuth = function(){
		//travel app client id = 1234567891
		//redirect back to the travel app after authorization opentravel://opentravelapp/payment
		var redirectURL = "https://api-e.mybluemix.net/travelapp/confirmation.html";
		var encodedRedirectURL = encodeURIComponent(redirectURL);
		console.log("redirectURL="+redirectURL);
		console.log("encodedRedirectURL="+encodedRedirectURL);
		var oAuthURL= "https://api-e.mybluemix.net/oauth2/authorize?"+
		"response_type=token&client_id=1234567892&redirect_uri="+ encodedRedirectURL +"&scope=payments&state=payment";
		$window.open(oAuthURL, "_system");
	}
	
	$scope.setPaymentAuth = function(accessToken,acctName,acctNum){
		//console.log(accessToken+acctName+acctNum);
		$scope.$apply(function(){
			$scope.model.paymentInfo.accountName = acctName;
			$scope.model.paymentInfo.accountLast4Digits = acctNum;
			$scope.model.paymentInfo.accessToken = accessToken;
			$scope.model.showOpenPay=true;
		});
	}*/
	
	$scope.paymentAuth = function(){
		
		if($scope.model.applyPointsForPurchase > $scope.model.openPointsBalance){
			WL.SimpleDialog.show(
   	    			"Insufficient points", "Purchase points cannot be greater than available points.", 
   	    			[{text: "OK", handler: function() {return;}}]
   	    		);
			return;
		}
		//oAuthLogin();
		
		//check if OAuth2 token exists and it is valid
		var token = SharedData.sample.currentUser.payment.accessToken;
		if(!token || token===""){
			oAuthLogin();
			return;
		}else{
			
			$ionicLoading.show({
                template: '<ion-spinner></ion-spinner>'
            });
			
			//check token validity
			var params = {'params': [SharedData.sample.currentUser.username, token]};
    	   	
	   	    var promise = AdapterFactory.callAdapter($scope, "APIMAdapter", "initializePayment", WLResourceRequest.GET, params, null);
	   	    promise.then(function(result) {
	   	    	$ionicLoading.hide();
   	    		console.log("initialize payment response::"+ JSON.stringify(result.responseJSON));
   	    		
	   	    	if(result.responseJSON.isSuccessful===true){
	   	    		//check for valid token field
	   	    		if(result.responseJSON.status==="initialized" || result.responseJSON.status==="ready"){
	   	    			console.log("Payment Initialization was successful.");
	   	    			//$scope.setPaymentAuth(token,SharedData.sample.currentUser.payment.accountName,SharedData.sample.currentUser.payment.accountLast4Digits);
	   	    			$scope.model.paymentInfo.accountName = SharedData.sample.currentUser.payment.accountName;
						$scope.model.paymentInfo.accountLast4Digits = SharedData.sample.currentUser.payment.accountLast4Digits;
						$scope.model.paymentInfo.accessToken = token;
						$scope.model.showOpenPay=true;
	   	    		}else{
	   	    			//token is not valid
	   	    			oAuthLogin();
	   	    		}
	   	    	}
	   	    }, function(error) {
	   	    	$ionicLoading.hide();
	   	    	console.log("error "+ error.errorCode +" "+error.errorMsg);  
	   	    	//$state.go("app.paymentCompleted", {packageId: $stateParams.packageId});
	   	    	oAuthLogin(); //token could not be validated. Forward to OAuth login.
	   	    });
			
		}
		
	}
	
	function oAuthLogin(){
		//travel app client id = 1234567892
		//redirect back to the travel app after authorization opentravel://opentravelapp/payment
		var redirectURL = "opentravel://opentravelapp/payment";
		var encodedRedirectURL = encodeURIComponent(redirectURL);
		console.log("redirectURL="+redirectURL);
		console.log("encodedRedirectURL="+encodedRedirectURL);
		var oAuthURL= "https://api-e.mybluemix.net/oauth2/authorize?"+
		"response_type=token&client_id=1234567892&redirect_uri="+ encodedRedirectURL +"&scope=payments&state=payment";
		var authWindow = $window.open(oAuthURL, "_system", 'clearsessioncache=yes');
		
		authWindow.addEventListener('loadstart', function(e) {
			var loc = e.url;
			console.log("loadstart::"+loc);
			
			if (loc.search(redirectURL) >= 0) {
				
				authWindow.close();
				var queryStr = loc.split("#")[1];
				var oAuth = extractOAuthFields(queryStr); //defined in main.js
				
				$scope.$apply(function(){
					$scope.model.paymentInfo.accountName = oAuth.acctName;
					$scope.model.paymentInfo.accountLast4Digits = oAuth.acctNum;
					$scope.model.paymentInfo.accessToken = oAuth.accessToken;
					$scope.model.showOpenPay=true;
				});
			}
		});
		
	}
	
	//called from main.js via external scope access
	$scope.setPaymentAuth = function(accessToken,acctName,acctNum){
		
		console.log("$scope.setPaymentAuth::"+accessToken+acctName+acctNum);
		$scope.$apply(function(){
			
			$scope.model.paymentInfo.accountName = acctName;
			$scope.model.paymentInfo.accountLast4Digits = acctNum;
			$scope.model.paymentInfo.accessToken = accessToken;
			
			localStorage.setItem("accessToken",accessToken);
			localStorage.setItem("accountName",acctName);
			localStorage.setItem("accountLast4Digits",acctNum);
			
			SharedData.sample.currentUser.payment.accessToken = accessToken;
			SharedData.sample.currentUser.payment.accountName = acctName;
			SharedData.sample.currentUser.payment.accountLast4Digits = acctNum;
	
			$scope.model.showOpenPay=true;
			
		});
	}
	
	$scope.data = SharedData.currentUser;
	console.log("$stateParams: "+JSON.stringify($stateParams));
	$scope.$stateParams = $stateParams;
	
	//$scope.touchIDSuccess = false;
	
	$scope.submitPayment = function(){
		
		var packageId = $stateParams.packageId;
		console.log("packageId for payment is: "+$stateParams.packageId);
		
		launchTouchID(SharedData.currentUser.username);
		//$scope.showOpenPay=false;
		//$state.go("app.paymentCompleted");
	};
	
	//get search results array from the shared data service
	var searchResultsArray = SharedData.searchResults;
	
	$scope.model.packageDetail = SharedData.getLocationAndPackageDetail($stateParams.packageId);
	//console.log(JSON.stringify(packageDetail));
	
	$scope.model.numPersons = $stateParams.numPersons;
	$scope.model.taxRate = .0825;
	
	$scope.model.discount = 0.1;
	
	$scope.model.packageRegularPrice = $scope.model.packageDetail["package"].cost;
	$scope.model.packageRegularTotal = $scope.model.packageDetail["package"].cost*$scope.model.numPersons;
	
	//$scope.discountPackagePrice = $scope.packageDetail.cost*(1-$scope.discount);
	//$scope.totalDiscountPackagePrice = $scope.discountPackagePrice*$scope.numPersons;
	$scope.model.cardDiscount = $scope.model.packageDetail["package"].cost*$scope.model.discount*$scope.model.numPersons;
	$scope.model.finalPrice = function(){
		return  ( $scope.model.packageDetail["package"].cost*(1-$scope.model.discount)*$scope.model.numPersons ) - ($scope.model.applyPointsForPurchase/100) ; //Denzil - updated for blockchain
		
	};
	
	
	var taxRate = 0.0825;
	$scope.model.salesTax = function(){
		
		return $scope.model.finalPrice()*taxRate;
	}
	$scope.model.payTotal = function(){
		return $scope.model.finalPrice() + $scope.model.salesTax();
	}
	
	
	var params = {'params': [SharedData.sample.currentUser.blockchainID]};
    var promise = AdapterFactory.callAdapter($scope, "BlockchainAdapter", "getCustomerPoints", WLResourceRequest.GET, params, null);
    promise.then(function(result) {
    	if(result.responseJSON.isSuccessful===true){
    		console.log(result.responseJSON);
    		$scope.model.openPointsBalance = result.responseJSON.Balance;
    	}
    	
    }, function(result) {
    	
    	console.log("error "+ result.errorCode +" "+result.errorMsg);
    	
    });
	
});