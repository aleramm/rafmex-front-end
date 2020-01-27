import React from 'react';
import { Button, MenuItem, TextField } from '@material-ui/core';
import Container from 'components/Container/Container';
import ImportantLabel from 'components/ImportantLabel/ImportantLabel';
import ContainerContent from 'components/Container/ContainerContent';
import PickerDate from 'components/PickerDate/PickerDate';
import { empresas } from '../MonitorCierreConstants';

const MonitorCierreFiltro = ({
	claveEmpresa,
	fechaInicial,
	changeFilter,
	planEjecucion,
	maxDateReport,
	minDateReport,
	procesoActivo,
	enableCalendar,
	finalizarCierre,
	oficinasIniciales,
	handleIniciaCierre,
	oficinasProcesadas,
}) => {
	const enableButtonFinalizar =
		oficinasIniciales && oficinasProcesadas ? oficinasIniciales !== oficinasProcesadas : true;
	const enableButtonIniciar = !enableCalendar ? !enableButtonFinalizar || procesoActivo : true;
	return (
		<Container>
			<form autoComplete="off">
				<ContainerContent>
					<div className="row around-xs">
						<div className="col-xs-12 col-sm-7">
							<h3>Filtros</h3>
							<p className="advertisement secondary">
								Para correr el cierre de una sucursal, los filtros{' '}
								<strong>no</strong> deben estar vacíos.
							</p>
							<div className="row between-xs">
								<div className="col-md-3">
									<TextField
										select
										id="claveEmpresa"
										name="claveEmpresa"
										label="Empresa"
										fullWidth
										value={claveEmpresa}
										onChange={changeFilter}
									>
										{empresas.map(option => (
											<MenuItem key={option.value} value={option.value}>
												{option.text}
											</MenuItem>
										))}
									</TextField>
								</div>
								<div className="col-md-3">
									<PickerDate
										name="fechaInicial"
										label="Fecha inicial"
										value={fechaInicial}
										onChange={changeFilter}
										minDate={minDateReport}
										maxDate={maxDateReport}
										autoOk
										disabled={enableCalendar}
									/>
								</div>
								<div className="col-md-4">
									<ImportantLabel
										className="left"
										title="Plan de Ejecución"
										content={planEjecucion}
									/>
								</div>
							</div>
						</div>
						<div className="col-xs-12 col-sm-5">
							<h3>Acciones</h3>
							<p className="advertisement secondary">
								Seleccione una acción a ejecutar.
							</p>
							<div className="row end-xs g-pt-15">
								<div className="col-md-5">
									<Button
										variant="contained"
										type="button"
										color="primary"
										onClick={finalizarCierre}
										disabled={enableButtonFinalizar}
									>
										FINALIZAR CIERRE
									</Button>
								</div>
								<div className="col-md-5">
									<Button
										onClick={handleIniciaCierre}
										variant="contained"
										disabled={enableButtonIniciar}
										color="primary"
									>
										INICIAR CIERRE
									</Button>
								</div>
							</div>
						</div>
					</div>
				</ContainerContent>
			</form>
		</Container>
	);
};

export default MonitorCierreFiltro;
