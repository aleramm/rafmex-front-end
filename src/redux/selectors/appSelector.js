import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
const getHeaderRequest = state => state.app.headerRequest;
const getUserProfile = state => state.app.userProfile;
const getUserProfileSucursal = state => state.app.userProfile.sucursal;
const getPersona = state => state.app.userProfile.noPersona;
const getOperacionesReady = state => state.app.operacionesReady;
const getOffice = state => state.app.oficina;
const getOffices = state => state.app.oficinas;
const getAppBarHeight = state => state.app.appBarHeight;
export const getAppSelector = () => store.app;

// Reselect functions
export const getPersonaState = createSelector(
	[getPersona],
	noPersona => noPersona
);
export const getUserProfileSucursalState = createSelector(
	[getUserProfileSucursal],
	sucursal => sucursal
);
export const getHeaderRequestState = createSelector(
	[getHeaderRequest],
	headerRequest => headerRequest
);
export const getUserProfileState = createSelector(
	[getUserProfile],
	userProfile => userProfile
);
export const getOperacionesReadyState = createSelector(
	[getOperacionesReady],
	operacionesReady => operacionesReady
);
export const getOfficeState = createSelector(
	[getOffice],
	oficina => oficina
);
export const getOfficesState = createSelector(
	[getOffices],
	oficinas => oficinas
);
export const getAppBarHeightState = createSelector(
	[getAppBarHeight],
	appBarHeight => appBarHeight
);
