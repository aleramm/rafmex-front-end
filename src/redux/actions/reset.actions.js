// Action types
export const RESET = '[RESET]';
export const RESET_ENTITY = `${RESET} ENTITY`;
export const RESET_FORM = `${RESET} FORM`;
export const RESET_AUTH = `${RESET} AUTH`;

// Action creators
export const resetEntity = ({ epic, module, typeReset = [] }) => ({
	type: RESET_ENTITY,
	payload: typeReset,
	entity: {
		epic,
		module,
	},
});

export const resetForm = ({ feature, payload }) => ({
	type: `${feature} ${RESET_FORM}`,
	payload,
});
export const resetAuth = ({ feature, payload }) => ({
	type: `${feature} ${RESET_AUTH}`,
	payload,
});
