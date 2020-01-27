import { requestProgress } from 'actions/ui.actions';

const handleProgress = (dispatch, { show = true, transparency, message, feature }) => {
	const statusRequest = (show && 'SHOW') || 'HIDE';
	dispatch(
		requestProgress({
			payload: {
				show,
				transparency: transparency && transparency,
				message: message && message,
			},
			feature: `${feature} ${statusRequest}`,
		})
	);
};

export default handleProgress;
