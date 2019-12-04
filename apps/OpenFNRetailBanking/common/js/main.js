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
	
	if(isMFP()){
	 	//console.log("attempting to connect")
	 	WL.Client.connect({
	         onSuccess:function() {
	 			console.log("Successfully connected to MobileFirst Server.");
	 			WL.Logger.debug("Successfully connected to MobileFirst Server.");
	 			
	         },
	         onFailure:function(f) {
	 			console.log("Failed connecting to MobileFirst Server.")
	 			WL.Logger.debug("Failed connecting to MobileFirst Server.");
	         }
	     });
	 } 
	
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


function isMFP() {
	return typeof WL !== 'undefined';
}

function webActionReceiver(received)
{
	if (received.action == "receivedInputText" ){
		  //console.log('webActionReceiver:: receivedInputText');
		  var scope = angular.element($("#chatContainer")).scope();
		  scope.setTranscribedText(received.data.transcribedText);
	} else if(received.action && received.action == "endOfSpeech"){
		console.log('webActionReceiver:: endOfSpeech');
		var scope = angular.element($("#chatContainer")).scope();
		scope.stopRecord(true);

		if(received.data.networkError && !!received.data.networkError){
			WL.SimpleDialog.show(
				"Connectivity Error",
				"There was an issue connecting to the internet. Verify your network connection.",
				[{
					text: "OK",
					handler: function() {
						return;
					}
				}]
			);
		}
	  }else if(received.action == "offers"){
		  console.log('webActionReceiver:: launch offers');
		  var queryStr = '';
		  if(received.data && received.data.queryStr){
			  queryStr = received.data.queryStr;
		  }
		  
		  //alert('launch ofn offers. querystr='+queryStr);
		  
		  var scope1 = angular.element($("#menuContainer")).scope();
		  var scope2 = angular.element($("#loginContainer")).scope();
		  
		  if(scope2){
			  //scope2.setConversationStartContext();
			  scope2.showOverviewWithOffer();
			  return;
		  }
		  
		  if(scope1){
			  //scope1.launchConversation();
			  scope1.showOverviewWithOffer();
			  return;
		  }
		  
		  
		  
	  } else if (received.action == "redirectingToTravelApp" ){
	  
		  console.log('webActionReceiver:: redirectingToTravelApp');
		  //var scope = angular.element($("#homeContainer")).scope();
		  //scope.setRedirecting();
	
	  }else if(received.action == "setDeviceCredentials"){
		  
		  if(received.data && received.data.deviceToken){
			  localStorage.setItem("deviceToken",received.data.deviceToken);
		  }
		  if(received.data && received.data.deviceId){
			  localStorage.setItem("deviceId",received.data.deviceId);
		  }
		  
	  }else if(received.action == "receivedLocationUpdate"){
		  console.log('webActionReceiver:: receivedLocationUpdate');
		  var scope1 = angular.element($("#menuContainer")).scope();
		  var scope2 = angular.element($("#loginContainer")).scope();
		  
		  if(scope1){
			  scope1.receivedNotification();
			  return;
		  }
		  if(scope2){
			  scope2.receivedNotification();
			  return;
		  }
		  
	  }  
}

/*function launchTouchID(username){
	WL.App.sendActionToNative("touchIDLogin", { username: username} );
}*/

//schedules local notification
function scheduleNotification(delayInSeconds, notificationMessage){
	if(!isNaN(delayInSeconds) && notificationMessage && notificationMessage!=''){
		//Notification will be scheduled X seconds from now.
		WL.App.sendActionToNative('scheduleNotification', { duration: delayInSeconds, 
			message: notificationMessage} ); 
	}else{
		console.log('Error: scheduleNotification called with invalid or null inputs.');
	}
}


function textToSpeechStart(text){
	WL.App.sendActionToNative('textToSpeechStart', 
			{ 
				text: text,
				username: '656ee33e-fcfc-464e-adbc-a1cf5e18c009',
				password: 'ByoAyWLFqb6k',
				url: 'https://stream.watsonplatform.net/text-to-speech/api'
			}); 
}

function textToSpeechStop(){
	WL.App.sendActionToNative('textToSpeechStop', {}); 
}

function startRecording(){
	WL.App.sendActionToNative('speechToTextStart', 
			{ 
				username: '7413e018-4d75-4c15-b3f1-fe45faae2004',
				password: 'XEKqEjMNOJcx',
				url: 'https://stream.watsonplatform.net/text-to-speech/api'
			}); 
}

function stopRecording(){
	WL.App.sendActionToNative('speechToTextStop', {}); 
}

