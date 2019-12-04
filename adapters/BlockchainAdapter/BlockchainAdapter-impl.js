/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */
var mock = true;
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

/**
 * @param 
 * @returns 
 */
function getCustomerPoints(userID) {
	
	var input = {
	    method : 'get',
	    parameters: { userid: userID },
	    returnedContentType : 'json',
	    path : "/getCustomerPoints"
	};

	if(!!mock){
		return mock_customerPoints;
	}else{
		return WL.Server.invokeHttp(input);
	}
	
}

function getTransactions(userID) {

	var input = {
		    method : 'get',
		    parameters: { userid: userID },
		    returnedContentType : 'json',
		    path : "/getusertransactions"
		};
	
	if(!!mock){
		return mock_transactions;
	}else{
		return WL.Server.invokeHttp(input);
	}
	
	
}

/**
 * @param 
 * @returns 
 */
function getSmartContracts() {
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : "/getallcontracts"
	};

	if(!!mock){
		return mock_smartcontracts;
	}else{
		return WL.Server.invokeHttp(input);
	}
	
	
}

/**
 * 
 */
function transferPoints(receiver, numOfActivities, type, contractID, description, dollarAmount, pointsToTransfer){
	
	var input = {
		    method : 'get',
		    parameters: { sender: "T5940872", //Travel apps OpenPoints account on blockchain
		    			receiver: receiver,
		    			activities: numOfActivities,
		    			type: type,
		    			contract: contractID,
		    			description: description,
		    			money: dollarAmount,
		    			amount: pointsToTransfer
		    		},
		    returnedContentType : 'html', //TODO rob to change this to json for status
		    path : "/transferpoints"
		};
	
	return WL.Server.invokeHttp(input);
	
}


var mock_transactions = {"transactions": [
                                         {
                                             "Amount": 100,
                                             "Contract": "Standard",
                                             "Date": "Wednesday, 04-May-16 19:14:41 UTC",
                                             "FromName": "Open Financial Network",
                                             "FromUserid": "1",
                                             "RefNumber": "0",
                                             "StatusCode": 1,
                                             "StatusMsg": "Transaction Completed",
                                             "ToName": "Natalie",
                                             "ToUserid": "3",
                                             "Type": "Redeemed",
                                             "description": "PointsTransfer PointsTransfer PointsTransfer PointsTransfer "
                                          },
                                          {
                                             "Amount": 100,
                                             "Contract": "Standard",
                                             "Date": "Wednesday, 04-May-16 19:15:49 UTC",
                                             "FromName": "Open Financial Network",
                                             "FromUserid": "1",
                                             "RefNumber": "1",
                                             "StatusCode": 1,
                                             "StatusMsg": "Transaction Completed",
                                             "ToName": "Natalie",
                                             "ToUserid": "3",
                                             "Type": "Redeemed",
                                             "description": "PointsTransfer PointsTransfer PointsTransfer PointsTransfer "
                                          },
                                          {
                                             "Amount": 100,
                                             "Contract": "Standard",
                                             "Date": "Thursday, 05-May-16 18:07:08 UTC",
                                             "FromName": "Open Financial Network",
                                             "FromUserid": "1",
                                             "RefNumber": "2",
                                             "StatusCode": 1,
                                             "StatusMsg": "Transaction Completed",
                                             "ToName": "Natalie",
                                             "ToUserid": "3",
                                             "Type": "Redeemed",
                                             "description": "PointsTransfer PointsTransfer PointsTransfer PointsTransfer "
                                          }
                                       ]};

var mock_customerPoints = {
		   "Balance": 2500,
		   "ExpirationDate": "2017-06-01",
		   "JoinDate": "2015-05-31",
		   "LastModifiedDate": "Friday, 06-May-16 17:22:12 UTC",
		   "Name": "Natalie",
		   "Status": "Platinum",
		   "UserId": "3",
		   "NumberOfTransactions":3
		};

var mock_smartcontracts = {
		"array": [
		          {
		             "BusinessId": "B1928564",
		             "BusinessName": "Open Financial Network",
		             "Conditions": [
		                "2x points for dinning and activities",
		                "Valid from May 11, 2016"
		             ],
		             "Description": "Earn double points on dining and selected travel activities using registered OpenFN credit card",
		             "EndDate": "2060-12-31T11:59:00Z",
		             "ID": "C289416",
		             "Icon": "",
		             "Method": "doubleContract",
		             "StartDate": "2016-05-11T12:00:00Z",
		             "Title": "Double Points using OpenFN Credit Card"
		          },
		          {
		             "BusinessId": "T5940872",
		             "BusinessName": "Open Travel Network",
		             "Conditions": [
		                "1,000 points for feedback on travel package ",
		                "100 points for feedback on each travel activity",
		                "Valid from May 11, 2016"
		             ],
		             "Description": "Earn points by telling your thoughts on travel package and activities",
		             "EndDate": "2060-12-31T11:59:00Z",
		             "ID": "C791594",
		             "Icon": "",
		             "Method": "feedbackContract",
		             "StartDate": "2016-05-11T12:00:00Z",
		             "Title": "Points for Feedback by Travel App"
		          }
		       ]
};


