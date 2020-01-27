import React from 'react';
import PropTypes from 'prop-types';
import { RootRef, Paper } from '@material-ui/core';

const Container = React.forwardRef((props, ref) => {
	const {
		img = '',
		subtitle = '',
		iconRight,
		title,
		style,
		card = true,
		padding = false,
		borderRadius = 4,
		bottomSeparation = true,
		height,
		className,
		titleStyle,
		children,
	} = props;
	let containerStyle = {
		display: 'block',
		width: '100%',
		border: 0,
	};
	let titleContainerStyle = {
		padding: '0.9375rem 0.9375rem 0',
		textAlign: 'left',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
	};
	const bottomSeparationStyle = (bottomSeparation && {
		margin: '0rem 0rem 0.9375rem',
	}) || { margin: 0 };
	const cardStyle = !card && { boxShadow: 'none' };
	const paddingStyle = (padding && { padding: 10 }) || { padding: 0 };
	const borderRadiusStyle = { borderRadius };
	const heightStyle = { height };
	containerStyle = {
		...containerStyle,
		...cardStyle,
		...style,
		...paddingStyle,
		...borderRadiusStyle,
		...bottomSeparationStyle,
		...heightStyle,
	};
	titleContainerStyle = {
		...titleContainerStyle,
		...titleStyle,
	};

	return (
		<RootRef rootRef={ref || {}}>
			<Paper className={className} style={containerStyle}>
				{title && (
					<div style={titleContainerStyle}>
						<h4>{title}</h4>
						{img && <img src={`./img/${img}.png`} alt="logo proveedor" />}
						{subtitle && (
							<div
								style={{
									display: 'flex',
								}}
							>
								<h4>{subtitle}</h4>
								<div style={{ color: '#233A79' }} className="g-ml-15">
									{iconRight}
								</div>
							</div>
						)}
					</div>
				)}
				{children}
			</Paper>
		</RootRef>
	);
});

Container.propTypes = {
	title: PropTypes.string,
	children: PropTypes.node,
};
Container.defaultProps = {
	title: '',
	children: '',
};

export default Container;
