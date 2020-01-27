import { showSnackbar } from 'actions/snackbar.actions';

const handleSnackbar = (dispatch, props) => {
	const { message, feature } = props;
	dispatch(
		showSnackbar({
			payload: {
				open: true,
				message: message && message,
				feature: feature && feature,
			},
		})
	);
};

export default handleSnackbar;
