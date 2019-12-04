/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/**
 *  WL.Server.invokeHttp(parameters) accepts the following json object as an argument:
 *  
 *  {
 *  	// Mandatory 
 *  	method : 'get' , 'post', 'delete' , 'put' or 'head' 
 *  	path: value,
 *
 *  	// Optional
 *  	returnedContentType: any known mime-type or one of "json", "css", "csv", "plain", "xml", "html"
 *  	returnedContentEncoding : 'encoding',
 *  	parameters: {name1: value1, ... },
 *  	headers: {name1: value1, ... },
 *  	cookies: {name1: value1, ... },
 *  	body: {
 *  		contentType: 'text/xml; charset=utf-8' or similar value,
 *  		content: stringValue
 *  	},
 *  	transformation: {
 *  		type: 'default', or 'xslFile',
 *  		xslFile: fileName
 *  	}
 *  }
 */

var CLIENT_ID = "0347e16a-070d-4425-8d50-4f9e5765af9c";
var CLIENT_SECRET = "cE3mR4vT5eJ1uM4cP5mG4uY0aR1iL3dC5vU8yJ8vE6qH0hS0nN";

/**
 * testing only. not used in app
 */
function getATM(lat, lon, city, country) {
	
	WL.Logger.warn("lat="+lat+" lon="+lon+" city="+city+" country="+country);
	
	/*var input = { method : 'get', returnedContentType : 'json', path :
	 "/gscfsbmxusibmcom-apim/sb/openfn/apie/atm/?country=jamaica" };
	  
	return WL.Server.invokeHttp(input);
	*/

	var obj =  [ {
		"type" : "ATM", // BRANCH|ATM
		"name" : "Scotiabank",
		"desc" : "Scotiabank ATM",
		"hours-short": "24 Hrs",
		"hours" : {
			"Sun" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Mon" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Tue" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Wed" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Thu" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Fri" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Sat" : {
				"open" : "00:00",
				"close" : "23:59"
			},
		},
		"contact" : {
			"name" : "Contact Name",
			"phone" : "Contact Phone",
			"email" : "Contact Email"
		},
		"address" : {
			"addr_line1" : "Evelyn Street",
			"addr_line2" : undefined,
			"city" : "Ocho Rios",
			"state" : "Saint Ann Parish",
			"zip" : undefined,
			"country" : "Jamaica"
		},
		"coords" : {
			"lat" : 18.4143626,
			"lng" : -77.0530052
		}
	}, {
		"type" : "ATM", // BRANCH|ATM
		"name" : "Scotiabank",
		"desc" : "Scotiabank ATM",
		"hours-short": "24 Hrs",
		"hours" : {
			"Sun" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Mon" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Tue" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Wed" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Thu" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Fri" : {
				"open" : "00:00",
				"close" : "23:59"
			},
			"Sat" : {
				"open" : "00:00",
				"close" : "23:59"
			},
		},
		"contact" : {
			"name" : "Contact Name",
			"phone" : "Contact Phone",
			"email" : "Contact Email"
		},
		"address" : {
			"addr_line1" : "Main Street",
			"addr_line2" : undefined,
			"city" : "Ocho Rios",
			"state" : "Saint Ann Parish",
			"zip" : undefined,
			"country" : "Jamaica"
		},
		"coords" : {
			"lat" : 18.4096909,
			"lng" : -77.10444780000002
		}
	}, {
		"type" : "BRANCH", // BRANCH|ATM
		"name" : "Scotiabank",
		"desc" : "Scotiabank Branch",
		"hours-short": "M-F 8am-5pm",
		"hours" : {
			"Sun" : {
				"open" : "08:00",
				"close" : "11:00"
			},
			"Mon" : {
				"open" : "07:00",
				"close" : "18:00"
			},
			"Tue" : {
				"open" : "07:00",
				"close" : "18:00"
			},
			"Wed" : {
				"open" : "07:00",
				"close" : "18:00"
			},
			"Thu" : {
				"open" : "07:00",
				"close" : "18:00"
			},
			"Fri" : {
				"open" : "07:00",
				"close" : "18:00"
			},
			"Sat" : {
				"open" : "08:00",
				"close" : "15:00"
			},
		},
		"contact" : {
			"name" : "Contact Name",
			"phone" : "Contact Phone",
			"email" : "Contact Email"
		},
		"address" : {
			"addr_line1" : "Graham Street",
			"addr_line2" : undefined,
			"city" : "Ocho Rios",
			"state" : "Saint Ann Parish",
			"zip" : undefined,
			"country" : "Jamaica"
		},
		"coords" : {
			"lat" : 18.4141497,
			"lng" : -77.0530052
		}
	} ];
	
	return {array: obj};
}

function getLocations(city, country){
	var input = { method : 'get', returnedContentType : 'json', path :
	 "/gscfsbmxusibmcom-apim/apim/v1/locations?",
	 parameters: {city: city, country: country, client_id: CLIENT_ID, client_secret: CLIENT_SECRET }
	};
	  
	return WL.Server.invokeHttp(input);
}

function locationUpdate(id, lat, lon){
	//var id = "johndoe@gmail.com";
	//var lat = 32.9422269;
	//var lon = -96.9941577;
	
	var request_body = '{"type": "location update","desc": "location update","party": {"id": "'+id+'","name": "Natalie Smith","email": "'+id+'",'+
		'"phone": "972-551-6741"},"location": {"latitude": '+lat+',"longitude":'+lon+'}}';
	//WL.Logger.warn(request_body);
	var input = { 
			method : 'post', 
			returnedContentType : 'json', 
			path : "/gscfsbmxusibmcom-apim/apim/v1/events?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET,
			headers: { 
		        'Content-Type': 'application/json' 
		    },
			body: {
				   	contentType: 'application/json; charset=UTF-8',
				   	content: request_body
			}
		};
	return WL.Server.invokeHttp(input);
}

function cardAuthorization(cardNumber){
	var request_body = {
			   "authorization_request": {
				      "request_creation_date": new Date().toUTCString(),
				      "request_type": 19,
				      "purpose": "purchase",
				      "description": "Purchase for vacation package",
				      "additional_information": ""
				   },
				   "card_transaction_detail": {
				      "origination_date": new Date().toUTCString(),
				      "financial_transaction_card": {
				         "card_cvn": 354,
				         "expiration_date": "2020-12-01",
				         "cardholder_name": "Natalie Smith"
				      },
				      "posting_entries": [
				         {
				            "accounting_effect_type": "Debit",
				            "amount": 15000,
				            "currency": "USD",
				            "description": "Vacation Package",
				            "posts_to": "4444"
				         }
				      ]
				   }
				}
	var input = { 
			method : 'post', 
			returnedContentType : 'json', 
			path : "/gscfsbmxusibmcom-apim/apim/v1/cards/"+cardNumber+"/authorizations?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET,
			headers: { 
		        'Content-Type': 'application/json' 
		    },
			body: {
				   	contentType: 'application/json; charset=UTF-8',
				   	content: JSON.stringify(request_body)
			}
		};
	return WL.Server.invokeHttp(input);
}

function submitPayment(authToken, contractID, amount, points, description, oneTimePasscode){
	
	var request_body = {
			"contract_id": contractID,
			"amount": amount,
			"points": points,
			"description": description,
			"code": oneTimePasscode
	}
	
	var input = { 
			method : 'post', 
			returnedContentType : 'json', 
			path : "/gscfsbmxusibmcom-apim/apim/v1/oauth2/transactions?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET,
			headers: { 
		        'Content-Type': 'application/json',
		        'Authorization': 'Bearer '+authToken
		    },
			body: {
				   	contentType: 'application/json; charset=UTF-8',
				   	content: JSON.stringify(request_body)
			}
		};
	return WL.Server.invokeHttp(input);
	
	
}


function initializePayment(id, authToken){
	
	var request_body = {
			"email": id
	}
	
	var input = { 
			method : 'post', 
			returnedContentType : 'json', 
			path : "/gscfsbmxusibmcom-apim/apim/v1/payments/initialize?client_id="+CLIENT_ID+"&client_secret="+CLIENT_SECRET,
			headers: { 
		        'Content-Type': 'application/json',
		        'Authorization': 'Bearer '+authToken
		    },
			body: {
				   	contentType: 'application/json; charset=UTF-8',
				   	content: JSON.stringify(request_body)
			}
		};
	return WL.Server.invokeHttp(input);
	
	
}

function getFinancialOverview(id, authToken){
	return financial_overview;
}

var financial_overview = {
	    "accounts_overview": {
	    	"summary": {

	        	"total_networth": 800000,

	        	"total_asset": 950000, 
	        	
	        	"total_liability": 150000,
	        	
	        	"total_rewards" : 23000

	        },
	        

	        "banks": [

	                  {

				        "info": {
			
				        	"full_name":"OpenFinancialNetwork",
			
				        	"short_name":"Open FN",
			
				        	"website":"http://openfn.com",
			
				        	"logo":"http://openfn/logo.png",
			
				        	"id":"B1000"
			
				        },

				        accounts: [
				                   

					        {
					        	"id":"A1000",
				
					        	"bank_id":"B1000",
				
					        	"label":"Advantage Checking",
				
					        	"type": "checking", 
				
					        	"number": "198828987630",
				
					        	"balance": 25000
				
					        },
					        {
					        	"id":"A1001",
				
					        	"bank_id":"B1000",
				
					        	"label":"Preferred Savings",
				
					        	"type": "savings", 
				
					        	"number": "198828987821",
				
					        	"balance": 250000
				
					        },
					        {
					        	"id":"A1002",
				
					        	"bank_id":"B1000",
				
					        	"label":"Travel Rewards",
				
					        	"type": "credit_card", 
				
					        	"number": "4470982001334660",
				
					        	"balance": 1000,
					        	
					        	"credit_line": 5000,
					        	
					        	"remaining_credit": 4000,
					        	
					        	"last_statement_balance": 1500,
					        	
					        	"payment_due_date": "Wed, 15 Feb 2017 00:00:00 GMT"
					        	
				
					        }

	        


					    ] //end of accounts array

	        },

	        {

		        "info": {
	
		        	"full_name":"Bank of Arcadia",
	
		        	"short_name":"BA",
	
		        	"website":"http://barcadia.com",
	
		        	"logo":"http://barcadia/logo.png",
	
		        	"id":"B1001"
	
		        },

		        accounts: [
		                   
			        {
			        	"id":"A1003",
		
			        	"bank_id":"B1001",
		
			        	"label":"Home Mortgage",
		
			        	"type": "mortgage", 
		
			        	"number": "6389023588",
		
			        	"balance": 200000,
			        	
			        	"home_market_value": 300000,
			        	
			        	"interest_rate": "4.10%",
			        	
			        	"monthly_payment": 3500
		
			        }

			    ] //end of accounts array

	        },
	        
	        {

		        "info": {
	
		        	"full_name":"Quivira Investments",
	
		        	"short_name":"QInvestments",
	
		        	"website":"http://qinvestments.com",
	
		        	"logo":"http://qinvestments/logo.png",
	
		        	"id":"B1002"
	
		        },

		        accounts: [
		                   
			        {
			        	"id":"A1004",
		
			        	"bank_id":"B1002",
		
			        	"label":"Trading Account",
		
			        	"type": "trading", 
		
			        	"number": "4669721073",
		
			        	"balance": 400000, 
			        	
			        	"market_value": 300000,
			        	
			        	"cash": 100000
		
			        },
			        {
			        	"id":"A1005",
		
			        	"bank_id":"B1002",
		
			        	"label":"Retirement Account",
		
			        	"type": "retirement", 
		
			        	"number": "4669721029",
		
			        	"balance": 100000
		
			        }

			    ] //end of accounts array

	        } 


	        ], //end of banks array
	        
        "asset" : {
    		"total" : {
    			"amount" : 20000000,
    			"currencyCode" : "USD"
    		},
    		"description" : "total assets",
    		"allocations" : [ {
    			"type" : "cash",
    			"amount" : {
    				"amount" : 20000000,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 40
    		}, {
    			"type" : "stock",
    			"amount" : {
    				"amount" : 0,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 20
    		}, {
    			"type" : "real estate",
    			"amount" : {
    				"amount" : 20000000,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 40
    		} ]
    	},
    	"liability" : {
    		"total" : {
    			"amount" : 20000000,
    			"currencyCode" : "USD"
    		},
    		"description" : "total liabilities",
    		"allocations" : [ {
    			"type" : "mortgage",
    			"amount" : {
    				"amount" : 20000000,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 40
    		}, {
    			"type" : "credit card",
    			"amount" : {
    				"amount" : 0,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 20
    		}, {
    			"type" : "auto",
    			"amount" : {
    				"amount" : 20000000,
    				"currencyCode" : "USD"
    			},
    			"percentage" : 40
    		} ]
    	}

	  } //end of accounts_overview
};