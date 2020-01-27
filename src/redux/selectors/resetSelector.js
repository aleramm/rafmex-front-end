import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
export const getResetSelector = () => store.reset;
const getResetForm = state => state.reset.resetForm;
const getResetAuth = state => state.reset.resetAuth;

// Reselect functions
export const getResetFormState = createSelector(
	[getResetForm],
	resetForm => resetForm
);
export const getResetAuthState = createSelector(
	[getResetAuth],
	resetAuth => resetAuth
);
