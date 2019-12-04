
/* JavaScript content from js/demo_center.js in folder common */

function g_callDemoCenter(){
    //console.log("****** g_callDemoCenter start *******");
	var demoCenterURL =  "https://gscfss.mybluemix.net/login.html?solution_id=fss-bnk-api-blockchain-mobile";  //fss-bnk-smao
    var lastUsed = localStorage.getItem("lastUsed");
    
	//app was not used OR last used is greater than 8 hours (in milliseconds)
	if(!lastUsed || ((Date.now() - lastUsed) >  28800000 )){ 
		//console.log("*********** time diff = "+(Date.now() - lastUsed));
		
		//check if token parameters exist in local storage
		var demoCenterToken = localStorage.getItem("demoCenterData");
		var demoCenterTokenJSON = (demoCenterToken && demoCenterToken!="")? JSON.parse(demoCenterToken) : null;
		//console.log("demo center token = "+demoCenterToken);
		
		//check expiry date versus current date to prevent demo center check
		if(demoCenterTokenJSON){
			var expDate = new Date(demoCenterTokenJSON.exp).getTime();
			var currDate = Date.now();
			if(currDate<expDate){
				//console.log((expDate-currDate)+" milliseconds to expiry");
				return;
			}
		}
		
		var demoCenterWindow = window.open(demoCenterURL, "_blank", "location=no,toolbar=no");
		
		demoCenterWindow.addEventListener("loadstart", function(e) {
			var loc = e.url;
			//console.log("loadstart::"+loc);
			if (loc.search("token=") >= 0) {
				var results = new RegExp("[\\?&]token=([^&#]*)").exec(loc);
				//console.log("results[0]="+results[0]);
				if (results && results.length>0 && results[0].search("n/a") < 0) { 
			    	//decode the token and store in local storage
			    	var accessTokenArray = results[0].split(".");
					var decodedDataStr = window.atob(accessTokenArray[1]); 
					console.log("decodedData="+decodedDataStr);
					
					var decodedDataObj = JSON.parse(decodedDataStr);
					//if special access, then cache the token with expiry date
					if(decodedDataObj.typ === "special_access"){
						localStorage.setItem("demoCenterData", decodedDataStr);
					}
			    }
				
				localStorage.setItem("lastUsed", Date.now());
				demoCenterWindow.close();
				
			}
		});
	}else{
		localStorage.setItem("lastUsed", Date.now());
	}
}
