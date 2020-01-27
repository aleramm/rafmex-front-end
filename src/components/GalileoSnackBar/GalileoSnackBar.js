import { connect } from 'react-redux';
import SnackBar from 'components/SnackBar/SnackBar';
import { getSnackBarState } from 'selectors/snackbarSelector';

const mapStateToProps = state => ({
	snackbar: getSnackBarState(state),
});

export default connect(
	mapStateToProps,
	null
)(SnackBar);
