import galileoConfig from 'constants/galileoConfig';
import { apiRequest, apiSuccess, apiError } from 'actions/api.actions';
import { hideNotification } from 'actions/notification.actions';
import { uploadFile } from 'actions/file.actions';
import handleProgress from 'util/HandleProgress';
import handleNotification from 'util/HandleNotification';
import handleResetForm from 'util/HandleResetForm';
import handleSnackbar from 'util/HandleSnackbar';

const handleCancel = (dispatch, feature) => {
	dispatch(hideNotification(feature));
};
const handleExitView = (dispatch, push, feature) => {
	handleCancel(dispatch, feature);
	push('/');
};

const googleEndpoint = endpoint => {
	return `${endpoint}?key=${galileoConfig.API_KEY_MSK}`;
};

const handleEndpoint = endpoint => {
	const [, baseUrlName] = endpoint.split('/');
	return `http://${baseUrlName}.endpoints.${galileoConfig.BASE_URL_MSK}${endpoint}?key=${galileoConfig.API_KEY_MSK}`;
};

export const fetchUsuarioFacultades = ({
	ip,
	port,
	data = {},
	method = 'POST',
	params,
	feature,
	endpoint,
	notification = true,
} = {}) => async dispatch => {
	const url = `http://${ip || galileoConfig.LOGIN_URL}:${port ||
		galileoConfig.LOGIN_PORT}${endpoint}`;

	handleProgress(dispatch, {
		feature,
		message: 'Consultando facultades del usuario activo, espere un momento...',
	});
	dispatch(apiRequest(feature));
	try {
		const instance = await fetch(url, {
			mode: 'cors',
			method,
			body: JSON.stringify(data),
			params,
			headers: { 'Content-Type': 'application/json' },
		});

		dispatch(apiSuccess(feature));
		if (instance.ok) {
			const response = await instance.json();
			const { payload } = response;
			if (payload.length === 0) {
				handleProgress(dispatch, {
					show: false,
					feature,
				});
				handleNotification(dispatch, {
					type: 'error',
					content: 'Hubo un error al consultar las facultades del usuario activo',
					children: 'El usuario no tiene asignadas facultades para operar la caja.',
					okButtonTitle: 'Cerrar',
					onOk: () => handleCancel(dispatch, feature),
					feature,
					autoFocus: true,
				});
				return;
			}

			// eslint-disable-next-line consistent-return
			return await payload;
		}
	} catch (error) {
		dispatch(apiError(feature));
		if (notification) {
			handleProgress(dispatch, {
				show: false,
				feature,
			});
		}
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error al consultar las facultades del usuario activo',
			children: 'Inicia sesión nuevamente.',
			feature,
			onOk: () => handleCancel(dispatch, feature),
			okButtonTitle: 'Cerrar',
			autoFocus: true,
		});

		throw new Error(`😱 ${error}`);
	}
};
export const fetchMapeoEmpresas = ({
	ip,
	port,
	data = {},
	method = 'POST',
	params,
	feature,
	endpoint,
	notification = true,
} = {}) => async dispatch => {
	const url = `http://${ip || galileoConfig.LOGIN_URL}:${port ||
		galileoConfig.LOGIN_PORT}${endpoint}`;

	handleProgress(dispatch, {
		show: true,
		feature: '[MAPEO EMPRESAS]',
		message: 'Consultando empresa del usuario, espere un momento...',
	});
	dispatch(apiRequest('[MAPEO EMPRESAS]'));
	try {
		const instance = await fetch(url, {
			mode: 'cors',
			method,
			body: JSON.stringify(data),
			params,
			headers: { 'Content-Type': 'application/json' },
		});
		const response = await instance.json();
		dispatch(apiSuccess(feature));
		if (instance.ok) {
			const { payload } = response;
			if (response.length === 0) {
				handleProgress(dispatch, {
					show: false,
					feature: '[MAPEO EMPRESAS]',
				});
				handleNotification(dispatch, {
					type: 'error',
					content: 'Hubo un error al consultar la empresa',
					children: 'Inicia sesión nuevamente.',
					okButtonTitle: 'Cerrar',
					onOk: () => handleCancel(dispatch),
					feature: '[MAPEO EMPRESAS]',
					autoFocus: true,
				});
				return;
			}
			const [empresa] = payload;
			return await empresa.empresaOperativa;
		}
	} catch (error) {
		dispatch(apiError(feature));
		if (notification) {
			handleProgress(dispatch, {
				show: false,
				feature: '[MAPEO EMPRESAS]',
			});
		}
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error al consultar la empresa',
			children: 'Inicia sesión nuevamente.',
			feature: '[MAPEO EMPRESAS]',
			onOk: () => handleCancel(dispatch, '[MAPEO EMPRESAS]'),
			okButtonTitle: 'Cerrar',
			autoFocus: true,
		});
		throw new Error(`😱 ${error}`);
	}
};
export const fetchUsuarioActivo = ({
	ip,
	port,
	data = {},
	method = 'POST',
	params,
	feature,
	endpoint,
	notification = true,
} = {}) => async dispatch => {
	const url = `http://${ip || galileoConfig.LOGIN_URL}:${port ||
		galileoConfig.LOGIN_PORT}${endpoint}`;

	handleProgress(dispatch, {
		feature,
		message: 'Consultando status del usuario, espere un momento...',
	});
	dispatch(apiRequest(feature));
	try {
		const instance = await fetch(url, {
			mode: 'cors',
			method,
			body: JSON.stringify(data),
			params,
			headers: { 'Content-Type': 'application/json' },
		});
		dispatch(apiSuccess(feature));
		if (instance.ok) {
			const response = await instance.json();
			const [payload = []] = response.payload;
			if (response.payload.length === 0) {
				handleProgress(dispatch, {
					show: false,
					feature,
				});
				handleNotification(dispatch, {
					type: 'error',
					content: 'Hubo un error con el usuario que ha iniciado sesión',
					children: 'El usuario no se encuentra activo. Inicia sesión nuevamente.',
					okButtonTitle: 'Cerrar',
					onOk: () => handleCancel(dispatch),
					feature,
					autoFocus: true,
				});
				return;
			}
			// eslint-disable-next-line consistent-return
			return await payload;
		}
	} catch (error) {
		dispatch(apiError(feature));
		if (notification) {
			handleProgress(dispatch, {
				show: false,
				feature,
			});
		}
		handleNotification(dispatch, {
			type: 'error',
			content: 'Hubo un error con el usuario que ha iniciado sesión',
			children: 'Inicia sesión nuevamente.',
			feature,
			onOk: () => handleCancel(dispatch, feature),
			okButtonTitle: 'Cerrar',
			autoFocus: true,
		});
		throw new Error(`😱 ${error}`);
	}
};

export const fetchApi = ({
	ip,
	port,
	data = {},
	method = 'POST',
	params,
	feature,
	endpoint,
	notification = true,
	headers = true,
	push,
} = {}) => async dispatch => {
	let url = '';
	let newHeaders = '';

	if (endpoint.indexOf('msk/') > -1) {
		url = handleEndpoint(endpoint);
		if (endpoint.includes('cierre-diario')) {
			url = googleEndpoint(endpoint);
		}
	} else {
		url = `http://${ip || galileoConfig.URL}:${port || galileoConfig.PORT}${endpoint}`;
	}
	if (headers) {
		newHeaders = { 'Content-Type': 'application/json' };
	}
	if (!headers) {
		newHeaders = {};
	}

	if (notification) {
		handleProgress(dispatch, {
			show: true,
			feature,
		});
	}
	dispatch(apiRequest(feature));
	try {
		const instance = await fetch(url, {
			mode: 'cors',
			method,
			body: JSON.stringify(data),
			params,
			headers: newHeaders,
		});

		dispatch(apiSuccess(feature));
		if (instance.ok) {
			const response = await instance.json();
			let { payload } = response;
			if (notification) {
				if (response.headerResponse.code === 204) {
					handleNotification(dispatch, {
						content: response.headerResponse.mensaje,
						okButtonTitle: 'Cerrar',
						onOk: () => handleCancel(dispatch, feature),
						feature,
						autoFocus: true,
					});
				}
				if (response.headerResponse.code === 409) {
					handleNotification(dispatch, {
						type: 'error',
						content: response.headerResponse.mensaje,
						children:
							response.headerResponse.uid && `UID: ${response.headerResponse.uid}`,
						okButtonTitle: 'Cerrar',
						onOk: () => handleCancel(dispatch, feature),
						feature,
						autoFocus: true,
					});
				}
				if (response.headerResponse.code === 200) {
					handleResetForm(dispatch, feature);
					handleSnackbar(dispatch, {
						type: 'success',
						autoHideDuration: 3000,
						message: '¡Operación ejecutada correctamente!',
						feature,
					});
				}

				handleProgress(dispatch, {
					show: false,
					feature,
				});
			}
			if (!notification) {
				payload = {
					...response.headerResponse,
					...response.payload,
				};
			}
			return await payload;
		}
	} catch (error) {
		dispatch(apiError(feature));
		handleProgress(dispatch, {
			show: false,
			feature,
		});
		if (push) {
			handleNotification(dispatch, {
				type: 'error',
				content: 'Ocurrió un error al procesar la solicitud',
				children: 'Error de servidor.',
				okButtonTitle: 'Cerrar',
				onOk: () => handleExitView(dispatch, push, feature),
				feature,
				autoFocus: true,
			});
		}
		if (!push) {
			handleNotification(dispatch, {
				type: 'error',
				content: 'Ocurrió un error al procesar la solicitud',
				children: 'Error de servidor.',
				feature,
				onOk: () => handleCancel(dispatch, feature),
				okButtonTitle: 'Cerrar',
				autoFocus: true,
			});
		}

		throw new Error(`😱 ${error}`);
	}
};

export const fetchFile = ({
	ip,
	port,
	data,
	method = 'POST',
	params,
	feature,
	endpoint,
	notification = true,
} = {}) => async dispatch => {
	const url = `http://${ip || galileoConfig.URL}:${port || galileoConfig.PORT}${endpoint}`;

	dispatch(uploadFile(feature));
	try {
		const instance = await fetch(url, {
			mode: 'cors',
			method,
			body: JSON.stringify(data),
			params,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	} catch (error) {
		throw new Error(`😱 ${error}`);
	}
};
