import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getHeaderRequestState, getAppBarHeightState } from 'selectors/appSelector';
import handleProgress from 'util/HandleProgress';
import moment from 'moment';
import {
	getEstadoOficinasState,
	getObtenerToggleLoadState,
	getObtenerFechaCierreState,
	getObtenerCierreManualState,
	getObtenerProcesoActivoState,
	getConfiguracionOficinasState,
	getObtenerPlanesEjecucionState,
} from 'selectors/cierreDiarioSelector';
import { CIERRE_DIARIO, setToggleLoadOficinas } from 'actions/cierreDiario.actions';
import handleOficinasStatus from './MonitorCierreComponents/MonitorCierreUtils';
import {
	getSucursales,
	iniciaCierreManual,
	iniciarCierreDiario,
	finalizarCierreAction,
	getObtenerFechaCierre,
	getObtenerPlanesEjecucion,
} from './MonitorCierreActions';
import MonitorCierreFiltro from './MonitorCierreComponents/MonitorCierreFiltro';
import MonitorDetalleOficinas from './MonitorCierreComponents/MonitorDetalleOficinas';
import MonitorListaSucursales from './MonitorCierreComponents/MonitorListaSucursales';

@connect(store => ({
	appBarHeight: getAppBarHeightState(store),
	headerRequest: getHeaderRequestState(store),
	oficinasEstado: getEstadoOficinasState(store), // Obtiene las oficinas del Global
	toggleLoadOficinas: getObtenerToggleLoadState(store),
	obtenerFechacierre: getObtenerFechaCierreState(store), // Viene de la API
	planesEjecucion: getObtenerPlanesEjecucionState(store), //Obtiene los planes de ejecución
	iniciarCierreManual: getObtenerCierreManualState(store), //Es cuando se activa un cierre manual debido a un error.
	cierreActivoIniciado: getObtenerProcesoActivoState(store), //Es la info que viene desde el API
	oficinasConfiguracion: getConfiguracionOficinasState(store),
}))
class MonitorServicios extends Component {
	divHeight = React.createRef();
	state = {
		oficinas: [],
		claveEmpresa: '',
		planEjecucion: '',
		fechaInicial: null,
		toggleLoader: false,
		enableCalendar: false,
		procesoActivo: false, //Solo es para el estado local
		oficinasConfiguracion: {},
		maxDateReport: new Date(),
		enableButtonInicioCierre: false,
		enableButtonFinalizaCierre: true,
		minDateReport: moment().subtract(280, 'days'),
	};
	formDataFilter = {};
	timer = null;
	componentDidMount = () => {
		const { dispatch, operacionesReady, headerRequest } = this.props;
		if (operacionesReady) {
			handleProgress(dispatch, {
				show: false,
				feature: CIERRE_DIARIO,
			});
		}
		this.handleValidateButtons();
	};
	handleValidateButtons = () => {
		const { claveEmpresa, procesoActivo } = this.state;
		const enableCalendar = claveEmpresa === '';
		this.setState({
			enableCalendar,
			//enableButtonInicioCierre: procesoActivo,
			//enableButtonFinalizaCierre: !procesoActivo, //|| ,
		});
	};
	componentDidUpdate = (prevProps, prevState) => {
		const {
			push,
			dispatch,
			headerRequest,
			oficinasEstado,
			planesEjecucion,
			toggleLoadOficinas,
			obtenerFechacierre,
			iniciarCierreManual,
			cierreActivoIniciado,
			oficinasConfiguracion,
			enableButtonInicioCierre,
		} = this.props;
		const { fechaInicial, procesoActivo, claveEmpresa } = this.state;
		if (prevProps.planesEjecucion !== planesEjecucion) {
			this.handleSetPlanesEjecucion(planesEjecucion);
		}
		if (prevProps.iniciarCierreManual !== iniciarCierreManual) {
			this.handleEjecutarCierreManual(iniciarCierreManual);
		}
		if (prevState.claveEmpresa !== claveEmpresa) {
			getObtenerFechaCierre(dispatch, headerRequest, claveEmpresa, push);
			getObtenerPlanesEjecucion(dispatch, headerRequest, claveEmpresa);
			this.handleValidateButtons();
		}
		if (
			prevProps.obtenerFechacierre.fechaActualCierre !== obtenerFechacierre.fechaActualCierre
		) {
			this.handleSetFechaCierreStatus(obtenerFechacierre.fechaActualCierre);
		}
		if (prevProps.oficinasEstado !== oficinasEstado) {
			this.handleSetOficinasStatus(oficinasEstado);
		}
		if (prevProps.oficinasConfiguracion !== oficinasConfiguracion) {
			this.handleSetOficinasConfiguracion(oficinasConfiguracion);
		}
		if (prevState.fechaInicial !== fechaInicial) {
			this.handleGetSucursales();
		}
		if (prevProps.cierreActivoIniciado !== cierreActivoIniciado) {
			//Este cambio es cuando la API detecta que cierreActivo = true
			if (cierreActivoIniciado) {
				//this.handleButtonState(cierreActivoIniciado);
				this.handleIniciaCierre();
			} else {
				this.handleCancelCierre();
			}
		}
		if (prevProps.toggleLoadOficinas !== toggleLoadOficinas) {
			this.handleToggleLoadOficinas(toggleLoadOficinas);
		}
	};
	handleSetPlanesEjecucion = planDeEjecucion => {
		const planEjecucion = planDeEjecucion.find(i => i.codigo.includes('TODO')).codigo;
		this.setState({ planEjecucion });
	};
	handleButtonState = cierreActivoIniciado => {
		this.setState({
			enableButtonInicioCierre: !cierreActivoIniciado,
			enableButtonFinalizaCierre: !cierreActivoIniciado,
		});
	};
	componentWillUnmount = () => {
		this.handleCancelCierre();
	};
	handleEjecutarCierreManual = dataCierreManual => {
		const { fechaInicial, claveEmpresa } = this.state;
		const { dispatch, headerRequest } = this.props;
		iniciaCierreManual(dispatch, headerRequest, fechaInicial, claveEmpresa, dataCierreManual);
	};
	handleCancelCierre = () => {
		this.setState({ procesoActivo: false });
		this.stopTimer();
	};
	handleToggleLoadOficinas = toggleLoadOficinas => {
		this.setState({ toggleLoader: toggleLoadOficinas });
	};
	handleGetSucursales = () => {
		const { dispatch, headerRequest, push, cierreActivoIniciado } = this.props;
		const { fechaInicial, claveEmpresa } = this.state;
		dispatch(setToggleLoadOficinas(true));
		getSucursales(
			dispatch,
			headerRequest,
			claveEmpresa,
			fechaInicial,
			push,
			cierreActivoIniciado
		);
	};
	handleSetFechaCierreStatus = fechaInicial => {
		this.setState({ fechaInicial, maxDateReport: fechaInicial });
	};
	handleSetOficinasStatus = oficinasReady => {
		const { dispatch } = this.props;
		const oficinas = handleOficinasStatus(oficinasReady, dispatch);
		this.setState({ oficinas });
	};
	handleSetOficinasConfiguracion = oficinasConfiguracion => {
		this.setState({ oficinasConfiguracion });
	};
	handleIniciaCierre = () => {
		this.setState({
			procesoActivo: true,
		});
		this.startTimer();
	};
	startTimer = () => {
		const { fechaInicial } = this.state;
		const { dispatch, headerRequest, push, obtenerFechacierre } = this.props;
		const { refreshPantalla } = obtenerFechacierre;
		this.timer = setInterval(
			() => this.handleGetSucursales(dispatch, headerRequest, fechaInicial, push),
			refreshPantalla * 1000
		);
	};
	stopTimer = () => {
		clearInterval(this.timer);
		this.timer = null;
	};
	handleChangeFilter = ({ target }) => {
		const { cierreActivoIniciado } = this.props;
		const { name, value } = target;
		this.formDataFilter = {
			...this.formDataFilter,
			[target.name]: target.value,
		};
		if (name === 'fechaInicial') {
			this.formDataFilter.fechaInicial = moment(value).format('YYYY-MM-DD');
		}
		const evaluateButtonFilter =
			Object.values(this.formDataFilter).filter(i => i !== '').length === 1;
		/* We must to evaluate this */
		/* const enableButtonInicioCierre = evaluateButtonFilter || cierreActivoIniciado; */
		const enableButtonInicioCierre = true || cierreActivoIniciado;
		this.setState({ ...this.formDataFilter, enableButtonInicioCierre });
	};
	handleIniciaCierreDiario = () => {
		const { dispatch, headerRequest } = this.props;
		const { fechaInicial, claveEmpresa, planEjecucion } = this.state;
		iniciarCierreDiario(dispatch, headerRequest, fechaInicial, claveEmpresa, planEjecucion);
		//dispatch(setProcesoActivo(true));
		this.setState({ procesoActivo: true });
	};
	handleFinalizarCierre = () => {
		const { dispatch, headerRequest } = this.props;
		const { fechaCierre, claveEmpresa, fechaInicial } = this.state;
		finalizarCierreAction(dispatch, headerRequest, fechaCierre, claveEmpresa, fechaInicial);
	};
	render() {
		const { operacionesReady, cierreActivo, obtenerFechacierre } = this.props;
		const { refreshPantalla } = obtenerFechacierre;
		const {
			oficinas,
			totalHeight,
			claveEmpresa,
			toggleLoader,
			fechaInicial,
			procesoActivo,
			maxDateReport,
			minDateReport,
			planEjecucion,
			enableCalendar,
			oficinasConfiguracion,
			enableButtonInicioCierre,
			enableButtonFinalizaCierre,
		} = this.state;
		return (
			<Fragment>
				<Fragment>
					<div className="row around-xs">
						<div className="col-xs-12">
							<MonitorCierreFiltro
								{...{
									...oficinasConfiguracion,
									fechaInicial,
									claveEmpresa,
									minDateReport,
									planEjecucion,
									maxDateReport,
									procesoActivo,
									enableCalendar,
									obtenerFechacierre,
									enableButtonInicioCierre,
									enableButtonFinalizaCierre,
								}}
								handleIniciaCierre={this.handleIniciaCierreDiario}
								changeFilter={this.handleChangeFilter}
								finalizarCierre={this.handleFinalizarCierre}
							/>
						</div>
					</div>
				</Fragment>
				<Fragment>
					<div className="row around-xs">
						<div className="col-xs-12">
							<MonitorDetalleOficinas
								{...{
									...oficinasConfiguracion,
									toggleLoader,
									cierreActivo,
									refreshPantalla,
								}}
							/>
						</div>
					</div>
				</Fragment>
				<Fragment>
					<div className="row around-xs">
						<div className="col-xs-12">
							<MonitorListaSucursales
								enableTable={enableButtonInicioCierre}
								listaOficinas={oficinas}
								totalHeight={totalHeight}
								toggleLoader={toggleLoader}
							/>
						</div>
					</div>
				</Fragment>
			</Fragment>
		);
	}
}

export default MonitorServicios;
