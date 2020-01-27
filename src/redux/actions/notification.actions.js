// Action types
export const NOTIFICATION = '[NOTIFICATION]';
export const SHOW_NOTIFICATION = `${NOTIFICATION} SHOW`;
export const HIDE_NOTIFICATION = `${NOTIFICATION} HIDE`;

// Action creators
export const showNotification = ({ payload }) => ({
	type: `${payload.feature} ${SHOW_NOTIFICATION}`,
	payload,
});
export const hideNotification = feature => ({
	type: `${feature} ${HIDE_NOTIFICATION}`,
	payload: {},
});
