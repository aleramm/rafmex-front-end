import React from 'react';
import {
	Portal,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Button,
} from '@material-ui/core';

const modalColor = {
	primary: '#233A79',
	question: '#1976D2',
	info: '#1976D2',
	success: '#43A047',
	warning: '#D98E0E',
	error: '#D32F2F',
};
const dialogTitleStyle = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'flex-start',
};
const dialogContentStyle = {
	padding: '0 1.5rem 1.5rem',
	fontSize: '1.125rem',
	fontWeight: 400,
	color: '#37474f',
	wordBreak: 'break-word',
};
const Notification = ({ notification }) => {
	const {
		type = 'primary',
		content,
		open = false,
		okButtonTitle = 'Confirmar',
		cancelButtonTitle = 'Cancelar',
		onOk,
		onCancel,
		children,
		size = 'xs',
		autoFocus,
		disabled,
	} = notification;
	return (
		<Portal>
			{open && (
				<Dialog
					fullWidth
					maxWidth={size}
					open={open}
					id="galileo-dialog"
					aria-labelledby="dialog-title"
					aria-describedby="dialog-description"
				>
					<DialogTitle id="dialog-title">
						<div style={dialogTitleStyle}>
							{content && <h3 className="dialog-title">{content}</h3>}
						</div>
					</DialogTitle>
					{children && (
						<DialogContent id="dialog-description" style={dialogContentStyle}>
							{children && children}
						</DialogContent>
					)}
					{(onOk || onCancel) && (
						<DialogActions>
							{onCancel && (
								<Button
									onClick={onCancel}
									color="primary"
									style={{ color: modalColor[type] }}
								>
									{cancelButtonTitle && cancelButtonTitle}
								</Button>
							)}
							{onOk && (
								<Button
									variant="contained"
									onClick={onOk}
									color="primary"
									disabled={disabled && disabled}
									autoFocus={(autoFocus && autoFocus) || Boolean(onCancel)}
									focusRipple={(autoFocus && autoFocus) || Boolean(onCancel)}
									style={{
										background: modalColor[type],
										color: '#ffffff',
									}}
								>
									{okButtonTitle && okButtonTitle}
								</Button>
							)}
						</DialogActions>
					)}
				</Dialog>
			)}
		</Portal>
	);
};

export default Notification;
