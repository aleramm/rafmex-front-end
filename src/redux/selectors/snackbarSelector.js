import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
const getSnackBar = state => state.snackbar;
export const getSnackBarSelector = () => store.snackbar;

// Reselect functions
export const getSnackBarState = createSelector(
	[getSnackBar],
	snackbar => snackbar
);
