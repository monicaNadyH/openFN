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

var credentials = {
		textToSpeech: {
			username: "6d9d7a9a-e245-42e6-a56d-24a0cb62e69f",
			password: "uTzRrzeN5eKI",
			url: "https://stream.watsonplatform.net/text-to-speech/api"
		},
		speechToText: {
			username: "e2e661c0-7c35-42e1-8299-5852d7e6221b",
			password: "kdCbKXaGs7Y6",
			url: "https://stream.watsonplatform.net/speech-to-text/api"
		}
}

/**
 * 
 */
function getCredentials() {
	return credentials;
}
