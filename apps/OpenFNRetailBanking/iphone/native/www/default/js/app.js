
/* JavaScript content from js/app.js in folder common */

angular.module('starter', ['ionic', 'LoginService', 'SharedData', 'adapterFactoryModule', 'uiGmapgoogle-maps', 'pointsSummaryModule', 'angularMoment', 'fssDirectiveModule', 'loginModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
	console.log('ionic platform ready');
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    
  });
})
.config(function($stateProvider, $urlRouterProvider) {
	
	  $stateProvider
	    .state('app', {
		    url: '/app',
		    abstract: true,
		    templateUrl: 'templates/menu.html',
		    controller: 'AppCtrl'
	        
	  })
	  $stateProvider
	    .state('login', {
		    url: '/login',
		    templateUrl: 'templates/login.html',
		    controller: 'LoginCtrl'
	        
	  })
	  //Majesco
//	  .state('app.tabs', {
//		    url: '/tabs',
//		    views: {
//		      'menuContent': {
//		        templateUrl: 'templates/tabs.html'
//		      }
//		    }
//		  })
//	  .state('app.tabs.tab0', {
//	      url: '/tab0',
//	      views: {
//	        'tab-tab0': {
//	          templateUrl: 'templates/account_overview.html',
//	          controller: 'OverviewCtrl'
//	        }
//	      }
//	    })
//	    .state('app.tabs.tab1', {
//	      url: '/tab1',
//	      views: {
//	        'tab-tab1': {
//	          templateUrl: 'templates/points_summary.html',
//	          controller: 'PointsSummaryCtrl'
//	        }
//	      }
//	    })
//	  .state('app.tabs.tab2', {
//	      url: '/tab2',
//	      views: {
//	        'tab-tab2': {
//	          templateUrl: 'templates/locate.html',
//	          controller: 'LocationsCtrl'
//	        }
//	      }
//	    })
//	
//	  
//	    .state('app.tabs.tab3', {
//	      url: '/tab3',
//	      views: {
//	        'tab-tab3': {
//	          templateUrl: 'templates/deposit.html'
//	        }
//	      }
//	    })
//	
//	.state('app.tabs.tab4', {
//	    url: '/tab4',
//	    views: {
//	      'tab-tab4': {
//	        templateUrl: 'templates/payments.html'/*,
//	        controller: 'OverviewCtrl'*/
//	      }
//	    }
//	  })
//	  
//	  .state('app.tabs.points_detail', {
//	      url: '/points_detail',
//	      views: {
//	        'tab-tab1': {
//	          templateUrl: 'templates/points_detail.html',
//	          controller: 'PointsSummaryCtrl'
//	        }
//	      }
//	    })
	  .state('app.conversation', {
		    url: '/conversation',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/conversation.html',
		        controller: 'ConversationCtrl'
		      }
		    } 
	   }) 
	  .state('app.notifications', {
		    url: '/notifications',
		    views: {
		      'menuContent': {
		        templateUrl: 'templates/notifications.html',
		        controller: 'NotificationsCtrl'
		      }
		    } 
	   });
	  // if none of the above states are matched, use login page
	  $urlRouterProvider.otherwise('/login');
	  
})
.config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
        GoogleMapApiProviders.configure({
            china: false,
            key: 'AIzaSyBhZw3JffP0d0uWFsdcopYgCRVm-CQtjmQ',
            v: '3.4'
        });
    }]
)
.controller('AppCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicModal, SharedData){
	
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
	    if(toState.name === 'login'){
	    	console.log('login state change');
	    	SharedData.session.conversation.responses = [];
	    	console.log(SharedData.session.simulatedMode);
	    	$rootScope.$broadcast('logout');
	    }
	});
	
	$scope.getCurrentPage = function(){
		return $state.current.name;
	};
	
	$scope.receivedNotification = function(){
		console.log('receivedNotification');
		$state.go('app.tabs.tab1');
	};
	
	$ionicModal.fromTemplateUrl('templates/conversation.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
	  }).then(function(modal) {
	    $scope.modal = modal;
	  });
	
	$scope.showConversation = function(){
		$scope.modal.show();
	}
	
	$scope.hideConversation = function(){
		$scope.modal.hide();
	}
	
	$rootScope.showMessage = function(title, message){
		if(!title || !message){
			console.error('AppCtrl::showMessage invoked with incorrect parameters. Expected title and message');
			return;
		}
        WL.SimpleDialog.show(
            title,
            message,
            [{
                text: 'OK',
                handler: function() {
                    return;
                }
            }]
        );
	}
	
	$rootScope.showConversationWithContext = function(){
		$scope.modal.show();
	}
	
	/*$scope.$on('$destroy', function(){
		$scope.modal.remove();
	});*/
	
	//called from outside angular scope when launch offers is triggered 
	$scope.launchConversation = function(){
		console.log('launchConversation');
		SharedData.session.startContext.event.text = 'move';
		//$scope.showConversation();
		$rootScope.$broadcast('external.event');
	}
	
	$scope.showOverviewWithOffer = function(){
		console.log('showOverviewWithOffer');
		SharedData.session.startContext.event.text = 'show_offer';
		//$scope.showConversation();
		$rootScope.$broadcast('external.event');
	}
	
	$scope.$on('external.event', function(event, args) {
		console.log('external.event occurred');
		//$scope.showConversation();
		$state.go('app.tabs.tab0'); //overview page
	});
	
})
.controller('LocationsCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicLoading, $ionicPopup, $timeout, SharedData, AdapterFactory, uiGmapGoogleMapApi){
	
	$scope.mapsChecked = true;
    $scope.cardActivated = false;
    $scope.title = 'Ocho Rios, Jamaica';
    
    $scope.$on('$ionicView.loaded',function(event, data){
    	//console.log('locations view loaded');
    	$scope.doRefresh();
    });
    
	$scope.data = {
		currentUser: SharedData.sample.currentUser
	};
	
	
    $scope.getCurrentPage = function(){
        return $state.current.name;
    };
    
    $scope.scheduleLocalNotification = function(){
    	scheduleNotification(7, 'See the special travel packages for you with discounts and gift points.');	
    	$state.go('app.notifications');
    };
    
    $scope.doRefresh = function() {
    	//TODO get city from the push notification that launches the app when user searches for restaurants using the travel app
        var params = {'params': ['Ocho Rios','Jamaica']};
        var promise = AdapterFactory.callAdapter($scope, 'APIMAdapter', 'getLocations', WLResourceRequest.GET, params, null);
        promise.then(function(result) {
        	if(result.responseJSON.isSuccessful===true && result.responseJSON.array && result.responseJSON.array.length>0){
        		//console.log(result.responseJSON.array);
       
        		var atmArray = result.responseJSON.array;
        		$scope.atmArray = atmArray;
        		for(var i=0; i<atmArray.length; i++){
        			$scope.map = { center: { latitude: atmArray[i].coords.lat, longitude: atmArray[i].coords.lng }, zoom: 12 };
        			break;
        		}
        		
        		
        		uiGmapGoogleMapApi.then(function(maps) {
        			//create ATM model
        			var markersArray = [];
        			for(var i=0; i<atmArray.length; i++){
        				var pinIcon = '';
                		if(atmArray[i].type==='ATM'){
                			pinIcon = './images/atm-pin.png';
                		}else if(atmArray[i].type==='BRANCH'){
                			pinIcon = './images/bank-pin.png';
                		}else if(atmArray[i].type==='REP'){
                			pinIcon = './images/person-pin.png';
                		}
        				markersArray.push({ 
        					idKey: i,
            				latitude: atmArray[i].coords.lat, 
            				longitude: atmArray[i].coords.lng,
            				title: atmArray[i].desc+'<br/>'+atmArray[i]['hours-short']+'<br/>'+atmArray[i].address.addr_line1+', '+atmArray[i].address.city+'<br/> Phone: '+atmArray[i].contact.phone,
            				icon: pinIcon,
            				show: false
            				
        				});
        				
            		}
        			$scope.atmBranchMarkers = markersArray;
        			$scope.onClick = function(marker, eventName, model) {
        	            model.show = !model.show;
        	        };
        	    });
        	}
        	
        	$scope.$broadcast('scroll.refreshComplete');
        	
        }, function(result) {
        	$scope.$broadcast('scroll.refreshComplete');  
        	console.error('error '+ JSON.stringify(result));
        	$rootScope.showMessage('Error','Unable to retrieve Branch/ATM locations. '+result.errorCode +' '+result.errorMsg);
        	  
        });
    	
    }
    
    
    
}).controller('NotificationsCtrl', function($scope, $rootScope, $state, $ionicHistory, $ionicLoading, $ionicPopup, $timeout, SharedData, AdapterFactory){
	
	$scope.model = {
			demoerId: SharedData.settings.demoerId,
			policyNum: SharedData.settings.policyNum,
			policyEffectiveDate: SharedData.settings.policyEffectiveDate,
			simulatedMode: SharedData.settings.simulatedMode=='false'?false:true
	}
	
	/*$scope.$on('$ionicView.afterEnter', function(event, data){
		
    });*/
	
	$scope.updatePolicyNumber = function(){
		localStorage.setItem('policyNum', $scope.model.policyNum);
		SharedData.settings.policyNum = $scope.model.policyNum;
		
		localStorage.setItem('policyEffectiveDate', $scope.model.policyEffectiveDate);
		SharedData.settings.policyEffectiveDate = $scope.model.policyEffectiveDate;
		
		localStorage.setItem('simulatedMode', $scope.model.simulatedMode+'');
		SharedData.settings.simulatedMode = $scope.model.simulatedMode+'';
		
		
		WL.SimpleDialog.show(
	            'Success',
	            'Update Successful',
	            [{
	                text: 'OK',
	                handler: function() {
	                	console.log('policy num ',localStorage.getItem('policyNum'));
	                	console.log('eff date ',localStorage.getItem('policyEffectiveDate'));
	                	console.log('simulated mode ',localStorage.getItem('simulatedMode'));
	                    return;
	                }
	            }]
	        );
	}
	
	$scope.setupNotifications = function(action){
		
		var procedure = 'registerDevice';
		var successMsg = 'Registration completed.';
		
		if(action && action==='deregister'){
			procedure = 'unregisterDevice';
			successMsg = 'Registration removed.';
		}
		
		if(!$scope.model.demoerId || $scope.model.demoerId==='' || isNaN($scope.model.demoerId)){
			$rootScope.showMessage('Phone number required','Please enter a phone number without dashes.');
			return;
		}
		
		localStorage.setItem('demoerId', $scope.model.demoerId);
		SharedData.settings.demoerId = $scope.model.demoerId;
		
		var deviceId = SharedData.settings.push.getDeviceId();
		var deviceToken = SharedData.settings.push.getDeviceToken();
		//console.log('deviceId='+deviceId);
		//console.log('deviceToken='+deviceToken);
		
		var params = {'params': [deviceId, deviceToken, $scope.model.demoerId]};
	    var promise = AdapterFactory.callAdapter($scope, 'BluemixPushNotificationAdapter', procedure, WLResourceRequest.POST, params, null);
	    promise.then(function(result) {
	    	if(result.responseJSON.isSuccessful===true){
	    		//console.log(result.responseJSON);
	    		$rootScope.showMessage('Success',successMsg);
	    	}
	    }, function(result) {
	    	  console.error('error '+ JSON.stringify(result));
	    	  $rootScope.showMessage('Error', 'Unable to call notifications service. '+result.errorCode +' '+result.errorMsg);
	    });
		
	}
	
	
})
.controller('OverviewCtrl', function($filter, $scope, $rootScope, $state, $ionicHistory, $ionicLoading, $ionicPopup, $timeout, $window, $ionicSlideBoxDelegate, SharedData, AdapterFactory){
	
	$scope.model =  {
			showAccounts: true,
			customerPosition: {},
			asset:{},
			liability:{},
			currentSlide: 0,
			person: {
				name: SharedData.currentUser.name,
				profileImg: SharedData.currentUser.profileImg,//(SharedData.currrentUser.profileImg && SharedData.currrentUser.profileImg !=='') ? SharedData.currrentUser.profileImg : 'natalie_round',
				status: SharedData.currentUser.status
			},
			mainOffer: {},
			showOffer: false
		};
	
	$scope.getName = function(){
		return SharedData.currentUser.name;
	}
	$scope.getStatus = function(){
		return SharedData.currentUser.status;
	}
	$scope.getProfileImg = function(){
		return SharedData.currentUser.profileImg;
	}
	
	$scope.showAccounts = function(){
		$scope.model.showAccounts = true;
		
	}
	$scope.showAnalysis = function(){
		$scope.model.showAccounts = false;
		$scope.model.currentSlide = 0;
		
	}
	
	$scope.$on('$ionicView.afterEnter', function(event, data){
    	console.log('Financial Overview $ionicView.afterEnter');
    	$scope.fetchOverviewInfo();
    	
    });
	
	
	$scope.analysisSlideChanged = function(index){
		$scope.model.currentSlide = index;
	}
	
	$scope.getOfferImgStr = function(offer_image_url){
		//console.log('getOfferImgStr '+offer_image_url);
		switch (offer_image_url){
			case 'ofnjcdt1v1', 'ofnfcdt1v1', 'ofncpt1v1': //large deposit offers
				return '1';
			
			case 'ofncesat1v1', 'ofn529cspt1v1': //college savings offers
				return '2';
			
			case 'ofne2000ofnrpt1v1', 'ofne50000ofnrpalyaft1v1', 'ofne75000ofnrpalyaft1v1': //credit card bonus points offer
				return '3';
			
			default:
				return 'general'; //all others
		}
	}
	
	$scope.moreInfo = function(){
		console.log('more info');
		var offerURL= 'http://cie-console.mybluemix.net/offers/'+ ($scope.model.mainOffer ? $scope.model.mainOffer.image_url.trim() : 'ofncct1v1')+'.html'; //customize link to the offer url 
		//$window.open(offerURL, "_system");
		console.log(offerURL);
		$window.open(offerURL, '_blank', 'location=no, toolbar=yes');
		$scope.model.showOffer = false; //hide offer
	}
	
	$scope.fetchOverviewInfo = function(){
		
	    $ionicLoading.show({
			template: 'Loading...'
		});
	    
	    var customerId = SharedData.currentUser.customerId;
	    console.log('getCustomerPosition customerId='+customerId);	
	    
	    var params = {'params': [customerId,'']};
	    var promise = AdapterFactory.callAdapter($scope, 'APIPhase3Adapter', 'getCustomerPosition', WLResourceRequest.GET, params, null);
	    
	    promise.then(function(result) {
	    	$ionicLoading.hide();
	    	if(result.responseJSON.isSuccessful===true){
	    		//console.log(result.responseJSON);
	    		//add formatted amounts to customerPosition response for Watson Dialog to utilize
	    		result.responseJSON.netWorth['formattedAmount'] = $filter('currency')(result.responseJSON.netWorth.amount);
	    		result.responseJSON.totalAsset['formattedAmount'] = $filter('currency')(result.responseJSON.totalAsset.amount);
	    		result.responseJSON.totalLiability['formattedAmount'] = $filter('currency')(result.responseJSON.totalLiability.amount);
	    		
	    		//assign accounts & graph data to model
	    		$scope.model.customerPosition = result.responseJSON;
	    		var len = $scope.model.customerPosition.bankAccounts.length;
	    		
	    		for(var i=0;i<len;i++){
	    			var show = $scope.model.customerPosition.bankAccounts[i].bank.id=='654321'? true : false;
	    			$scope.model.customerPosition.bankAccounts[i]['show'] = show;
	    		}
	    		
	    		SharedData.session.customerPosition = JSON.parse(JSON.stringify(result.responseJSON));
	    		//console.log('fetched customerPosition and set in SharedData');
	    		//console.log(SharedData.session.customerPosition);
	    	}
	    	$scope.$broadcast('scroll.refreshComplete');
	    	
	    	//Prompt to enter phone number for demoer ID (multi-user)
	    	if(!SharedData.settings.demoerId || SharedData.settings.demoerId.trim()===''){
	    		$state.go('app.notifications');
	    		
	    	}
	    	
	    	
	    	//if start conversation context has been set in shared data (from external app launch) then start conversation
	    	if(SharedData.session.startContext.event.text && SharedData.session.startContext.event.text === 'move'){
	    		$rootScope.showConversationWithContext();
	    	}else if(SharedData.session.startContext.event.text && SharedData.session.startContext.event.text === 'show_offer'){
	    		//TODO call offers API and update offer model
	    		console.log('call GET offers');
	    		
	    		SharedData.session.startContext.event.text = '';
	    		
	    		var demoerId = SharedData.settings.demoerId;
	    		var params = {'params': [customerId, demoerId]};
	    	    var promise = AdapterFactory.callAdapter($scope, 'CIEAdapter', 'getOffers', WLResourceRequest.GET, params, null);
	    	    
	    	    promise.then(function(result) {
	    	    	if(result.responseJSON.isSuccessful===true){
	    	    		if(result.responseJSON.array && result.responseJSON.array.length>0){
	    	    			$scope.model.mainOffer = result.responseJSON.array[0];
	    	    			$scope.model.showOffer = true;
	    	    		}
	    	    	}
	    	    }, function(result) {
	    	    	console.error('error '+ JSON.stringify(result));
	  	    	  	$rootScope.showMessage('Error', 'Unable to fetch offers. '+result.errorCode +' '+result.errorMsg);
	    	    });
	    	}
	    	
	    }, function(result) {
	    	  //console.log(JSON.stringify(result));
	    	  $ionicLoading.hide();
	    	  $scope.$broadcast('scroll.refreshComplete');
	    	  console.error('error '+ JSON.stringify(result));
	    	  $rootScope.showMessage('Error', 'Unable to fetch accounts overview. '+result.errorCode +' '+result.errorMsg);
	    });
	    
	}
	
	
})
.controller('ConversationCtrl', function($scope, $rootScope, SharedData, $http, $ionicScrollDelegate){
	
	// identify environment
	var isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();
	
	//emitted from offer custom directive template
	$scope.$on('conversation.newInput', function(event, data) { 
		console.log(data); 
		var inputText = data;
		$scope.model.conversation.input = data;
		$scope.sendMessage();
	});
	
	$scope.model = {
			conversation: {
				recordEnabled: false,
				responses: SharedData.session.conversation.responses.slice(),
				input: '',
				recordingInProgress: false,
				waitingForResponse: false
			}
		};
	
	$scope.$watch('model.conversation.responses', function(newValue, oldValue) {
		  //console.log('newValue =',JSON.stringify(newValue));
		  SharedData.session.conversation.responses.push(newValue);
		});
	
	
	$scope.$on('$ionicView.enter', function(event, args) { //modal.shown
		//console.log('modal.shown ');
		//console.log(JSON.stringify($scope.model.conversation));
		
		if(SharedData.session.startContext.event.text && SharedData.session.startContext.event.text !== ''){
			$scope.model.conversation.responses = [];

		}
		if($scope.model.conversation.responses.length==0){
			$scope.sendMessage(true);
		}
	});
	
	$scope.$on('$ionicView.leave', function(event, args) { //modal.hidden
		//console.log('modal.hidden ');
		if(isIOS){
			textToSpeechStop(); //stop audio playback
			stopRecording();    // stop microphone recording & speech transcription
		}
		
	});
	
	$scope.$on('logout', function(event, args) {
		console.log('logout occurred');
		$scope.model.conversation.responses = [];
		
	});
	
	
	
	$scope.inputUp = function() {
		if (isIOS) $scope.data.keyboardHeight = 216;
		$timeout(function() {
			$ionicScrollDelegate.scrollBottom(true);
		}, 300);

	};

	$scope.inputDown = function() {
		if (isIOS) $scope.data.keyboardHeight = 0;
		$ionicScrollDelegate.resize();
	};
	
	$scope.toggleRecord = function(){
		$scope.model.conversation.recordingInProgress = !$scope.model.conversation.recordingInProgress;
		if(!!$scope.model.conversation.recordingInProgress){
			if(isIOS){
				startRecording();
			}
		}else{
			if(isIOS){
				stopRecording();
			}
		}
	}
	
	//called from outside angular scope when end of speech is detected by iOS
	$scope.stopRecord = function(){
		//console.log('stopRecord');
		$scope.$apply(function(){
			$scope.model.conversation.recordingInProgress = false;
    	});
	}
	
	$scope.setTranscribedText = function(text){
		//console.log('setTranscribedText :: '+text);
		$scope.$apply(function(){
			$scope.model.conversation.input = text;
    	});
	}
	
	$scope.sendMessage = function(initialGreeting){
		if($scope.model.conversation.input.trim()==='' && !initialGreeting){
			$rootScope.showMessage('Missing Input','Please enter an input text.');
			return;
		}
		
		var responsesLength = $scope.model.conversation.responses.length;
		var output = responsesLength>0 ? $scope.model.conversation.responses[responsesLength-1].output : {};
		var context = responsesLength>0 ? $scope.model.conversation.responses[responsesLength-1].context : {};
		var text = $scope.model.conversation.input ? $scope.model.conversation.input.trim() : '';
		
		//set offer context
		if(responsesLength==0 && SharedData.session.startContext.event.text != ''){
			context = {
					startWith: {
						event: {
							text: SharedData.session.startContext.event.text
						}
					}
			}
			SharedData.session.startContext.event.text = '';
			
		}
		
		//add input text into response array so that it appears on conversation page 
		$scope.model.conversation.responses.push({
			'input':{'text':text}
		});
		
		console.log('demoerId='+SharedData.settings.demoerId);
		console.log('customerId='+SharedData.currentUser.customerId);
		console.log('SharedData.settings.simulatedMode ='+SharedData.settings.simulatedMode);
		
		var request = {
			input: {
				text: text
			},
			demoerId: SharedData.settings.demoerId, //multi-user support
			customerId: SharedData.currentUser.customerId,
			channel: 'mobile',
			policyNum: SharedData.settings.policyNum,
			policyEffectiveDate: SharedData.settings.policyEffectiveDate,
			simulatedMode: SharedData.settings.simulatedMode=='true'?true:false
		};
		console.log('request is '+JSON.stringify(request));
		if(context){
			if(!context.customerPosition){
				context.customerPosition = SharedData.session.customerPosition;
			}
			request.context = context;
		}
		
		if(output){
			request.output = output;
		}
		
		if(isIOS){
			textToSpeechStop(); //global function main.js
			stopRecording();
		}
		
		$scope.model.conversation.waitingForResponse = true;
		
		$http({
		  method: 'POST',
		  url: SharedData.settings.watsonServiceUrl,
		  data: request,
		  headers:{'Content-Type': 'application/json'}
		}).then(function successCallback(response) {
			//console.log('success '+JSON.stringify(response));
			$scope.model.conversation.waitingForResponse = false;
			
			//replace last element in response array that contains just the input
			//$scope.model.conversation.responses.push(response.data); 
			$scope.model.conversation.responses[$scope.model.conversation.responses.length-1] = response.data;
			
			var data = response.data;
			var text = '';
			for(var i=0;i<response.data.output.text.length;i++){
				text += response.data.output.text[i]+' ';
			}
			
			if(isIOS){
				textToSpeechStart(text); //global function main.js
			}
			$scope.model.conversation.input = '';
			
			$ionicScrollDelegate.scrollBottom(true);
			
			
		}, function errorCallback(response) {
			console.log('error '+JSON.stringify(response));
			$scope.model.conversation.waitingForResponse = false;
			$rootScope.showMessage('Error','Service could not be reached.');
		  });
	}
});

