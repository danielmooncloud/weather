

const MainController = ($scope, weatherService) => {
	

	const handleError = (err) => {
		$scope.message = err.data.err.message;
		$scope.$apply();
	}

	$scope.clearErrorBox = () => {
		$scope.message = "";
		$scope.search = "";
	}

	const displayWeather = (response) => {
		const {city, state, currently, daily, hourly} = response.data
		$scope.city = city;
		$scope.state = state;
		$scope.current = currently;
		$scope.daily = daily.data;
		$scope.hourly = hourly.data;
		$scope.$apply();
	} 
	


	$scope.enter = (e) => {
		if(e.which === 13) {
			//remove spaces from the search value
			const search = $scope.search.split(' ').join('');
			let location;
			//Is the search value a zipcode?
			if(parseInt(search) && search.length === 5) {
				location = `components=postal_code:${search}`;
			} else {
				location = `address=${search}&components=country:US`;
			}
			getWeatherData(location);
		}
	}

	const getWeatherData = async (location) => {
		try {
			const weatherData = await weatherService.getWeather(location);
			displayWeather(weatherData);
		} catch(err) {
			handleError(err);
		}
	}

	getWeatherData();

	
}

export default MainController;