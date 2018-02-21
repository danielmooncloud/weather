
const degreeFilter = () => {
	return (number) => {
		Math.floor((5/9) * (number - 32));
	};
};

export default degreeFilter;