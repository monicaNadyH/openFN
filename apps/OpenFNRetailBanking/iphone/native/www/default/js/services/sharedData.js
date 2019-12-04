
/* JavaScript content from js/services/sharedData.js in folder common */

angular.module('SharedData', [])
.factory('SharedData', function(){

	var sharedData = {
		settings: {
			demoerId: localStorage.getItem("demoerId") ? localStorage.getItem("demoerId") : "", //phone number of the person giving the demo
			policyNum: localStorage.getItem("policyNum") ? localStorage.getItem("policyNum") : "POLWR100", 
			policyEffectiveDate: localStorage.getItem("policyEffectiveDate") ? localStorage.getItem("policyEffectiveDate") : "2017-06-01", 
			simulatedMode: localStorage.getItem("simulatedMode") ? localStorage.getItem("simulatedMode") : "true", 
			server: localStorage.getItem("server") ? localStorage.getItem("server") : "http://134.168.16.163:9080",
			contextRoot: localStorage.getItem("contextRoot") ? localStorage.getItem("contextRoot") : "MobileFirstStarter",
			push: {
				getDeviceToken: function(){
						return localStorage.getItem("deviceToken") ? localStorage.getItem("deviceToken") : "";
				},
				getDeviceId: function(){
					return localStorage.getItem("deviceId") ? localStorage.getItem("deviceId") : "";	
				}
			},
			watsonServiceUrl: "https://gsc-fss-insurance-chatbot-watson-prod.mybluemix.net/api/message"
			//watsonServiceUrl: 'http://9.19.190.130:3000/api/message'
		},
		currentUser: { //default Natalie
			name: 'Natalie Smith',
    		username: 'natalie_smith',
    		password: 'password',
    		blockchainID: 'U2974034',
    		customerId: '123456789', 
    		profileImg: 'natalie-round',
    		status: 'OFN Gold'
		},
		city: localStorage.getItem("city") ? localStorage.getItem("city") : "Ocho Rios",
		sample: {
			
		},
		refreshCurrentUser: function(username){
			
			switch(username){
				case 'natalie_smith': 
						console.log(JSON.stringify(this.currentUser));
						console.log(JSON.stringify(this.users[0]));
						this.currentUser = this.users[0];
						break;
				case 'randolph_hoke':
						console.log(JSON.stringify(this.currentUser));
						console.log(JSON.stringify(this.users[1]));
						this.currentUser = this.users[1];
						break;
				default: 
						console.log(JSON.stringify(this.currentUser));
						this.currentUser = this.users[0];
			}
		},
		users: [
		        	{
		        		name: 'Natalie Smith',
		        		username: 'natalie_smith',
		        		password: 'password',
		        		blockchainID: 'U2974034',
		        		customerId: '123456789', 
		        		profileImg: 'natalie-round',
		        		status: 'OFN Gold'	
		        	},
		        	{
		        		name: 'Randolph Hoke',
		        		username: 'randolph_hoke',
		        		password: 'password',
		        		blockchainID: 'U2974034',
		        		customerId: '987654321', 
		        		profileImg: 'randolph-round',
		        		status: 'OFN Platinum'
		        	}
		        ],
		session:{
			conversation:{
				responses: []
			},
			customerPosition:{},
			startContext: {
				event: {
					text: ''
				}
			}
		}
    };
	
	sharedData.sample.currentUser = sharedData.currentUser;
	sharedData.sample.city = sharedData.city;
	return sharedData;
});

//{"intents":[{"intent":"balance","confidence":0.8226129412651062}],"entities":[],"input":{"text":"what is my balance"},"output":{"log_messages":[],"text":["your account balance is "],"nodes_visited":["node_1_1478882289339","node_2_1478882893858"]},"context":{"person":{"fname":"Natalie","lname":"Smith","address":{"line1":"999 Gateway Dr","line2":"","city":"Dallas","state":"TX","zip":888888,"country":"US"},"customer_id":7829706,"tone_anger_threshold":0.49},"conversation_id":"ddbf6c0c-ea31-4e12-bef4-117bbbc1b644","system":{"dialog_stack":[{"dialog_node":"root"}],"dialog_turn_counter":2,"dialog_request_counter":2,"_node_output_map":{"node_3_1478122398986":[0,1,0],"node_2_1478882893858":[0,0]}},"defaultCounter":0,"action":{"display":"overview"}}}