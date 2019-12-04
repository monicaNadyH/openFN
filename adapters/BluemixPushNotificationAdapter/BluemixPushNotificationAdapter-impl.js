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


function registerDevice(deviceId, deviceToken, userId) {
	WL.Logger.warn("registerDevice deviceId="+deviceId+" deviceToken="+deviceToken+" userId="+userId);
	var path = "/imfpush/v1/apps/3d4d648f-1c89-43ac-93a7-6df4b1d8125f/devices";
	var bodyJSON = {
			"deviceId": deviceId,
			"platform": "A",
			"token": deviceToken,
			"userId": userId
	};
	
	var input = {
	    method : 'post',
	    returnedContentType : 'json',
	    path : path,
		headers: { 
	        'clientSecret': 'c0e3c853-45b6-4e13-91f0-5061dd5de9f1' 
	    },
	    body: {
		   	contentType: 'application/json; charset=UTF-8',
		   	content: JSON.stringify(bodyJSON)
	    }
	    	
	};

	return WL.Server.invokeHttp(input);
}

function unregisterDevice(deviceId) {
	WL.Logger.warn("unregisterDevice deviceId="+deviceId);
	var path = "/imfpush/v1/apps/3d4d648f-1c89-43ac-93a7-6df4b1d8125f/devices/"+deviceId;
	
	
	var input = {
	    method : 'delete',
	    returnedContentType : 'json',
	    path : path,
		headers: { 
	        'clientSecret': 'c0e3c853-45b6-4e13-91f0-5061dd5de9f1' 
	    }
	    	
	};


	return WL.Server.invokeHttp(input);
}

function getDevices() {
	
	var path = "/imfpush/v1/apps/3d4d648f-1c89-43ac-93a7-6df4b1d8125f/devices";
	
	var input = {
	    method : 'get',
	    returnedContentType : 'json',
	    path : path,
		headers: { 
	        'clientSecret': 'c0e3c853-45b6-4e13-91f0-5061dd5de9f1' 
	    }
	};

	return WL.Server.invokeHttp(input);
}
