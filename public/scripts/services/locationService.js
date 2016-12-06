app.service('locationService', function($http) {

	this.getLocation = function(callback) {
		$http.get('http://ip-api.com/json').then(callback);
	}


})