import update from 'immutability-helper';
import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from 'actions/notification.actions';
import { getNotificationSelector } from 'selectors/notificationSelector';

const initNotificationState = getNotificationSelector();

export default (state = initNotificationState, action) => {
	switch (true) {
		case action.type.includes(SHOW_NOTIFICATION):
			return update(state, {
				$set: action.payload,
			});
		case action.type.includes(HIDE_NOTIFICATION):
			return initNotificationState;

		default:
			return state;
	}
};
