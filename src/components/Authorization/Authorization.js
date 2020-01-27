import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Portal,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	Button,
	TextField,
} from '@material-ui/core';
import { getPersonaState } from 'selectors/appSelector';
import { getResetAuthState } from 'selectors/resetSelector';
import galileoConfig from 'constants/galileoConfig';

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

@connect(store => ({
	persona: getPersonaState(store),
	resetAuth: getResetAuthState(store),
}))
class Authorization extends Component {
	state = {
		persona: '',
		contrasenia: '',
		personaAutoriza: '',
		contraseniaAutoriza: '',
		codigoFacultad: galileoConfig.CODIGO_FACULTAD,
		codigoFacultadAutoriza: galileoConfig.CODIGO_FACULTAD_AUTORIZA,
	};
	authDataForm = '';
	componentDidMount = () => {
		const { persona } = this.props;
		this.setState({ persona: '000006459' });
	};
	componentDidUpdate = (prevProps, prevState) => {
		const { onChangeAuth, resetAuth } = this.props;
		if (this.state !== prevState) {
			onChangeAuth(this.state);
		}
		if (resetAuth !== prevProps.resetAuth && resetAuth) {
			this.resetForm();
		}
	};
	resetForm = () => {
		this.setState({
			contrasenia: '',
			personaAutoriza: '',
			contraseniaAutoriza: '',
		});
	};
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		});
	};
	render() {
		const { open, onClose, disabledButtonAuth, onSubmit } = this.props;
		const { contrasenia, personaAutoriza, contraseniaAutoriza } = this.state;
		return (
			<Portal>
				{open && (
					<Dialog
						id="galileo-dialog-auth"
						fullWidth
						maxWidth="xs"
						open={open}
						aria-labelledby="dialog-title"
						aria-describedby="dialog-description"
					>
						<DialogTitle id="dialog-title">
							<div style={dialogTitleStyle}>Autorización</div>
						</DialogTitle>

						<DialogContent id="dialog-description" style={dialogContentStyle}>
							<form autoComplete="off">
								<div className="box g-mb-10">
									<h4 style={{ textTransform: 'initial' }}>Cajero</h4>
									<TextField
										type="password"
										label="Contraseña"
										name="contrasenia"
										onChange={this.handleChange}
										margin="dense"
										value={contrasenia}
										fullWidth
									/>
								</div>
								<div className="box">
									<h4 style={{ textTransform: 'initial' }}>Gerente/Subgerente</h4>
									<TextField
										label="Usuario"
										name="personaAutoriza"
										onChange={this.handleChange}
										margin="dense"
										value={personaAutoriza}
										fullWidth
									/>
									<TextField
										type="password"
										label="Contraseña"
										name="contraseniaAutoriza"
										margin="dense"
										onChange={this.handleChange}
										value={contraseniaAutoriza}
										fullWidth
									/>
								</div>
							</form>
						</DialogContent>

						<DialogActions>
							<Button color="primary" onClick={onClose}>
								Cancelar
							</Button>
							<Button
								variant="contained"
								color="primary"
								disabled={disabledButtonAuth}
								onClick={onSubmit}
							>
								Confirmar
							</Button>
						</DialogActions>
					</Dialog>
				)}
			</Portal>
		);
	}
}

export default Authorization;
