import { connect } from 'react-redux';
import Notification from 'components/Notification/Notification';
import { getNotification } from 'selectors/notificationSelector';

const mapStateToProps = state => ({
	notification: getNotification(state),
});

export default connect(
	mapStateToProps,
	null
)(Notification);
