

const MainController = ($scope, weatherService) => {
	
	const zipCode = search => typeof parseInt(search) === 'number' && search.length === 5;		
	
		
	const displayWeather = response => {
		if(response.status === 200) {
			$scope.city = response.data.city;
			$scope.state = response.data.region;
			$scope.current = response.data.currently;
			$scope.daily = response.data.daily.data;
			$scope.hourly = response.data.hourly.data;
		} else {
			console.log("There was an error getting the weather Data for this location")
		}
	}

	$scope.enter = e => {
		if(e.which === 13) {
			const search = $scope.search.split(' ').join('');
			const location = zipCode(search) ? `components=postal_code:${search}` : `address=${search}&components=country:US`;
			weatherService.getWeatherFromSearch(location, displayWeather);
		}
	}

	weatherService.getWeatherFromIP(displayWeather);
	
}

export default MainController;