

const search = () => {
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
};


export default search;