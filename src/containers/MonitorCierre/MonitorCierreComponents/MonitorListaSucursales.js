import React from 'react';
import Container from 'components/Container/Container';
import Table from 'components/Table/Table';
import { Typography } from '@material-ui/core';
import ContainerContent from 'components/Container/ContainerContent';
import { headersSucursales } from '../MonitorCierreConstants';

const selectedRow = () => {};

const statusHandler = () => {};

const MonitorListaSucursales = ({ enableTable, listaOficinas, toggleLoader }) => {
	return (
		<Container title="Lista de sucursales">
			<form autoComplete="off">
				<ContainerContent>
					<div style={{ maxHeight: 470, overflow: 'auto' }}>
						{(enableTable && (
							<Table
								stickyHeader
								tableWidth="100%"
								headers={headersSucursales}
								options={listaOficinas.length !== 0 ? listaOficinas : []}
								// selectedRows={selectedRow()}
								// selectable
								skeletor
								skeletorItems={
									listaOficinas.length !== 0 ? listaOficinas.length : 8
								}
								skeletorActivate={toggleLoader}
							/>
						)) || (
							<div className="center">
								<Typography component="p">
									Por favor seleccione una sucursal y una fecha válida para
									mostrar la tabla.
								</Typography>
							</div>
						)}
					</div>
				</ContainerContent>
			</form>
		</Container>
	);
};

export default MonitorListaSucursales;
