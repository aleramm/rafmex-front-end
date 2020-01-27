import { resetForm } from 'actions/reset.actions';

const handleResetForm = (dispatch, feature) => {
	dispatch(resetForm({ feature, payload: true }));
	setTimeout(() => {
		dispatch(resetForm({ feature, payload: false }));
	}, 1000);
};

export default handleResetForm;
