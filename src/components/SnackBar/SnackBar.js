import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IconButton, Portal, Snackbar, SnackbarContent } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { hideSnackbar } from 'actions/snackbar.actions';

const handleClose = (dispatch, feature, message, reason = '', location = {}) => {
	if (Object.keys(location).length !== 0) {
		const [, path = ''] = location.pathname.substring(1).split('/');
		if (path && path === 'pago-servicios' && reason && reason === 'clickaway') {
			return;
		}
	}
	dispatch(hideSnackbar(feature, message));
};

const snackbarBackground = {
	success: '#43A047',
	warning: '#ffa000',
	error: '#d32f2f',
};

const SnackBar = props => {
	const { dispatch, location, snackbar } = props;
	const { open = false, message, feature, type = 'success', autoHideDuration = 3000 } = snackbar;

	return (
		<Portal>
			{open && (
				<Snackbar
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={open}
					autoHideDuration={autoHideDuration}
					onClose={(event, reason) =>
						handleClose(dispatch, feature, message, reason, location)
					}
					style={{
						flexWrap: 'nowrap',
					}}
				>
					<SnackbarContent
						style={{
							background: snackbarBackground[type],
							maxWidth: 300,
							flexWrap: 'nowrap',
						}}
						aria-describedby={`${type}-snackbar`}
						message={
							<span
								id={`${type}-snackbar`}
								style={{ display: 'flex', alignItems: 'center' }}
							>
								{message}
							</span>
						}
						action={[
							<IconButton
								key="close"
								aria-label="Close"
								color="inherit"
								onClick={() => handleClose(dispatch, feature, message)}
							>
								<CloseIcon />
							</IconButton>,
						]}
					/>
				</Snackbar>
			)}
		</Portal>
	);
};

export default withRouter(SnackBar);
