app.service('weatherService', function($http) {
	
	this.getWeather = function(callback) {
		var locationURL = 'http://ip-api.com/json';
		$http.get(locationURL).then(function(response) {
			
			var weatherObject = {
				"lat": response.data.lat,
				"lon": response.data.lon
			} 
		
			$http.post('/api', weatherObject).then(callback);
			
		});
	} 
	
	this.getLocation = function(callback) {
		var locationURL = 'http://ip-api.com/json';
		$http.get(locationURL).then(callback);
	}
})

