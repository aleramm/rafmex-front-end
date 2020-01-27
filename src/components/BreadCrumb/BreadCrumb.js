/* eslint-disable no-console */
import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import mainMenu from 'constants/Menu';

const containerBreadcrumb = {
	margin: '0.9375rem 0rem',
	display: 'inline-flex',
};
const breadcrumbSeparator = {
	color: '#233A79',
	margin: '0 0.3125rem',
};
const parentBreadcrumb = {
	color: '#233A79',
	fontSize: 'initial',
	fontWeight: 400,
};
const childBreadcrumb = {
	color: '#233A79',
	fontSize: 'initial',
	fontWeight: 500,
};

const BreadCrumb = ({ location }) => {
	const [, firstPath = ''] = location.pathname.substring(1).split('/');
	let menuObject = {};

	if (location.pathname !== '/' && Object.keys(firstPath).length === 0) {
		console.warn('Breadcrumb doesn´t exists');
	}
	if (Object.keys(firstPath).length !== 0) {
		menuObject = mainMenu.find(menu => menu.path === firstPath);
	}

	return (
		<Fragment>
			{location.pathname !== '/' &&
				(!!menuObject && !!menuObject.primaryText && !!menuObject.secondaryText && (
					<div style={containerBreadcrumb}>
						<span style={parentBreadcrumb}>{menuObject.primaryText}</span>
						<span style={breadcrumbSeparator}>{`>`}</span>
						<span style={childBreadcrumb}>{menuObject.secondaryText}</span>
					</div>
				))}
		</Fragment>
	);
};

export default withRouter(BreadCrumb);
