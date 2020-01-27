import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
const getEntity = state => state.entities;
export const getEntitySelector = () => store.entities;

// Reselect functions
export const getEntityState = createSelector(
	[getEntity],
	entities => entities
);
