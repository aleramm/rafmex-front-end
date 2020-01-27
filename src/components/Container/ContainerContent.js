import React from 'react';
import PropTypes from 'prop-types';

const ContainerContent = React.forwardRef((props, ref) => {
	const { className, padding = true, style } = props;
	const paddingStyle = (padding && { padding: 15 }) || { padding: 0 };
	const containerContentStyle = { ...paddingStyle, ...style };
	return (
		<div className={className} style={containerContentStyle} ref={ref}>
			{props.children}
		</div>
	);
});

ContainerContent.propTypes = {
	padding: PropTypes.bool,
	children: PropTypes.node,
	style: PropTypes.object,
};
ContainerContent.defaultProps = {
	children: '',
};

export default ContainerContent;
