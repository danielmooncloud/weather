

const keypress = () => {
	return {
		scope: {
			handler: "&onKeypress"
		},
		link(scope, element) {
			element.bind("keypress", (e) => {
				scope.handler({$event: e});
			});
		}
	};
};


export default keypress;