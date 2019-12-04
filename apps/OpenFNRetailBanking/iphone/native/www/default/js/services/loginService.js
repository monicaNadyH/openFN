
/* JavaScript content from js/services/loginService.js in folder common */

angular.module('LoginService', []).factory('LoginService', ['$q',function($q){

	return {
        loginUser: function(username, password) {
        	
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (username && password) { 
                deferred.resolve('Welcome ' + username + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
	
}])