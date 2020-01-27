import { resetAuth } from 'actions/reset.actions';

const handleResetAuth = (dispatch, feature) => {
	dispatch(resetAuth({ feature, payload: true }));
	setTimeout(() => {
		dispatch(resetAuth({ feature, payload: false }));
	}, 100);
};

export default handleResetAuth;
