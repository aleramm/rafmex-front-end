import React from 'react';
import mainMenu from 'constants/Menu';
import DynamicImport from 'constants/DynamicImport';
import { OPERACIONES_INIT } from 'actions/app.actions';
import handleProgress from 'util/HandleProgress';
import { findMenu } from 'util/HandlePage';
import NoMenu from 'containers/NoMenu';
import initOperaciones from 'appActions';

const MainContainer = props => {
	let Component = null;
	const { dispatch, params, operacionesReady } = props;
	const { page, subpage } = params;
	if (!page || !subpage) {
		return <NoMenu {...props} />;
	}
	handleProgress(dispatch, {
		message: 'Iniciando...',
		feature: OPERACIONES_INIT,
	});
	const componentProps = findMenu(mainMenu, 'path', subpage);
	if (!componentProps) {
		handleProgress(dispatch, {
			show: false,
			feature: OPERACIONES_INIT,
		});
		return <h1>No existe el menú seleccionado</h1>;
	}
	const componentPath = `containers/${componentProps.componentName}/${componentProps.componentName}`;
	Component = DynamicImport(componentPath);
	if (!Component) {
		handleProgress(dispatch, {
			show: false,
			feature: OPERACIONES_INIT,
		});
		return <h1>No existe la opción seleccionada</h1>;
	}
	if (!operacionesReady) {
		initOperaciones(props.push, props.dispatch);
	}
	return <Component {...props} {...componentProps} />;
};
export default MainContainer;
