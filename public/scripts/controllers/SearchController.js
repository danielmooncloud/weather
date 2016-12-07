app.controller('SearchController', function($window, $scope) {
	$scope.enter = function(e) {
		if(e.which === 13) {
			console.log('test');
			$window.location.href = '/#/test';
		}
	}
})