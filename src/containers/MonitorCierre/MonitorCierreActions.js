import { CIERRE_DIARIO, CIERRE_MANUAL, GET_PLANES_EJECUCION } from 'actions/cierreDiario.actions';
import {
	MONITOR_CIERRE,
	FINALIZAR_CIERRE_DIARIO,
	OBTENER_PLANES_EJECUCION,
	EJECUTAR_CIERRE_UNITARIO,
	MONITOR_CIERRE_OBTENER_FECHA,
} from '../../constants/Endpoints';
import {
	getSucursalesApi,
	finalizarCierreApi,
	iniciarCierreDiarioApi,
	getObtenerFechaCierreApi,
	getObtenerPlanesEjecucionApi,
} from './MonitorCierreApi';

export const getSucursales = (
	dispatch,
	headerRequest,
	claveEmpresa,
	fechaActualCierre,
	push,
	cierreActivo
) => {
	const data = {
		headerRequest: {
			...headerRequest,
		},
		fechaCierre: {
			idEmpresa: claveEmpresa,
			fechaActualCierre,
		},
	};
	const query = {
		data,
		headers: false,
		feature: CIERRE_DIARIO,
		endpoint: MONITOR_CIERRE,
		notification: false,
	};
	getSucursalesApi(dispatch, query, push, cierreActivo);
};

export const getObtenerFechaCierre = (dispatch, headerRequest, claveEmpresa, push) => {
	const data = {
		headerRequest: {
			...headerRequest,
		},
		fechaCierre: {
			idEmpresa: claveEmpresa,
			idOficina: headerRequest.idOficina,
		},
	};

	const query = {
		data,
		headers: false,
		feature: CIERRE_DIARIO,
		endpoint: MONITOR_CIERRE_OBTENER_FECHA,
		notification: false,
	};

	getObtenerFechaCierreApi(dispatch, query, push);
};

export const getObtenerPlanesEjecucion = (dispatch, headerRequest, claveEmpresa) => {
	const data = {
		headerRequest: {
			...headerRequest,
		},
		peticionCierreDiario: {
			idEmpresa: claveEmpresa,
		},
	};

	const query = {
		data,
		headers: false,
		feature: GET_PLANES_EJECUCION,
		endpoint: OBTENER_PLANES_EJECUCION,
		notification: false,
	};

	getObtenerPlanesEjecucionApi(dispatch, query);
};

export const iniciarCierreDiario = (
	dispatch,
	headerRequest,
	fechaActualCierre,
	claveEmpresa,
	codigoPlanEjecucion
) => {
	const data = {
		headerRequest: {
			fechaOperacion: headerRequest.fechaOperacion,
			claveEmpresa,
			idOficina: headerRequest.idOficina,
		},
		peticionCierreDiario: {
			codigoPlanEjecucion,
			codigoProceso: 'COBR',
			fechaCierre: fechaActualCierre,
		},
	};
	const query = {
		data,
		headers: false,
		feature: CIERRE_DIARIO,
		endpoint: EJECUTAR_CIERRE_UNITARIO,
		notification: false,
	};
	iniciarCierreDiarioApi(dispatch, query);
};

export const iniciaCierreManual = (
	dispatch,
	headerRequest,
	fechaCierre,
	claveEmpresa,
	dataCierreManual
) => {
	const { codigoProceso, idOficina } = dataCierreManual;
	const data = {
		headerRequest: {
			fechaOperacion: headerRequest.fechaOperacion,
			claveEmpresa,
			idOficina,
		},
		peticionCierreDiario: {
			codigoPlanEjecucion: 'MANUFI',
			codigoProceso,
			fechaCierre,
		},
	};

	const query = {
		data,
		headers: false,
		feature: CIERRE_MANUAL,
		endpoint: EJECUTAR_CIERRE_UNITARIO,
		notification: false,
	};
	iniciarCierreDiarioApi(dispatch, query);
};

export const finalizarCierreAction = (
	dispatch,
	headerRequest,
	fechaCierre,
	claveEmpresa,
	fechaInicial
) => {
	const data = {
		headerRequest: {
			fechaOperacion: headerRequest.fechaOperacion,
			claveEmpresa,
		},
		peticionCierreDiario: {
			fechaCierre: fechaInicial,
			idEmpresa: claveEmpresa,
		},
	};

	const query = {
		data,
		headers: false,
		feature: CIERRE_DIARIO,
		endpoint: FINALIZAR_CIERRE_DIARIO,
		notification: false,
	};
	finalizarCierreApi(dispatch, query);
};
