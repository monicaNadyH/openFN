
/* JavaScript content from js/main.js in folder common */
function wlCommonInit(){
	/*
	 * Use of WL.Client.connect() API before any connectivity to a MobileFirst Server is required. 
	 * This API should be called only once, before any other WL.Client methods that communicate with the MobileFirst Server.
	 * Don't forget to specify and implement onSuccess and onFailure callback functions for WL.Client.connect(), e.g:
	 *    
	 *    WL.Client.connect({
	 *    		onSuccess: onConnectSuccess,
	 *    		onFailure: onConnectFailure
	 *    });
	 *     
	 */
	
	// Common initialization code goes here
	// Common initialization code goes here
	var env = WL.Client.getEnvironment();
    if(env === WL.Environment.IPHONE || env === WL.Environment.IPAD){
        document.body.classList.add('platform-ios'); 
        //Register web action receiver
		WL.App.addActionReceiver("webActionReceiverID", webActionReceiver);
    } else if(env === WL.Environment.ANDROID){
        document.body.classList.add('platform-android'); 
    }

    /*angular.element(document).ready(function() {
	    angular.bootstrap(document, ['starter']);
    });*/
}


function webActionReceiver(received)
{
  if (received.action == "touchIDResult" ){
	  
	  var scope = angular.element($("#buyPackageContainer")).scope();
	  scope.setTouchIDResult(received.data.result);
	  
	  /*scope.$apply(function(){
	    //scope.model.touchIDResult = received.data.result;
	    scope.setTouchIDResult(received.data.result);
	  });*/
  }else if(received.action == "search"){
	  
	  var scope = angular.element($("#appMenu")).scope();
	  
	  scope.launchSearch();
  }else if(received.action == "payment"){
	  
	  console.log("action receiver::"+JSON.stringify(received.data));
	  var oAuth = extractOAuthFields(received.data.queryStr);
	  
	  /**
	   * {"sub":"1234567890","iss":"https://api-e.mybluemix.net","aud":"https://api-e.mybluemix.net","iat":"Thu May 12 2016 22:26:28 GMT+0000 (UTC)","nbf":"Thu May 12 2016 22:26:28 GMT+0000 (UTC)","exp":"Fri May 13 2016 22:26:28 GMT+0000 (UTC)","acct_name":"OpenFN Checking Account","acct_num":"1458"}
	   */
	  var scope = angular.element($("#buyPackageContainer")).scope();
	  scope.setPaymentAuth(oAuth.accessToken,oAuth.acctName,oAuth.acctNum);
	  
  }
}

function extractOAuthFields(queryStr){
	
	  var queryArray = queryStr.split("&");
	  var len = queryArray.length;
	  var accessToken = "";
	  var state = "";
	  for(var i=0;i<len;i++){
		  var queryParamKey = queryArray[i].split("=")[0];
		  var queryParamVal = queryArray[i].split("=")[1];
		  if(queryParamKey=="access_token"){
			  accessToken = queryParamVal;
		  }else if(queryParamKey=="state"){
			  state = queryParamVal;
		  }
		  if(accessToken!="" && state!=""){
			  break;
		  }
	  }
	  
	  var accessTokenTemp = accessToken.replace("_","/").replace("-","+");
	  var accessTokenArray = accessToken.split(".");
	  var decodedData = JSON.parse(window.atob(accessTokenArray[1]));
	  
	  
	return {
		accessToken: accessToken,
		acctName: decodedData.acct_name,
		acctNum: decodedData.acct_num
	}
}


function launchTouchID(username){
	WL.App.sendActionToNative("touchIDLogin", { username: username} );
}

//schedules local notification
function scheduleNotification(durationInSeconds, notificationMessage){
	if(!isNaN(durationInSeconds) && notificationMessage && notificationMessage!=''){
		//Notification will be scheduled X seconds from now.
		WL.App.sendActionToNative("scheduleNotification", { duration: durationInSeconds, 
			message: notificationMessage} ); 
	}else{
		console.log("Error: scheduleNotification called with invalid or null inputs.");
	}
}
/* JavaScript content from js/main.js in folder iphone */
// This method is invoked after loading the main HTML and successful initialization of the IBM MobileFirst Platform runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}