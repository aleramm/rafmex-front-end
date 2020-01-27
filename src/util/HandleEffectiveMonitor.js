const getAmountBarColor = nivelCaja => {
	let background = '#3d8947';
	if (nivelCaja === 1) {
		background = '#d0021b';
	}
	if (nivelCaja === 2) {
		background = '#f5a623';
	}
	return background;
};
const getAmountBarWidth = percentage => {
	let width = `${percentage}%`;
	if (percentage >= 100) {
		width = '100%';
	}
	return width;
};

const updateEffectiveBar = (nivelCaja, montoFinal) => {
	const amountPercentage = (montoFinal / 20000) * 100;
	const background = getAmountBarColor(nivelCaja);
	const width = getAmountBarWidth(amountPercentage);
	return { background, width };
};

export default updateEffectiveBar;
