/* -------CONSULTA MAPEO EMPRESAS---- */
export const CONSULTAR_MAPEO_EMPRESAS = '/cxf/seguridad/autorizacion/consultarMapeoEmpresas';
/* -------CONSULTAR FACULTADES------- */
export const CONSULTAR_USUARIO_EMAIL = '/cxf/seguridad/autorizacion/consultarUsuarioEmail';
export const CONSULTAR_USUARIO_ACTIVO = '/cxf/empleados/rest/buscarActivos';
export const CONSULTAR_USUARIO_FACULTADES =
	'/cxf/seguridad/autorizacion/consultarFacultadesActivasUsuarioGlobales';
/* -------AUTORIZA------- */
export const AUTORIZA_PERSONA_FACULTAD = '/cxf/seguridad/autorizacion/autorizaPersonaFacultad';
/* -------OFICINAS------- */
export const CONSULTA_OFICINAS_POST = '/AdminEfectivoWSRest/rest/consultasRest/consultaOficina';
/**
 * -------BUSCAR CLIENTE-------
 */
export const CONSULTA_CLIENTES_NOMBRE_POST =
	'/AdminCarteraWSRest/rest/consultasRest/consultarClientes';

/* Disposiciones masivas */
export const CONSULTA_DISPOSICIONES_MASIVAS_POST =
	'msk/operaciones-centrales/rest/consultarDisposicionMasiva';
export const APLICAR_DISPOSICIONES_MASIVAS_POST =
	'msk/operaciones-centrales/rest/aplicarDisposicionMasiva';

/** Monitor Servicios */
export const CONSULTA_MONITOR_SERVICIOS_POST = 'msk/monitor-servicios/rest/obtenerServiciosMonitor';
export const REINTENTO_OPERACION = 'msk/monitor-servicios/rest/reintentarServicio';
export const ENVIAR_NOTIFICACION = 'msk/monitor-servicios/rest/enviarNotificaciones';
export const VER_INFORMACION = 'msk/monitor-servicios/rest/recuperarInformacion';

/* Quebrantos venta cartera */
export const QUEBRANTOS_VENTA_CARTERA_POST =
	'msk/operaciones-centrales/rest/aplicarVentaCarteraMasiva';

/* Quebrantos venta cartera */
export const QUEBRANTOS_MASIVOS_POST = 'msk/operaciones-centrales/rest/aplicarQuebrantosMasivo';

/* Cancelar venta cartera */
export const CONSULTA_CANCELAR_VENTA_CARTERA =
	'/AdminCarteraWSRest/rest/consultasRest/consultaCancelarVentaCartera';
export const APLICAR_CANCELACION_VENTA_CARTERA_POST =
	'/IntegradorWSRest/rest/operacionesCajaRest/cancelarVentaCartera';

/* Cancelar quebrantos */
export const CONSULTA_CANCELAR_QUEBRANTOS_POST =
	'/AdminCarteraWSRest/rest/consultasRest/consultaCancelarQuebranto';

export const APLICAR_CANCELACION_QUEBRANTOS_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/aplicarCancelarQuebranto';

/* ENTRADA SALIDA EFECTIVO */
export const CONSULTA_OFICINAS_ENTRADA_SALIDA_POST =
	'/AdminEfectivoWSRest/rest/consultasRest/consultaOficina';

export const CONSULTA_CAJAS_ACTIVAS_POST =
	'/AdminEfectivoWSRest/rest/consultasRest/obtenerCatCajas';

export const APLICAR_ENTRADA_SALIDA_EFECTIVO_POST =
	'/IntegradorWSRest/rest/operacionesCajaRest/entradaSalidaEfectivo';

/** Admind Atms */
export const GET_ALL_ATMS_POST = '/AdminATMWSRest/rest/consultas/consultarATMs';
export const GET_CONTADORES_ACTUALES = '/AdminATMWSRest/rest/consultas/contadoresActuales';
export const GET_HISTORICOS = '/AdminATMWSRest/rest/consultas/contadorHistorico';
export const GET_DOTACIONES = '/AdminATMWSRest/rest/consultas/dotacionesATM';
export const UPDATE_CONTADORES_ACTUALES = '/AdminATMWSRest/rest/operacionesRest/actualizarContador';
export const CANCELAR_DOTACION = '/AdminATMWSRest/rest/operacionesRest/cancelarDotacion';

/* MANTO. CAJA */
export const CONSULTA_OFICINAS_MANTENIMIENTO_CAJA_POST =
	'/AdminEfectivoWSRest/rest/consultasRest/consultaOficina';

export const CONSULTA_CAJAS_POR_OFICINA = '/AdminEfectivoWSRest/rest/consultasRest/consultaCajas';

export const CONSULTA_PROSPECTO_CAJEROS_MANTO_CAJA_POST =
	'/AdminEfectivoWSRest/rest/consultasRest/consultaCajerosCajasNoAbiertas';

export const APLICAR_ALTA_EDICION_MANTENIMIENTO_CAJA_POST =
	'/AdminEfectivoWSRest/rest/operacionesRest/guardarCaja';

/* FIN MANTO. CAJA */
export const REINICIAR_PROCESOS = '/monitor-servicios/MonitorServicios/rest/reintentoServicio';
/* PAGOS EMPLEADOS */
export const BUSCAR_EMPLEADO_EMPRESAS_POST = 'msk/operaciones-centrales/rest/consultarPagoEmpleado';
export const APLICAR_PAGOS_EMPLEADOS_POST = 'msk/operaciones-centrales/rest/aplicarPagoEmpleado';

/* ACLARACIONES */

export const BUSCAR_CONTRATO_ACLARACION_POST =
	'/IntegradorWSRest/rest/consultasCajaRest/consultaAclaracion';
export const BUSCAR_CONTRATO_RESOLUCIONES_POST =
	'/IntegradorWSRest/rest/consultasCajaRest/consultaResolucion';
export const CALCULAR_MONTOS_ACALRACION_POST =
	'/IntegradorWSRest/rest/consultasCajaRest/calcularAclaracion';
export const APLICAR_ACALRACION_POST =
	'/IntegradorWSRest/rest/operacionesCajaRest/registrarAclaracionResolucion';
export const GENERAR_REPORTE_ACLARACIONES_POST =
	'/AdminEfectivoWSRest/rest/reportesPdf/reporteAclaraciones';

/*  RECIBOS COBRANZA */

export const CONSULTA_BLOCS = '/IntegradorWSRest/rest/consultasCajaRest/consultaBlocsRecibos';
export const APLICAR_OPERACION = '/IntegradorWSRest/rest/operacionesCajaRest/recibirBlock';

/* POBLADOR MENSAJES */

export const CONSULTAR_MENSAJES_POBLADOR_CAJA_POST =
	'/AdminCarteraWSRest/rest/consultasRest/recuperarMensajesConfiguracion';

export const VALIDATE_QUERY_MENSAJES_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/validarConsultaMensaje';

export const ALTA_MENSAJES_POBLADOR_CAJA_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/crearMensajeConfiguracion';

export const EDICION_MENSAJES_POBLADOR_CAJA_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/modificarMensajeConfiguracion';

export const ELIMINAR_MENSAJES_POBLADOR_CAJA_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/eliminarMensajeConfiguracion';

export const CONSULTA_CATALOGO_TIPO_OPERACION_POST =
	'/AdminCarteraWSRest/rest/consultasRest/consultaCatalogoTiposOperacion';

export const CONSULTAR_MENSAJES_POBLADOR_CONTRATOS_POST =
	'/AdminCarteraWSRest/rest/consultasRest/recuperarMensajesContrato';

export const ALTA_MENSAJES_POBLADOR_CONTRATOS_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/crearMensajeContrato';

export const EDICION_MENSAJES_POBLADOR_CONTRATOS_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/modificarMensajeContrato';

export const ELIMINAR_MENSAJES_POBLADOR_CONTRATOS_POST =
	'/AdminCarteraWSRest/rest/operacionesRest/eliminarMensajeContrato';
// 	ALTA DE BLOCKS
export const ALTA_DE_BLOCKS = '/IntegradorWSRest/rest/operacionesCajaRest/altaBlock';
export const CONSULTA_BLOCKS = '/IntegradorWSRest/rest/consultasCajaRest/consultaBlocsRecibos';
export const GET_CATALOGOS = '/IntegradorWSRest/rest/consultasCajaRest/consultaCatalogos';

/* -------CONSULTA SUCURSALES---- */
export const MONITOR_CIERRE =
	'http://cierre-diario.endpoints.fintech-calidad-mx.cloud.goog/msk/cierre-diario/rest/consultas/obtenerOficinasCierre';
export const MONITOR_CIERRE_OBTENER_FECHA =
	'http://cierre-diario.endpoints.fintech-calidad-mx.cloud.goog/msk/cierre-diario/rest/consultas/obtenerFechaCierre';
export const EJECUTAR_CIERRE_UNITARIO =
	'http://cierre-diario.endpoints.fintech-calidad-mx.cloud.goog/msk/cierre-diario/rest/operaciones/generarCierreOficina';
export const FINALIZAR_CIERRE_DIARIO =
	'http://cierre-diario.endpoints.fintech-calidad-mx.cloud.goog/msk/cierre-diario/rest/operaciones/terminarCierre';
export const OBTENER_PLANES_EJECUCION =
	'http://cierre-diario.endpoints.fintech-calidad-mx.cloud.goog/msk/cierre-diario/rest/consultas/obtenerPlanesEjecucion';
