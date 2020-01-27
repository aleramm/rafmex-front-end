import { connect } from 'react-redux';
import Progress from 'components/Progress/Progress';
import { getRequestProgressState } from 'selectors/uiSelector';

const mapStateToProps = state => ({
	requestProgress: getRequestProgressState(state),
});

export default connect(
	mapStateToProps,
	null
)(Progress);
