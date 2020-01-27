import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
const getRequestProgress = state => state.ui.requestProgress;
export const getUiSelector = () => store.ui;

// Reselect functions
export const getUiState = createSelector(
	[getUiSelector],
	ui => ui
);
export const getRequestProgressState = createSelector(
	[getRequestProgress],
	requestProgress => requestProgress
);
