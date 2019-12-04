
/* JavaScript content from js/services/sharedData.js in folder common */

angular.module('SharedData', [])
.factory('SharedData', function(){

	var sharedData = {
		settings: {
			server: localStorage.getItem("server") ? localStorage.getItem("server") : "http://134.168.16.163:9080",
			contextRoot: localStorage.getItem("contextRoot") ? localStorage.getItem("contextRoot") : "MobileFirstStarter",
			offline: {
				watsonSearch: false
			}
		},
		currentUser: {
			name: localStorage.getItem("name") ? localStorage.getItem("name") : "Natalie Smith",
			username: localStorage.getItem("username") ? localStorage.getItem("username") : "",
			password: localStorage.getItem("password") ? localStorage.getItem("password") : "password",
			blockchainID: "U2974034",
			payment: {
				accessToken: localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") : "",
				accountName: localStorage.getItem("accountName") ? localStorage.getItem("accountName") : "",
				accountLast4Digits: localStorage.getItem("accountLast4Digits") ? localStorage.getItem("accountLast4Digits") : ""
			}
		},
		sample: {
			
		},
		searchResults: {
			
		},
		getLocationAndPackageDetail: function(packageId){
			if(this.searchResults){
				var len = this.searchResults.length;
				for(var i=0;i<len;i++){
					if(this.searchResults[i]["package"].packageId==packageId){
						return this.searchResults[i];
					}
				}
			}
		},
		blockchainContractIDDoublePoints: "C289416",
		blockchainContractIDFeedback: "C791594"
    };
	
	sharedData.sample.currentUser = sharedData.currentUser;
	return sharedData;
});