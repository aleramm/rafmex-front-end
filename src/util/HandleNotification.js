import { showNotification } from 'actions/notification.actions';

const handleNotification = (dispatch, props) => {
	const {
		type,
		content,
		okButtonTitle,
		cancelButtonTitle,
		onOk,
		onCancel,
		children,
		feature,
		autoFocus,
		size,
	} = props;
	dispatch(
		showNotification({
			payload: {
				open: true,
				type: type && type,
				content: content && content,
				okButtonTitle: okButtonTitle && okButtonTitle,
				cancelButtonTitle: cancelButtonTitle && cancelButtonTitle,
				size,
				onOk: onOk && onOk,
				onCancel: onCancel && onCancel,
				children: children && children,
				feature: feature && feature,
				autoFocus: autoFocus && autoFocus,
			},
		})
	);
};

export default handleNotification;
