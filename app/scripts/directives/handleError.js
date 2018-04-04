

const handleError = () => {
	
	const template = (
		`<div class="error-box" ng-show="error">
			<h2>{{error}}</h2>
			<span ng-click="clearErrorBox()">X</span>
		</div>`
	);

	return { template };
};


export default handleError;