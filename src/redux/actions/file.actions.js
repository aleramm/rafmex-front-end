// Action types
export const UPLOAD_FILE = '[UPLOAD_FILE]';
export const UPLOAD_FILE_FALLECIMIENTOS = `${UPLOAD_FILE} ${'FALLECIMIENTOS'}`;

// Action creators
export const uploadFile = ({ payload, feature }) => ({
	type: `${feature} ${UPLOAD_FILE}`,
	payload,
});

export const setResponseFileLoaded = ({ payload, feature }) => ({
	type: `${feature} ${UPLOAD_FILE_FALLECIMIENTOS}`,
	payload,
});
