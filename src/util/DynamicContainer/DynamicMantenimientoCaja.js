import React from 'react';
import DynamicImport from 'constants/DynamicImport';

const DynamicMantenimientoCaja = props => {
	const { accionCaja, tipoCaja } = props;
	let Component = null;
	const componenteEdicion = {
		ATM: 'EdicionATM',
		VENT: 'EdicionVentanilla',
		CJSEG: 'EdicionCajaSeguridad',
	};

	const componenteAlta = {
		ATM: 'AltaATM',
		VENT: 'AltaVentanilla',
		CJSEG: 'AltaCajaSeguridad',
	};

	const componentChild =
		accionCaja === 'Edicion' ? componenteEdicion[tipoCaja] : componenteAlta[tipoCaja];

	const componentPath = `containers/MantenimientoCaja/${accionCaja}MantenimientoCaja/${componentChild}`;
	Component = DynamicImport(componentPath);
	return <Component {...props} />;
};
export default DynamicMantenimientoCaja;
