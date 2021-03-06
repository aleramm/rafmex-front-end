import handleResetEntity from 'util/HandleResetEntity';

const handleCancelFlow = dispatch => {
	handleResetEntity(dispatch, 'buscarCliente', 'contrato', '');
	handleResetEntity(dispatch, 'buscarCliente', 'nombreCliente', '');
	handleResetEntity(dispatch, 'buscarCliente', 'cliente', {});
	handleResetEntity(dispatch, 'buscarCliente', 'existeCliente', false);
};

export default handleCancelFlow;
