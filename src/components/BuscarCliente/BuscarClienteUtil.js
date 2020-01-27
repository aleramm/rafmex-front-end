const parseResultadoBusqueda = ({ listaClientes }) => {
	return listaClientes.map((cliente, index) => {
		return {
			id: index,
			contrato: cliente.contrato,
			nombre: `${cliente.nombre} ${cliente.apellidoPaterno} ${cliente.apellidoMaterno}`,
			rfc: cliente.rfc,
			direccion: cliente.direccion,
			fechaContrato: cliente.fechaContrato,
		};
	});
};

export default parseResultadoBusqueda;
