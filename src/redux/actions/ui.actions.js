// Action types
export const REQUEST_PROGRESS = '[REQUEST_PROGRESS]';

// Action creators
export const requestProgress = ({ payload, feature }) => ({
	type: `${feature} ${REQUEST_PROGRESS}`,
	payload,
});
