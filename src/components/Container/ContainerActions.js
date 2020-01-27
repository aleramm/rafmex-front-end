import React from 'react';
import PropTypes from 'prop-types';

const ContainerActions = React.forwardRef((props, ref) => {
	const { className, padding = true, style } = props;
	const marginStyle = (padding && { padding: 8 }) || { padding: 0 };
	let containerActionsStyle = {
		flex: '0 0 auto',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
	};
	containerActionsStyle = { ...containerActionsStyle, ...marginStyle, ...style };
	return (
		<div className={className} style={containerActionsStyle} ref={ref}>
			{props.children}
		</div>
	);
});

ContainerActions.propTypes = {
	children: PropTypes.node,
};
ContainerActions.defaultProps = {
	children: '',
};

export default ContainerActions;
