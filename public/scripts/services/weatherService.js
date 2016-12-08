
app.service('weatherService', function($http) {
	
	var logError = function(error) {
		console.log("error")
	}

	
	this.getWeather = function(callback) {
		var locationURL = 'http://ip-api.com/json';
		$http.get(locationURL).then(function(response) {
			var weatherObject = {
				"lat": response.data.lat,
				"lon": response.data.lon
			}
			
			$http.post('/api', weatherObject)
				 .then(callback)
				 .catch(logError)

		}).catch(logError);
	}


	
})

//https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:93722&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I
