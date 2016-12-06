app.directive('onKeypress', function() {
	return {
		scope: {
			handler: '&onKeypress'
		},
		link: function(scope, element) {
			element.bind('keypress', function(e) {
				scope.handler({$event: e});
			})
		}
	}
})