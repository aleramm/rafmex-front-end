### MONITOR CIERE

1.- componentDidMount
a).- Verifica si Galileo está conectado.
b).- Hace un POST para traer las sucursales listas para el cierre del día actual.

EXPLICACIÓN DEL componentDidUpdate

    1.-     if (
                *Este cambio de props es después de que la fecha de cierre llama al servicio obtenerFechaCierre"
                prevProps.obtenerFechacierre.fechaActualCierre !== obtenerFechacierre.fechaActualCierre
            )
            *Entonces trae la fecha de cierre del servicio y la carga en la entidad*
            this.handleSetFechaCierreStatus(obtenerFechacierre.fechaActualCierre);

    	if (prevProps.oficinasEstado !== oficinasEstado) {
    		this.handleSetOficinasStatus(oficinasEstado);
    	}
    	if (prevProps.oficinasConfiguracion !== oficinasConfiguracion) {
    		this.handleSetOficinasConfiguracion(oficinasConfiguracion);
    	}
    	if (
            *Este llamado es cuando la fecha del calendario cambia, con la condicion de que al inicio no la llame el cambio de fechaActualCierre, de esta manera se evitan llamados automáticos*
    		prevState.fechaInicial !== fechaInicial &&
    		prevProps.obtenerFechacierre.fechaActualCierre !== obtenerFechacierre.fechaActualCierre
    	) {
            *Cuando el calendario cambia, despacha la lista de oficinas*
    		this.handleGetSucursales(dispatch, headerRequest, fechaInicial, push);
    	}
