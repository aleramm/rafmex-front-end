// Action types
export const SNACKBAR = '[SNACKBAR]';
export const SHOW_SNACKBAR = `${SNACKBAR} SHOW`;
export const HIDE_SNACKBAR = `${SNACKBAR} HIDE`;

// Action creators
export const showSnackbar = ({ payload }) => ({
	type: `${payload.feature} ${SHOW_SNACKBAR}`,
	payload,
});
export const hideSnackbar = (feature, message) => ({
	type: `${feature} ${HIDE_SNACKBAR}`,
	payload: { message },
});
