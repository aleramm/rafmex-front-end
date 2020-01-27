/* eslint-disable no-use-before-define */
import {
	fetchUsuarioActivo,
	fetchMapeoEmpresas,
	fetchUsuarioFacultades,
	fetchApi,
} from 'api/fetchApi';
import {
	CONSULTAR_USUARIO_ACTIVO,
	CONSULTAR_MAPEO_EMPRESAS,
	CONSULTAR_USUARIO_FACULTADES,
	CONSULTA_OFICINAS_POST,
} from 'constants/Endpoints';
import {
	OPERACIONES_INIT,
	GET_OFFICES,
	getParamsUrl,
	setHeaderRequest,
	setOperacionesReady,
	setUserProfile,
	setOffice,
	setOffices,
} from 'actions/app.actions';
import { createBrowserHistory } from 'history';
import handleProgress from 'util/HandleProgress';
import handleNotification from 'util/HandleNotification';
import { hideNotification } from 'actions/notification.actions';
import {
	getParamsObject,
	parseSucursal,
	parseSucursales,
	parseExitstMenu,
	handleCompareFaculties,
	hasFacultyOperaciones,
} from './AppUtil';

const handleCancel = dispatch => {
	dispatch(hideNotification(OPERACIONES_INIT));
};
const handleResetInit = (dispatch, push, feature, profile, usuarioActivo) => {
	handleCancel(dispatch, feature);
	initConfiguration(dispatch, push, profile, usuarioActivo);
};
const handleExitView = (dispatch, push, feature) => {
	handleCancel(dispatch, feature);
	push('/');
};
const handleErrorOperaciones = (dispatch, push, feature, profile, usuarioActivo) => {
	handleProgress(dispatch, {
		show: false,
		feature: OPERACIONES_INIT,
	});
	handleNotification(dispatch, {
		type: 'error',
		content: 'Hubo un error al cargar los servicios de monitor cierre.',
		children: '¿Qué desea hacer?',
		okButtonTitle: 'Reintentar',
		onOk: () => handleResetInit(dispatch, push, feature, profile, usuarioActivo),
		onCancel: () => handleExitView(dispatch, push, feature),
		feature,
		autoFocus: true,
	});
};
const handleErrorFaculties = (dispatch, complementaryText, push, profile, noPersona, pathname) => {
	handleProgress(dispatch, {
		show: false,
		feature: '[USUARIO FACULTADES]',
	});
	handleNotification(dispatch, {
		type: 'error',
		content: 'Hubo un error con el usuario que ha iniciado sesión',
		children: `El usuario no tiene asignada la facultad para operar "${complementaryText}". Consulte al administrador de sistemas e inicie sesión nuevamente.`,
		okButtonTitle: 'Cerrar',
		onOk: () => handleExitView(dispatch, push, '[USUARIO FACULTADES]'),
		feature: '[USUARIO FACULTADES]',
		autoFocus: true,
	});
};
const requestAppBar = async () => {
	const appBar = document.getElementById('body-page');
	if (appBar !== null) {
		return appBar.previousSibling.clientHeight;
	}
	return 0;
};
const requestOffices = async (dispatch, push, profile, usuarioActivo) => {
	const { fechaOperacion, claveEmpresa, idOperador, idOficina } = profile;
	const sucursalesRequest = {
		headerRequest: {
			fechaOperacion,
			idOficina,
			idOperador,
			claveEmpresa,
		},
	};
	const consultaSucursalesQuery = {
		data: sucursalesRequest,
		feature: GET_OFFICES,
		endpoint: CONSULTA_OFICINAS_POST,
		message: 'Iniciando...',
		notification: false,
		push,
	};
	const response = await dispatch(fetchApi(consultaSucursalesQuery));
	if (response.code === 200) {
		return response;
	}
	if (response.code !== 200) {
		//handleErrorOperaciones(dispatch, push, OPERACIONES_INIT, profile, usuarioActivo);
	}
};
const requestOffice = async (dispatch, { claveSucursal, descripcionSucursal }) => {
	return parseSucursal(claveSucursal, descripcionSucursal);
};
const userProfileRequest = (profile, usuarioActivo) => {
	return {
		nombreCajero: `${usuarioActivo.nombre} ${usuarioActivo.apellidoPaterno} ${usuarioActivo.apellidoMaterno}`,
		claveUsuario: usuarioActivo.claveUsuario,
		empresa: usuarioActivo.descripcionEmpresa,
		sucursal: usuarioActivo.descripcionSucursal,
		idOperador: profile.idOperador,
		noPersona: usuarioActivo.noPersona,
	};
};
const initConfiguration = async (dispatch, push, profile, usuarioActivo, isInit = false) => {
	if (!isInit) {
		handleProgress(dispatch, {
			feature: OPERACIONES_INIT,
		});
	}
	const dataUserProfileRequest = await userProfileRequest(profile, usuarioActivo);
	const getDataOffice = await requestOffice(dispatch, usuarioActivo);
	//const getDataOffices = await requestOffices(dispatch, push, profile, usuarioActivo);
	const getAppBar = await requestAppBar();

	try {
		await dispatch(setHeaderRequest(profile));
		await dispatch(setUserProfile(dataUserProfileRequest));
		await dispatch(setOffice(getDataOffice));
		await dispatch(setOffices(parseSucursales(getDataOffices.lstOficinas)));
		await dispatch(setOperacionesReady(true));
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: OPERACIONES_INIT,
		});
		//handleErrorOperaciones(dispatch, push, OPERACIONES_INIT, profile, usuarioActivo);
	}
};
const handleExistsMenu = path => {
	const pathname = path.substring(0).split('/')[2];
	return parseExitstMenu(pathname);
};
const handleBusinessMapping = async (dispatch, claveEmpresa) => {
	const dataMapeoEmpresas = {
		empresaSirh: String(claveEmpresa),
	};
	const queryMapeoEmpresas = {
		data: dataMapeoEmpresas,
		feature: '[MAPEO EMPRESAS]',
		endpoint: CONSULTAR_MAPEO_EMPRESAS,
	};
	return dispatch(fetchMapeoEmpresas(queryMapeoEmpresas));
};
const handleUserFaculties = async (dispatch, push, profile, noPersona, pathname) => {
	let claveEmpresa = '';
	const dataUsuarioActivo = {
		noPersona,
	};
	const queryUsuarioActivo = {
		data: dataUsuarioActivo,
		feature: '[USUARIO ACTIVO]',
		endpoint: CONSULTAR_USUARIO_ACTIVO,
	};
	const usuarioActivo = await dispatch(fetchUsuarioActivo(queryUsuarioActivo));
	claveEmpresa = +usuarioActivo.claveEmpresa;
	if (claveEmpresa === 19) {
		claveEmpresa = await handleBusinessMapping(dispatch, claveEmpresa);
	}
	const dataUsuarioFacultades = {
		idPersona: usuarioActivo.noPersona,
		claveEmpresa,
		claveUsuario: usuarioActivo.usuario,
	};
	const queryUsuarioFacultades = {
		data: dataUsuarioFacultades,
		feature: '[USUARIO FACULTADES]',
		endpoint: CONSULTAR_USUARIO_FACULTADES,
		notification: false,
	};
	const usuarioFacultades = await dispatch(fetchUsuarioFacultades(queryUsuarioFacultades));
	const { codigoFacultad, secondaryText } = await handleExistsMenu(pathname);

	if (hasFacultyOperaciones(usuarioFacultades).length === 0) {
		handleProgress(dispatch, {
			show: false,
			feature: 'USUARIO FACULTADES',
		});
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error con el usuario que ha iniciado sesión',
			children:
				'El usuario no tiene la facultad principal de Operaciones. Consulte al administrador de sistemas e inicie sesión nuevamente.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleExitView(dispatch, push, 'USUARIO FACULTADES'),
			feature: 'USUARIO FACULTADES',
			autoFocus: true,
		});
		// eslint-disable-next-line no-console
		console.error('Usuario no tiene la facultad principal de Operaciones');
		return;
	}
	if (!codigoFacultad) {
		handleErrorFaculties(dispatch, secondaryText, push, profile, noPersona, pathname);
		return;
	}
	const existsFaculties = handleCompareFaculties(codigoFacultad, usuarioFacultades);
	if (existsFaculties.length === 0) {
		handleErrorFaculties(dispatch, secondaryText, push, profile, noPersona, pathname);
		return;
	}
	initConfiguration(dispatch, push, profile, usuarioActivo);
};
const initOperaciones = async (push, dispatch, operacionesReady = false) => {
	const { location } = document;
	const history = createBrowserHistory();
	history.push(
		`?claveEmpresa=${process.env.EMPRESA}&cveUsuario=${process.env.USUARIO}&oficina=${process.env.OFICINA}`
	);
	if (!location.search) {
		handleProgress(dispatch, {
			show: false,
			feature: OPERACIONES_INIT,
		});
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error al iniciar Operaciones.',
			children:
				'El módulo de Operaciones no tiene los parámetros necesarios iniciar. Consulte al administrador de sistemas e inicie sesión nuevamente.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleExitView(dispatch, push, OPERACIONES_INIT),
			feature: OPERACIONES_INIT,
			autoFocus: true,
		});
		return;
	}

	if (operacionesReady) return;
	dispatch(getParamsUrl());
	const parsedUrl = new URL(location);
	const noPersona = parsedUrl.searchParams.get('cveUsuario');
	if (!noPersona) {
		handleProgress(dispatch, {
			show: false,
			feature: OPERACIONES_INIT,
		});
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error al iniciar Operaciones.',
			children:
				'El módulo de Operaciones no tiene asignado el parametrode persona, necesario para iniciar. Consulte al administrador de sistemas e inicie sesión nuevamente.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleExitView(dispatch, push, OPERACIONES_INIT),
			feature: OPERACIONES_INIT,
			autoFocus: true,
		});
		return;
	}
	const profile = getParamsObject(location);
	handleUserFaculties(dispatch, push, profile, noPersona, location.pathname);
};

export default initOperaciones;
