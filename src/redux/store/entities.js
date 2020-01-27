const entities = {
	buscarCliente: {
		contrato: '',
		nombreCliente: '',
		existeCliente: false,
		cliente: {},
		resultadoBusqueda: [],
	},
	disposicionesMasivas: {
		listaDisposiciones: [],
		listaDisposicionesRealizadas: [],
	},
	cierreDiario: {
		sucursales: [],
		toggleLoadOficinas: false,
		configuracionOficinas: {},
		fechaCierre: {},
		procesoActivo: false,
		cierreManual: {},
		planesEjecucion: [],
	},
	quebrantosVentaCartera: {
		listaCarteraRealizada: [],
		listaQuebrantosRealizados: [],
	},
	cancelarVentaCartera: {
		clienteContrato: {},
	},
	cancelarQuebrantos: {
		clienteContrato: {},
	},

	entradaSalidaEfectivo: {
		listaCajas: [],
	},
	adminCajerosAtm: {
		cajerosAtm: [],
		dotaciones: [],
		cancelaciones: [],
		contadoresActuales: [],
		contadoresSaldosATM: {},
		contadoresHistoricos: [],
		maximoContador: '',
	},
	mantenimientoCajas: {
		catalogoOficinas: [],
		listaCajas: [],
		listaCajaSeguridad: [],
		listaProspectos: [],
		cajaRegistrar: '',
		muestraComponenteAlta: false,
		resetEditar: false,
	},
	pagosEmpleadosNomina: {
		listaEmpleadosNomina: [],
		listaPagosAplicados: [],
		montoPagoAplicar: '',
	},
	aclaraciones: {
		contratoAclaracion: {},
		calculoMontosAclaracion: {},
		listAclaraciones: [],
		reporteAclaraciones: '',
	},
	recibosConbranza: {
		consulta: [],
	},
	pobladorMensajes: {
		listMessages: [],
		listaCatalogoTipoOperacion: [],
		resetEditar: false,
		isConsultaValida: false,
		busquedaSinContrato: false,
	},
	altaBlocks: {
		consulta: [],
		catalogos: [],
	},
};

export default entities;
