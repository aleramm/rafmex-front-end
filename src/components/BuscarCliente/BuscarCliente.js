import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import { Button, Grid, TextField } from '@material-ui/core';
import Container from 'components/Container/Container';
import ContainerContent from 'components/Container/ContainerContent';
import ContainerActions from 'components/Container/ContainerActions';
import Table from 'components/Table/Table';
import SelectField from 'components/SelectField/SelectField';
import { setClienteNoEncontrado } from 'actions/buscarCliente.actions';
import { headers } from 'constants/headers';
import { getHeaderRequestState, getOfficeState, getOfficesState } from 'selectors/appSelector';
import {
	getBuscarClienteNombreState,
	getBuscarClienteContratoState,
	getBuscarClienteClienteState,
	getBscarClienteResultadoBusquedaState,
	getBuscarClienteExisteClienteState,
} from 'selectors/buscarClienteSelector';
import handleResetForm from 'util/HandleResetForm';
import handleResetEntity from 'util/HandleResetEntity';
import handleResetCliente from 'util/HandleResetCliente';
import {
	buscarPorContrato,
	buscarPorNombre,
	buscarPorTelefono,
	buscarContratoSeleccionado,
} from './BuscarClienteActions';
import './BuscarCliente.css';

@connect(store => ({
	headerRequest: getHeaderRequestState(store),
	contrato: getBuscarClienteContratoState(store),
	nombreCliente: getBuscarClienteNombreState(store),
	cliente: getBuscarClienteClienteState(store),
	resultadoBusqueda: getBscarClienteResultadoBusquedaState(store),
	existeCliente: getBuscarClienteExisteClienteState(store),
	oficina: getOfficeState(store),
	oficinas: getOfficesState(store),
}))
class BuscarCliente extends Component {
	state = {
		noContrato: '',
		nombre: '',
		idOficina: '',
		apellidoPaterno: '',
		apellidoMaterno: '',
		numeroTelefono: '',
	};
	contrato = '';
	oficina = '';
	container = React.createRef();
	clientContainer = React.createRef();
	formContainer = React.createRef();
	totalFormFields = 6;
	componentDidMount = () => {
		const { oficina } = this.props;
		this.handleSetOficina(oficina);
	};
	componentDidUpdate = prevProps => {
		const { contrato, oficina, existeCliente } = this.props;

		if (prevProps.contrato !== contrato) {
			this.handleResetContrato(contrato);
		}
		if (prevProps.existeCliente !== existeCliente && existeCliente) {
			this.addContainerEvents();
			this.addClassContainer();
		}
		if (prevProps.contrato !== contrato && contrato === '') {
			this.removeContainerEvents();
			this.handleSetOficina(oficina);
			this.oficina = '';
			this.formContainer.classList.remove('inactive-form');
		}
	};
	componentWillUnmount = () => {
		const { dispatch } = this.props;
		handleResetCliente(dispatch);
		handleResetEntity(dispatch, 'buscarCliente', 'contrato', '');
	};
	handleResetContrato = noContrato => {
		this.setState({
			noContrato,
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			numeroTelefono: '',
		});
	};
	handleSetOficina = idOficina => {
		this.setState({ idOficina });
	};
	addContainerEvents = () => {
		this.container.addEventListener('mouseenter', this.onMouseEnterContainer);
		this.container.addEventListener('mouseleave', this.onMouseLeaveContainer);
	};
	removeContainerEvents = () => {
		this.container.removeEventListener('mouseenter', this.onMouseEnterContainer);
		this.container.removeEventListener('mouseleave', this.onMouseLeaveContainer);
	};
	addClassContainer = () => {
		this.clientContainer.classList.add('client-container', 'active-client');
		this.formContainer.classList.add('inactive-form');
	};
	removeClassContainer = () => {
		this.clientContainer.classList.remove('active-client');
		this.formContainer.classList.remove('inactive-form');
	};
	onMouseEnterContainer = () => {
		this.removeClassContainer();
	};
	onMouseLeaveContainer = () => {
		this.addClassContainer();
	};
	resetForm = async () => {
		const { dispatch, oficina } = this.props;
		this.setState({
			noContrato: '',
			idOficina: oficina,
			nombre: '',
			apellidoPaterno: '',
			apellidoMaterno: '',
			numeroTelefono: '',
		});
		this.oficina = '';
		handleResetCliente(dispatch);
		handleResetForm(dispatch, 'BUSCAR_CLIENTE');
		await this.removeContainerEvents();
	};
	handleForm = e => {
		if (e.target.name === 'noContrato') {
			this.setState({
				[e.target.name]: /^[0-9\b]+$/.test(e.target.value) ? e.target.value : '',
			});
			return;
		}

		if (
			(e.target.name === 'nombre' ||
				e.target.name === 'apellidoPaterno' ||
				e.target.name === 'apellidoMaterno') &&
			!/^[a-zA-Z ]+$/.test(e.target.value) &&
			e.target.value === ''
		) {
			this.setState({ [e.target.name]: '' });
			return;
		}
		if (e.target.option) {
			this.oficina = e.target.option;
			this.setState({
				[e.target.name]: e.target.option,
			});
			return;
		}
		this.setState({
			[e.target.name]:
				(typeof e.target.value !== 'number' && e.target.value.toUpperCase()) ||
				e.target.value,
		});
	};
	handleSubmit = (e, disableContrato = false, disableNombre = false, disableTelefono = false) => {
		e.preventDefault();
		document.activeElement.blur();
		const { noContrato, idOficina } = this.state;
		const {
			dispatch,
			headerRequest,
			status,
			description,
			view = 'Vista desconocida',
			endpoint,
		} = this.props;
		this.contrato = noContrato;
		const fullFields = Object.values(this.state).filter(field => field !== '');
		if (fullFields.length > 1) {
			dispatch(setClienteNoEncontrado());
			handleResetEntity(dispatch, 'buscarCliente', 'resultadoBusqueda', []);
			this.handleSetOficina(this.oficina || idOficina);
			if (disableContrato && disableTelefono) {
				buscarPorNombre(dispatch, headerRequest, this.state, {
					view,
					status,
					description,
				});
			}

			if (disableNombre && disableTelefono) {
				buscarPorContrato(
					dispatch,
					headerRequest,
					idOficina.value,
					noContrato,
					view,
					endpoint
				);
			}
			if (disableContrato && disableNombre) {
				buscarPorTelefono(dispatch, headerRequest, this.state, {
					view,
					description,
				});
			}
		}
	};
	handleSelectedRows = e => {
		const { dispatch, view, headerRequest, endpoint } = this.props;
		const { idOficina } = this.state;
		this.contrato = e.contrato;
		handleResetEntity(dispatch, 'buscarCliente', 'resultadoBusqueda', []);
		buscarContratoSeleccionado(
			dispatch,
			headerRequest,
			idOficina.value,
			this.contrato,
			view,
			endpoint
		);
	};
	render() {
		const {
			noContrato,
			idOficina,
			apellidoPaterno,
			apellidoMaterno,
			nombre,
			numeroTelefono,
		} = this.state;
		const { contrato, nombreCliente, resultadoBusqueda, existeCliente, oficinas } = this.props;

		const disableContrato =
			(apellidoMaterno || apellidoPaterno || nombre || numeroTelefono) && true;
		const disableNombre = (noContrato || numeroTelefono) && true;
		const disableTelefono =
			(apellidoMaterno || apellidoPaterno || nombre || noContrato) && true;

		return (
			<Fragment>
				<Container>
					<div className="search-client-container" ref={node => (this.container = node)}>
						{existeCliente && (
							<ContainerContent
								className="client-container"
								ref={node => (this.clientContainer = node)}
							>
								<div>
									<span className="cliente-title">Número de contrato: </span>
									<span className="cliente-description">
										{contrato && contrato}
									</span>
								</div>
								<div>
									<span className="cliente-title">Cliente: </span>
									<span className="cliente-description">
										{nombreCliente && nombreCliente}
									</span>
								</div>
							</ContainerContent>
						)}

						<div className="form-container" ref={node => (this.formContainer = node)}>
							<h4 style={{ padding: '0.9375rem 0.9375rem 0rem' }}>Buscar cliente</h4>

							<form
								autoComplete="off"
								onSubmit={e =>
									this.handleSubmit(
										e,
										disableContrato,
										disableNombre,
										disableTelefono
									)
								}
							>
								<ContainerContent>
									<Grid
										container
										direction="row"
										justify="flex-start"
										alignItems="flex-end"
										spacing={1}
									>
										<Grid item xs={2}>
											<TextField
												id="noContrato"
												label="Contrato"
												name="noContrato"
												onChange={event => this.handleForm(event)}
												value={noContrato}
												margin="normal"
												disabled={
													(disableContrato && disableContrato) || false
												}
												fullWidth
												style={{ margin: 0 }}
												inputProps={{
													maxLength: 12,
												}}
											/>
										</Grid>
										<Grid item xs={2}>
											<NumberFormat
												id="numeroTelefono"
												value={numeroTelefono}
												label="Teléfono"
												name="numeroTelefono"
												onChange={event => this.handleForm(event)}
												customInput={TextField}
												disabled={
													(disableTelefono && disableTelefono) || false
												}
												format="## #### ####"
												fullWidth
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												id="apellidoPaterno"
												label="Apellido paterno"
												name="apellidoPaterno"
												disabled={(disableNombre && disableNombre) || false}
												onChange={event => this.handleForm(event)}
												value={apellidoPaterno}
												margin="normal"
												style={{ margin: 0 }}
												fullWidth
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												id="apellidoMaterno"
												label="Apellido materno"
												name="apellidoMaterno"
												disabled={(disableNombre && disableNombre) || false}
												onChange={event => this.handleForm(event)}
												value={apellidoMaterno}
												margin="normal"
												style={{ margin: 0 }}
												fullWidth
											/>
										</Grid>
										<Grid item xs={2}>
											<TextField
												id="nombre"
												label="Nombre"
												name="nombre"
												onChange={event => this.handleForm(event)}
												value={nombre}
												disabled={(disableNombre && disableNombre) || false}
												margin="normal"
												style={{ margin: 0 }}
												fullWidth
											/>
										</Grid>
										<Grid item xs={2}>
											<SelectField
												textFieldProps={{
													label: 'Oficina',
													InputLabelProps: {
														shrink: true,
													},
												}}
												placeholder="Oficina"
												options={oficinas}
												isClearable={false}
												name="idOficina"
												value={idOficina}
												className="react-select"
												classNamePrefix="react-select-sucursal"
												onChange={this.handleForm}
												noOptionsMessage="No existe la sucursal"
											/>
										</Grid>
									</Grid>
								</ContainerContent>
								<ContainerActions>
									<Button type="button" color="primary" onClick={this.resetForm}>
										LIMPIAR
									</Button>
									<Button
										type="submit"
										variant="contained"
										className="g-ml-8"
										color="primary"
									>
										BUSCAR
									</Button>
								</ContainerActions>
							</form>
						</div>
					</div>
				</Container>
				{resultadoBusqueda.length !== 0 && (
					<Container title="Resultados de la búsqueda">
						<ContainerContent>
							<Table
								headers={headers}
								card={false}
								options={resultadoBusqueda}
								selectedRows={this.handleSelectedRows}
								selectable
							/>
						</ContainerContent>
					</Container>
				)}
			</Fragment>
		);
	}
}

BuscarCliente.propTypes = {
	contrato: PropTypes.string,
	existeCliente: PropTypes.bool,
};
export default BuscarCliente;
