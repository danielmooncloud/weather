app.controller('SearchController', function($window, $scope) {
	$scope.enter = function(e) {
		if(e.which === 13) {
			var path = $scope.search;
			$window.location.href = '/#/search/' + path;
		}
	}
})