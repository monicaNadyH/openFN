
/* JavaScript content from js/services/adapterFactory.js in folder common */

angular.module('adapterFactoryModule', []).factory('AdapterFactory', ['$state', '$q', function($state, $q){
	var sanitize = function(obj){
		for (var p in obj){
			if (p == "_id"){
				// Don't sanitizie out the mongodb ids
				continue;
			} else if (p.indexOf("$") >= 0){
				delete(obj[p]);
			} else {
				if (typeof obj[p] == "object"){
					obj[p] = sanitize(obj[p]);
				}					
			}
		}
		return obj;
	}
	var svc = {
		callAdapter: function($scope, adapterName, resourceName, verb, queryParamObj, content){
			var deferred = $q.defer();

			var sanitizedContent = !!content ? sanitize(content) : null;
			
			var request = new WLResourceRequest('/adapters/' + adapterName + '/' + resourceName, verb);
			request.setTimeout(15000);
			if (!!queryParamObj){				
				
				for (var prop in queryParamObj){
					console.log("prop="+prop+" queryParamObj[prop]="+queryParamObj[prop]);
					request.setQueryParameter(prop, queryParamObj[prop]);
				}				
			}
			request.addHeader("Content-Type", "application/json");
			request.send(content).then(
				function(response) {
					$scope.$apply(function(){
						console.debug("Adapter call successful: response: %o", response);
						deferred.resolve(response);							
					})
				},
				function(error) { 
					// the error code and description can be found in error.errorCode and error.errorMsg fields respectively
					$scope.$apply(function(){
						console.debug("Adapter call FAILED: error: %o", error);
						deferred.reject(error);
					});
				}
			);		
			return deferred.promise;
		}
	}
	return svc;
}]);
