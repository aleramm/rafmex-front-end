import { createSelector } from 'reselect';
import store from '../store/index';

// Selectors
export const getNotificationSelector = () => store.notification;
export const getNotification = state => state.notification;

// Reselect functions
export const getNotificationState = createSelector(
	[getNotification],
	notification => notification
);
