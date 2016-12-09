
app.service('weatherService', function($http) {

	this.ipLocationUrl = 'http://ip-api.com/json';

	this.zipLocationUrl = ['https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:', '&key=AIzaSyBq5sH5ZGsj21YvMM8i1G0d_ZcGds7Ll4I'];


	var logError = function(error) {
		console.log("error")
	}

	
	this.getWeather = function(firstCallback, secondCallback, url) {
		
		$http.get(url)
			.then(firstCallback)
			.then(function(object) {
				return $http.post('/api', object)
			})
			.then(secondCallback)
			.catch(logError)
			
	}	
})

