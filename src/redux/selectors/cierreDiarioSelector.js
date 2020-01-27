import { createSelector } from 'reselect';

// Selectors
const getEstadoOficinas = state => state.entities.cierreDiario.sucursales;
const getConfiguracionOficinas = state => state.entities.cierreDiario.configuracionOficinas;
const getObtenerFechaCierre = state => state.entities.cierreDiario.fechaCierre;
const getObtenerProcesoActivo = state => state.entities.cierreDiario.procesoActivo;
const getObtenerToggleLoad = state => state.entities.cierreDiario.toggleLoadOficinas;
const getObtenerCierreManual = state => state.entities.cierreDiario.cierreManual;
const getObtenerPlanesEjecucion = state => state.entities.cierreDiario.planesEjecucion;

// Reselect functions
export const getEstadoOficinasState = createSelector(
	[getEstadoOficinas],
	servicios => servicios
);

export const getConfiguracionOficinasState = createSelector(
	[getConfiguracionOficinas],
	servicios => servicios
);

export const getObtenerFechaCierreState = createSelector(
	[getObtenerFechaCierre],
	servicios => servicios
);

export const getObtenerProcesoActivoState = createSelector(
	[getObtenerProcesoActivo],
	servicios => servicios
);

export const getObtenerToggleLoadState = createSelector(
	[getObtenerToggleLoad],
	servicios => servicios
);

export const getObtenerCierreManualState = createSelector(
	[getObtenerCierreManual],
	servicios => servicios
);

export const getObtenerPlanesEjecucionState = createSelector(
	[getObtenerPlanesEjecucion],
	servicios => servicios
);
