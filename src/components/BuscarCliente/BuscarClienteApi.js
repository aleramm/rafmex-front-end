import NOTIFICATION_MESSAGES from 'constants/notificationMessages';
import { fetchApi } from 'api/fetchApi';
import {
	BUSCAR_CLIENTE_POR_CONTRATO,
	BUSCAR_CLIENTE_POR_NOMBRE,
	BUSCAR_CLIENTE_POR_TELEFONO,
	BUSCAR_CLIENTE_SET_RESULTADOS_BUSQUEDA,
	getClientePorContrato,
	getClientePorNombre,
	getClientePorTelefono,
	setDataClient,
	setResultadoBusqueda,
	setClienteEncontrado,
	setNombreCliente,
	setNoContrato,
} from 'actions/buscarCliente.actions';
import { hideNotification } from 'actions/notification.actions';
import handleResetCliente from 'util/HandleResetCliente';
import handleNotification from 'util/HandleNotification';
import { isEmptyObject } from 'util/Validators';
import parseResultadoBusqueda from './BuscarClienteUtil';

const handleCancel = (dispatch, feature) => {
	dispatch(hideNotification(feature));
};
export const buscarContrato = async (dispatch, query, idContrato, view) => {
	dispatch(getClientePorContrato());
	handleResetCliente(dispatch);
	dispatch(
		setNoContrato({
			payload: idContrato,
		})
	);
	try {
		const response = await dispatch(fetchApi(query));
		if (isEmptyObject(response)) {
			const [payload] = Object.keys(response);
			dispatch(
				setNombreCliente({
					payload: response[payload].nombreCliente,
				})
			);

			dispatch(setClienteEncontrado());
			dispatch(
				setDataClient({
					payload: response[payload],
				})
			);
		}
	} catch (error) {
		handleNotification(dispatch, {
			type: 'error',
			content: NOTIFICATION_MESSAGES.errorSearchContract,
			children: 'Error de servidor.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleCancel(dispatch, BUSCAR_CLIENTE_POR_CONTRATO),
			feature: `${view} ${BUSCAR_CLIENTE_POR_CONTRATO}`,
			autoFocus: true,
		});
		throw new Error(error);
	}
};
export const buscarNombre = async (dispatch, query, view) => {
	dispatch(getClientePorNombre());
	try {
		const response = await dispatch(fetchApi(query));
		if (isEmptyObject(response)) {
			dispatch(
				setResultadoBusqueda({
					payload: parseResultadoBusqueda(response),
					feature: `${view} ${BUSCAR_CLIENTE_SET_RESULTADOS_BUSQUEDA}`,
				})
			);
		}
	} catch (error) {
		handleNotification(dispatch, {
			type: 'error',
			content: NOTIFICATION_MESSAGES.errorSearchContract,
			children: 'Error de servidor.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleCancel(dispatch, BUSCAR_CLIENTE_POR_NOMBRE),
			feature: `${view} ${BUSCAR_CLIENTE_POR_NOMBRE}`,
			autoFocus: true,
		});
		throw new Error(error);
	}
};
export const buscarTelefono = async (dispatch, query, view) => {
	dispatch(getClientePorTelefono());
	try {
		const response = await dispatch(fetchApi(query));

		if (isEmptyObject(response)) {
			dispatch(
				setResultadoBusqueda({
					payload: parseResultadoBusqueda(response),
					feature: `${view} ${BUSCAR_CLIENTE_SET_RESULTADOS_BUSQUEDA}`,
				})
			);
		}
	} catch (error) {
		handleNotification(dispatch, {
			type: 'error',
			content: NOTIFICATION_MESSAGES.errorSearchContract,
			children: 'Error de servidor.',
			okButtonTitle: 'Cerrar',
			onOk: () => handleCancel(dispatch, BUSCAR_CLIENTE_POR_TELEFONO),
			feature: BUSCAR_CLIENTE_POR_TELEFONO,
			autoFocus: true,
		});
		throw new Error(error);
	}
};
