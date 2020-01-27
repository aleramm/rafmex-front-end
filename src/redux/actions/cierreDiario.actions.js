import { SET_ACTION } from 'actions/getter.actions';

export const CIERRE_DIARIO = '[CIERRE_DIARIO]';
export const CIERRE_MANUAL = '[CIERRE_MANUAL]';
export const GET_SUCURSALES = `${CIERRE_DIARIO} CONSULT SERVICES`;
export const GET_FECHA_CIERRE = `${CIERRE_DIARIO} GET FECHA CIERRE`;
export const GET_CONFIGURATION = `${CIERRE_DIARIO} GET CONFIGURACION OFICINAS`;
export const GET_CIERRE_ACTIVO = `${CIERRE_DIARIO} GET CIERRE ACTIVO`;
export const GET_PLANES_EJECUCION = `${CIERRE_DIARIO} GET PLANES EJECUCION`;
export const GET_TOGGLE_LOAD_OFICINAS = `${CIERRE_DIARIO} LOAD OFICINAS`;

const entityPlanesEjecucionGet = {
	epic: 'cierreDiario',
	module: 'planesEjecucion',
};

const entityEstadoOficinasGet = {
	epic: 'cierreDiario',
	module: 'sucursales',
};

const entityObtenerFechaCierre = {
	epic: 'cierreDiario',
	module: 'fechaCierre',
};

const entityProcesoActivo = {
	epic: 'cierreDiario',
	module: 'procesoActivo',
};

const entityToggleLoadOficinas = {
	epic: 'cierreDiario',
	module: 'toggleLoadOficinas',
};

const entityConfiguracionOficinas = {
	epic: 'cierreDiario',
	module: 'configuracionOficinas',
};

const entityCierreManual = {
	epic: 'cierreDiario',
	module: 'cierreManual',
};

export const setCierreManual = payload => ({
	type: `${CIERRE_MANUAL} ${SET_ACTION}`,
	payload,
	entity: entityCierreManual,
});

export const setProcesoActivo = payload => ({
	type: `${GET_SUCURSALES} ${SET_ACTION}`,
	payload,
	entity: entityProcesoActivo,
});

export const setToggleLoadOficinas = payload => ({
	type: `${GET_TOGGLE_LOAD_OFICINAS} ${SET_ACTION}`,
	payload,
	entity: entityToggleLoadOficinas,
});

export const setEstadoOficinas = payload => ({
	type: `${GET_CIERRE_ACTIVO} ${SET_ACTION}`,
	payload,
	entity: entityEstadoOficinasGet,
});

export const setFechaActualCierre = payload => ({
	type: `${GET_FECHA_CIERRE} ${SET_ACTION}`,
	payload,
	entity: entityObtenerFechaCierre,
});

export const setConfiguracionOficinas = payload => ({
	type: `${GET_CONFIGURATION} ${SET_ACTION}`,
	payload,
	entity: entityConfiguracionOficinas,
});

export const setPlanesEjecucion = payload => ({
	type: `${GET_PLANES_EJECUCION} ${SET_ACTION}`,
	payload,
	entity: entityPlanesEjecucionGet,
});
