import update from 'immutability-helper';
import { SHOW_SNACKBAR, HIDE_SNACKBAR } from 'actions/snackbar.actions';
import { getSnackBarSelector } from 'selectors/snackbarSelector';

const initSnackBarState = getSnackBarSelector();

export default (state = initSnackBarState, action) => {
	switch (true) {
		case action.type.includes(SHOW_SNACKBAR):
			return update(state, {
				$set: action.payload,
			});
		case action.type.includes(HIDE_SNACKBAR):
			return update(state, {
				$set: action.payload,
			});

		default:
			return state;
	}
};
