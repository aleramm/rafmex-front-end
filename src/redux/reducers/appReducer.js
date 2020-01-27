import update from 'immutability-helper';
import {
	SET_USER_PROFILE,
	SET_PARAMS_URL_REQUEST,
	IS_READY,
	SET_OFFICE,
	SET_OFFICES,
	SET_APPBAR_HEIGHT,
} from 'actions/app.actions';
import { getAppSelector } from 'selectors/appSelector';

const initAppState = getAppSelector();

export default (state = initAppState, action) => {
	switch (action.type) {
		case SET_USER_PROFILE:
			return update(state, {
				userProfile: {
					$set: action.payload,
				},
			});
		case SET_PARAMS_URL_REQUEST:
			return update(state, {
				headerRequest: {
					$set: action.payload,
				},
			});
		case IS_READY:
			return update(state, {
				operacionesReady: {
					$set: action.payload,
				},
			});
		case SET_OFFICE:
			return update(state, {
				oficina: {
					$set: action.payload,
				},
			});
		case SET_OFFICES:
			return update(state, {
				oficinas: {
					$set: action.payload,
				},
			});
		case SET_APPBAR_HEIGHT:
			return update(state, {
				appBarHeight: {
					$set: action.payload,
				},
			});
		default:
			return state;
	}
};
