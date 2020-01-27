import NOTIFICATION_MESSAGES from 'constants/notificationMessages';
import { hideNotification } from 'actions/notification.actions';
import {
	GET_SUCURSALES,
	setProcesoActivo,
	GET_CIERRE_ACTIVO,
	setEstadoOficinas,
	setPlanesEjecucion,
	setFechaActualCierre,
	GET_PLANES_EJECUCION,
	setToggleLoadOficinas,
	setConfiguracionOficinas,
} from 'actions/cierreDiario.actions';
import handleNotification from 'util/HandleNotification';
import handleProgress from 'util/HandleProgress';
import { fetchApi } from 'api/fetchApi';
import handleSnackbar from 'util/HandleSnackbar';
import { getDateFormat } from 'util/Formatters';

const handleCancel = (dispatch, feature) => {
	dispatch(hideNotification(feature));
};

const handleMonitorCierre = (dispatch, feature, push) => {
	handleCancel(dispatch, feature);
	push('/operaciones/monitor-de-cierre');
};

export const getObtenerFechaCierreApi = async (dispatch, query, push) => {
	handleProgress(dispatch, {
		feature: GET_SUCURSALES,
	});
	try {
		const response = await dispatch(fetchApi(query));
		if (response.code === 200) {
			handleProgress(dispatch, {
				show: false,
				feature: GET_SUCURSALES,
			});
			const { fechaActualCierre, idEmpresa, refreshPantalla } = response;
			const formatedDate = getDateFormat(fechaActualCierre, 'YYYY-MM-DD');
			const fechaCierre = { fechaActualCierre: formatedDate, idEmpresa, refreshPantalla };
			dispatch(setFechaActualCierre(fechaCierre));
		}
		if (response.code !== 200) {
			const type = response.code === 409 && 'error';
			handleProgress(dispatch, {
				show: false,
				feature: GET_SUCURSALES,
			});
			handleNotification(dispatch, {
				type,
				content: response.mensaje,
				children: response.uid && `UID: ${response.uid}`,
				okButtonTitle: 'Cerrar',
				onOk: () => handleCancel(dispatch, GET_SUCURSALES),
				feature: GET_SUCURSALES,
				autoFocus: true,
			});
		}
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: GET_SUCURSALES,
		});
		handleNotification(dispatch, {
			type: 'error',
			okButtonTitle: 'Cerrar',
			content: NOTIFICATION_MESSAGES.errorOperation,
			children: 'Error de servidor.',
			onOk: () => handleCancel(dispatch, GET_SUCURSALES),
			feature: GET_SUCURSALES,
			autoFocus: true,
		});
		throw new Error(error);
	}
};

export const getObtenerPlanesEjecucionApi = async (dispatch, query) => {
	try {
		const response = await dispatch(fetchApi(query));
		if (response.code === 200) {
			const { planEjecucion } = response;
			dispatch(setPlanesEjecucion(planEjecucion));
		}
		if (response.code !== 200) {
			const type = response.code === 409 && 'error';
			handleProgress(dispatch, {
				show: false,
				feature: GET_PLANES_EJECUCION,
			});
			handleNotification(dispatch, {
				type,
				content: response.mensaje,
				children: response.uid && `UID: ${response.uid}`,
				okButtonTitle: 'Cerrar',
				onOk: () => handleMonitorCierre(dispatch, GET_PLANES_EJECUCION),
				feature: GET_PLANES_EJECUCION,
				autoFocus: true,
			});
		}
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: GET_PLANES_EJECUCION,
		});
		handleNotification(dispatch, {
			type: 'error',
			okButtonTitle: 'Cerrar',
			content: NOTIFICATION_MESSAGES.errorOperation,
			children: 'Error de servidor.',
			onOk: () => handleCancel(dispatch, GET_PLANES_EJECUCION),
			feature: GET_PLANES_EJECUCION,
			autoFocus: true,
		});
		throw new Error(error);
	}
};

export const getSucursalesApi = async (dispatch, query, push, cierreActivo = false) => {
	try {
		const response = await dispatch(fetchApi(query));
		if (response.code === 200) {
			const { estadoOficinas = [], ...configuracion } = response;
			dispatch(setConfiguracionOficinas(configuracion));
			dispatch(setEstadoOficinas(estadoOficinas));
			dispatch(setToggleLoadOficinas(false));
			dispatch(setProcesoActivo(configuracion.cierreActivo));
			if (!cierreActivo) {
				handleSnackbar(dispatch, {
					message: NOTIFICATION_MESSAGES.successOfficeCierreDiario,
					feature: GET_SUCURSALES,
				});
			}
		}
		if (response.code !== 200) {
			const type = response.code === 409 && 'error';
			handleProgress(dispatch, {
				show: false,
				feature: GET_SUCURSALES,
			});
			handleNotification(dispatch, {
				type,
				content: response.mensaje,
				children: response.uid && `UID: ${response.uid}`,
				okButtonTitle: 'Cerrar',
				onOk: () => handleMonitorCierre(dispatch, GET_SUCURSALES, push),
				feature: GET_SUCURSALES,
				autoFocus: true,
			});
		}
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: GET_SUCURSALES,
		});
		handleNotification(dispatch, {
			type: 'error',
			okButtonTitle: 'Cerrar',
			content: NOTIFICATION_MESSAGES.errorOperation,
			children: 'Error de servidor.',
			onOk: () => handleCancel(dispatch, GET_SUCURSALES),
			feature: GET_SUCURSALES,
			autoFocus: true,
		});
		throw new Error(error);
	}
};

export const iniciarCierreDiarioApi = async (dispatch, query) => {
	try {
		const response = await dispatch(fetchApi(query));
		if (response.code === 200) {
			dispatch(setProcesoActivo(true));
			const {
				data: {
					peticionCierreDiario: { codigoPlanEjecucion },
				},
			} = query;
			const mensajeCierreTipo = codigoPlanEjecucion
				? NOTIFICATION_MESSAGES.startCierre
				: NOTIFICATION_MESSAGES.startCierreManual;

			handleSnackbar(dispatch, {
				message: mensajeCierreTipo,
				feature: GET_CIERRE_ACTIVO,
			});
		}
		if (response.code !== 200) {
			const type = response.code === 409 && 'error';
			handleNotification(dispatch, {
				type,
				content: response.mensaje,
				children: response.uid && `UID: ${response.uid}`,
				okButtonTitle: 'Cerrar',
				onOk: () => iniciarCierreDiarioApi(dispatch, query),
				feature: GET_SUCURSALES,
				autoFocus: true,
			});
		}
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: GET_SUCURSALES,
		});
		handleNotification(dispatch, {
			type: 'error',
			okButtonTitle: 'Cerrar',
			content: NOTIFICATION_MESSAGES.errorOperation,
			children: 'Error de servidor.',
			onOk: () => handleCancel(dispatch, GET_SUCURSALES),
			feature: GET_SUCURSALES,
			autoFocus: true,
		});
		throw new Error(error);
	}
};

export const finalizarCierreApi = async (dispatch, query) => {
	try {
		const response = await dispatch(fetchApi(query));
		if (response.code === 200) {
			dispatch(setProcesoActivo(false));
			handleSnackbar(dispatch, {
				message: NOTIFICATION_MESSAGES.successFinalizarCierre,
				feature: GET_CIERRE_ACTIVO,
			});
		}
		if (response.code !== 200) {
			const type = response.code === 409 && 'error';
			handleNotification(dispatch, {
				type,
				content: response.mensaje,
				children: response.uid && `UID: ${response.uid}`,
				okButtonTitle: 'Cerrar',
				onOk: () => finalizarCierreApi(dispatch, query),
				feature: GET_SUCURSALES,
				autoFocus: true,
			});
		}
	} catch (error) {
		handleProgress(dispatch, {
			show: false,
			feature: GET_SUCURSALES,
		});
		handleNotification(dispatch, {
			type: 'error',
			okButtonTitle: 'Cerrar',
			content: NOTIFICATION_MESSAGES.errorOperation,
			children: 'Error de servidor.',
			onOk: () => handleCancel(dispatch, GET_SUCURSALES),
			feature: GET_SUCURSALES,
			autoFocus: true,
		});
		throw new Error(error);
	}
};
