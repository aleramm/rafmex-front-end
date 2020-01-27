import update from 'immutability-helper';
import { REQUEST_PROGRESS } from 'actions/ui.actions';
import { getUiSelector } from 'selectors/uiSelector';

const initUiState = getUiSelector();

export default (state = initUiState, action) => {
	switch (true) {
		case action.type.includes(REQUEST_PROGRESS):
			return update(state, {
				requestProgress: {
					$set: action.payload,
				},
			});
		default:
			return state;
	}
};
