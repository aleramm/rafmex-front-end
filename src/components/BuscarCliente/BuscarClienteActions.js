import {
	BUSCAR_CLIENTE_POR_CONTRATO,
	BUSCAR_CLIENTE_POR_NOMBRE,
	BUSCAR_CLIENTE_POR_TELEFONO,
} from 'actions/buscarCliente.actions';
import { CONSULTA_CLIENTES_NOMBRE_POST } from 'constants/Endpoints';
import { buscarContrato, buscarNombre, buscarTelefono } from './BuscarClienteApi';

export const buscarPorContrato = (
	dispatch,
	headerRequest,
	idSucursal,
	idContrato,
	view,
	endpoint
) => {
	const request = {
		headerRequest: {
			...headerRequest,
			idOficina: idSucursal,
		},
		contrato: { idContrato },
	};
	const queryRequest = {
		data: request,
		feature: `${view} ${BUSCAR_CLIENTE_POR_CONTRATO}`,
		endpoint,
	};
	buscarContrato(dispatch, queryRequest, idContrato, view);
};
export const buscarContratoSeleccionado = (
	dispatch,
	headerRequest,
	idSucursal,
	idContrato,
	view,
	endpoint
) => {
	buscarPorContrato(dispatch, headerRequest, idSucursal, idContrato, view, endpoint);
};
export const buscarPorNombre = (dispatch, headerRequest, buscarCliente, { view, status }) => {
	const clienteRequest = {
		headerRequest: {
			...headerRequest,
			idOficina: buscarCliente.idSucursal.value,
		},
		peticionPersonas: {
			cliente: {
				nombre: buscarCliente.nombre && buscarCliente.nombre,
				apellidoMaterno: buscarCliente.apellidoMaterno && buscarCliente.apellidoMaterno,
				apellidoPaterno: buscarCliente.apellidoPaterno && buscarCliente.apellidoPaterno,
				rfc: buscarCliente.rfc && buscarCliente.rfc,
			},
			listaEstatusCto: [status],
		},
	};
	const queryRequest = {
		data: clienteRequest,
		feature: `${view} ${BUSCAR_CLIENTE_POR_NOMBRE}`,
		endpoint: CONSULTA_CLIENTES_NOMBRE_POST,
	};
	buscarNombre(dispatch, queryRequest, view);
};
export const buscarPorTelefono = (dispatch, headerRequest, buscarCliente, { view }) => {
	const clienteRequest = {
		headerRequest: {
			...headerRequest,
			idOficina: buscarCliente.idSucursal.value,
		},
		peticionPersonas: {
			cliente: {
				nombre: buscarCliente.nombre && buscarCliente.nombre,
				apellidoMaterno: buscarCliente.apellidoMaterno && buscarCliente.apellidoMaterno,
				apellidoPaterno: buscarCliente.apellidoPaterno && buscarCliente.apellidoPaterno,
				rfc: buscarCliente.rfc && buscarCliente.rfc,
				telefono:
					buscarCliente.numeroTelefono &&
					buscarCliente.numeroTelefono.split(' ').join(''),
			},
		},
	};
	const query = {
		data: clienteRequest,
		feature: `${view} ${BUSCAR_CLIENTE_POR_TELEFONO}`,
		endpoint: CONSULTA_CLIENTES_NOMBRE_POST,
	};
	buscarTelefono(dispatch, query, view);
};
