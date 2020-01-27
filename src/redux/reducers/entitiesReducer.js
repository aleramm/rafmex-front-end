import update from 'immutability-helper';
import { RESET_ENTITY } from 'actions/reset.actions';
import { SET_ACTION } from 'actions/getter.actions';
import { getEntitySelector } from 'selectors/entitySelector';

const initState = getEntitySelector();

export default (state = initState, action) => {
	switch (true) {
		case action.type.includes(SET_ACTION):
			return update(state, {
				[action.entity.epic]: {
					[action.entity.module]: {
						$set: action.payload,
					},
				},
			});

		case action.type.includes(RESET_ENTITY):
			return update(state, {
				[action.entity.epic]: {
					[action.entity.module]: {
						$set: action.payload,
					},
				},
			});
		default:
			return state;
	}
};
