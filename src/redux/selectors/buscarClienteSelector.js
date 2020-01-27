import { createSelector } from 'reselect';

// Selectors
const buscarClienteContrato = state => state.entities.buscarCliente.contrato;
const buscarClienteNombre = state => state.entities.buscarCliente.nombreCliente;
const buscarClienteCliente = state => state.entities.buscarCliente.cliente;
const buscarClienteResultadoBusqueda = state => state.entities.buscarCliente.resultadoBusqueda;
const buscarClienteExisteCliente = state => state.entities.buscarCliente.existeCliente;

// Reselect functions
export const getBuscarClienteContratoState = createSelector(
	[buscarClienteContrato],
	contrato => contrato
);
export const getBuscarClienteNombreState = createSelector(
	[buscarClienteNombre],
	nombreCliente => nombreCliente
);
export const getBuscarClienteClienteState = createSelector(
	[buscarClienteCliente],
	cliente => cliente
);
export const getBscarClienteResultadoBusquedaState = createSelector(
	[buscarClienteResultadoBusqueda],
	resultadoBusqueda => resultadoBusqueda
);
export const getBuscarClienteExisteClienteState = createSelector(
	[buscarClienteExisteCliente],
	existeCliente => existeCliente
);
