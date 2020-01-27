import { SET_ACTION } from 'actions/getter.actions';

export const BUSCAR_CLIENTE = '[BUSCAR_CLIENTE]';
export const BUSCAR_CLIENTE_POR_CONTRATO = `${BUSCAR_CLIENTE} por contrato`;
export const BUSCAR_CLIENTE_POR_NOMBRE = `${BUSCAR_CLIENTE} por nombre`;
export const BUSCAR_CLIENTE_POR_TELEFONO = `${BUSCAR_CLIENTE} or telefono`;
export const BUSCAR_CLIENTE_ENCONTRADO = `${BUSCAR_CLIENTE} cliente encontrado`;
export const BUSCAR_CLIENTE_NO_ENCONTRADO = `${BUSCAR_CLIENTE} cliente no encontrado`;
export const BUSCAR_CLIENTE_SET_RESULTADOS_BUSQUEDA = `${BUSCAR_CLIENTE} set resultado busqueda`;
export const BUSCAR_CLIENTE_SET_CLIENTE = `${BUSCAR_CLIENTE} set cliente`;
export const BUSCAR_CLIENTE_SET_NOMBRE = `${BUSCAR_CLIENTE} set nombre cliente`;
export const BUSCAR_CLIENTE_SET_CONTRATO = `${BUSCAR_CLIENTE} set contrato`;
export const BUSCAR_CLIENTE_SET_SUCURSALES = `${BUSCAR_CLIENTE} set sucursales`;

// Action creators

export const getClientePorContrato = () => ({
	type: BUSCAR_CLIENTE_POR_CONTRATO,
});
export const getClientePorNombre = () => ({
	type: BUSCAR_CLIENTE_POR_NOMBRE,
});
export const getClientePorTelefono = () => ({
	type: BUSCAR_CLIENTE_POR_TELEFONO,
});

export const setDataClient = ({ payload }) => ({
	type: `${BUSCAR_CLIENTE_SET_CLIENTE} ${SET_ACTION}`,
	payload,
	entity: {
		epic: 'buscarCliente',
		module: 'cliente',
	},
});
export const setResultadoBusqueda = ({ payload, feature }) => ({
	type: `${feature} ${SET_ACTION}`,
	payload,
	entity: {
		epic: 'buscarCliente',
		module: 'resultadoBusqueda',
	},
});
export const setTableClientTelefono = ({ payload }) => ({
	type: `${BUSCAR_CLIENTE_SET_RESULTADOS_BUSQUEDA} ${SET_ACTION}`,
	payload,
	entity: {
		epic: 'buscarCliente',
		module: 'resultadoBusqueda',
	},
});
export const setClienteEncontrado = () => ({
	type: `${BUSCAR_CLIENTE_ENCONTRADO} ${SET_ACTION}`,
	payload: true,
	entity: {
		epic: 'buscarCliente',
		module: 'existeCliente',
	},
});
export const setClienteNoEncontrado = () => ({
	type: `${BUSCAR_CLIENTE_NO_ENCONTRADO} ${SET_ACTION}`,
	payload: false,
	entity: {
		epic: 'buscarCliente',
		module: 'existeCliente',
	},
});
export const setNoContrato = ({ payload }) => ({
	type: `${BUSCAR_CLIENTE_SET_CONTRATO} ${SET_ACTION}`,
	payload,
	entity: {
		epic: 'buscarCliente',
		module: 'contrato',
	},
});
export const setNombreCliente = ({ payload }) => ({
	type: `${BUSCAR_CLIENTE_SET_NOMBRE} ${SET_ACTION}`,
	payload,
	entity: {
		epic: 'buscarCliente',
		module: 'nombreCliente',
	},
});
