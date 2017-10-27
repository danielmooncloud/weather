

const MainController = ($scope, weatherService) => {
	
					
	const displayWeather = response => {
		if(response.status === 200) {
			const {city, region, currently, daily, hourly} = response.data
			$scope.city = city;
			$scope.state = region;
			$scope.current = currently;
			$scope.daily = daily.data;
			$scope.hourly = hourly.data;
			$scope.error = "";
		} 
	}

	const handleError = error => {
		$scope.error = error.data.err.message;
	}

	$scope.enter = e => {
		if(e.which === 13) {
			//remove spaces from the search value
			const search = $scope.search.split(' ').join('');
			//Is the search value a zipcode?
			const location = parseInt(search) && search.length === 5 ? 
				`components=postal_code:${search}` : 
				`address=${search}&components=country:US`
			weatherService.getWeatherFromSearch(location, displayWeather, handleError);
		}
	}

	weatherService.getWeatherFromIP(displayWeather, handleError);
}

export default MainController;