/* Action types */
export const OPERACIONES = '[OPERACIONES]';
export const OPERACIONES_INIT = `${OPERACIONES} INIT`;
export const IS_READY = `${OPERACIONES} IS_READY`;
export const SCANNER = `${OPERACIONES} SCANNING`;

// Url params
export const GET_PARAMS_URL = `${OPERACIONES} GET_PARAMS_URL`;
export const SET_PARAMS_URL_REQUEST = `${OPERACIONES} SET_PARAMS_URL_REQUEST`;
// User
export const GET_USER_PROFILE = `${OPERACIONES} GET_USER_PROFILE`;
export const SET_USER_PROFILE = `${OPERACIONES} SET_USER_PROFILE`;
// Sucursales
export const GET_OFFICE = `${OPERACIONES} GET_OFFICE`;
export const GET_OFFICES = `${OPERACIONES} GET_OFFICES`;
export const SET_OFFICE = `${OPERACIONES} SET_OFFICE`;
export const SET_OFFICES = `${OPERACIONES} SET_OFFICES`;
// Height containers
export const SET_APPBAR_HEIGHT = `${OPERACIONES} SET_APPBAR_HEIGHT`;

/* Action creators */
export const getParamsUrl = () => ({
	type: GET_PARAMS_URL,
});
export const setHeaderRequest = headerRequest => ({
	type: SET_PARAMS_URL_REQUEST,
	payload: headerRequest,
});
export const setUserProfile = userProfile => ({
	type: SET_USER_PROFILE,
	payload: userProfile,
});
export const setOperacionesReady = ready => ({
	type: IS_READY,
	payload: ready,
});
export const setOffice = oficina => ({
	type: SET_OFFICE,
	payload: oficina,
});
export const setOffices = oficinas => ({
	type: SET_OFFICES,
	payload: oficinas,
});
export const setAppBarHeight = appBarHeight => ({
	type: SET_APPBAR_HEIGHT,
	payload: appBarHeight,
});
