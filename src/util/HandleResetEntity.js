import { resetEntity } from 'actions/reset.actions';

const handleResetEntity = (dispatch, epic, mod, typeReset = []) => {
	dispatch(
		resetEntity({
			epic,
			module: mod,
			typeReset,
		})
	);
};

export default handleResetEntity;
