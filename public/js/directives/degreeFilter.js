app.filter('toCelsius', function() {


	return function(number) {
		return Math.floor((5/9) * (number - 32));
	}
});