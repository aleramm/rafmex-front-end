import update from 'immutability-helper';
import { RESET_FORM, RESET_AUTH } from 'actions/reset.actions';
import { getResetSelector } from 'selectors/resetSelector';

const initResetState = getResetSelector();

export default (state = initResetState, action) => {
	switch (true) {
		case action.type.includes(RESET_FORM):
			return update(state, {
				resetForm: {
					$set: action.payload,
				},
			});
		case action.type.includes(RESET_AUTH):
			return update(state, {
				resetAuth: {
					$set: action.payload,
				},
			});

		default:
			return state;
	}
};
