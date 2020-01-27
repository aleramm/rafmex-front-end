import handleResetEntity from 'util/HandleResetEntity';

const handleResetCliente = dispatch => {
	handleResetEntity(dispatch, 'buscarCliente', 'contrato', '');
	handleResetEntity(dispatch, 'buscarCliente', 'nombreCliente', '');
	handleResetEntity(dispatch, 'buscarCliente', 'cliente', {});
	handleResetEntity(dispatch, 'buscarCliente', 'resultadoBusqueda', []);
	handleResetEntity(dispatch, 'buscarCliente', 'existeCliente', false);
};

export default handleResetCliente;
