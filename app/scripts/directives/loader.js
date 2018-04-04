


const loader = ($interval) => {

	const template = (	
		`<div class="loading" ng-show="isLoading">
			<span>{{ loading }}</span>
		</div>`
	);

	function link(scope, element) {
		let i = 0;
		const loadingInterval = setInterval(() => {
			i = ++i % 4;
			scope.loading = "Loading " + Array(i + 1).join(".");
			scope.$apply();
		}, 800);

		element.on("$destroy", function() {
			$interval.cancel(loadingInterval);
		});
	}


	return {
		restrict: "E",
		link,
		template
	};
};

export default loader;