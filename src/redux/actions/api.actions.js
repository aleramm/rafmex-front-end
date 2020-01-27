// Action types
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_ERROR = 'API_ERROR';

// Action creators
export const apiRequest = feature => ({
	type: `${feature} ${API_REQUEST}`,
});
export const apiSuccess = feature => ({
	type: `${feature} ${API_SUCCESS}`,
});
export const apiError = feature => ({
	type: `${feature} ${API_ERROR}`,
});
