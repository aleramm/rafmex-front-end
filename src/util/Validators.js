export const isEmptyObject = obj => {
	return (
		obj &&
		typeof obj === 'object' &&
		obj.constructor === Object &&
		Object.keys(obj).length !== 0
	);
};
export const isValidNumber = value => {
	return typeof value === 'number' && Number.isFinite(value);
};
export const isValidDate = value => {
	return value instanceof Date;
};
export const isArray = value => {
	return Array.isArray(value);
};
