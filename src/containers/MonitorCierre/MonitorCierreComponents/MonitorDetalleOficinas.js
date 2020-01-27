import React, { useState, useEffect } from 'react';
import Container from 'components/Container/Container';
import ContainerContent from 'components/Container/ContainerContent';
import { Timer as TimerIcon } from '@material-ui/icons';
import { convertTimer } from './MonitorCierreUtils';

const MonitorDetalleOficina = ({
	cierreActivo,
	toggleLoader,
	refreshPantalla,
	oficinasIniciales,
	oficinasEnProceso,
	oficinasPendientes,
	oficinasProcesadas,
}) => {
	const [timer, setTimer] = useState(convertTimer(refreshPantalla));
	useEffect(() => {
		let i = Number(refreshPantalla);
		const initTimer = () => {
			const countdownTimer = setInterval(() => {
				setTimer(convertTimer(i));
				i -= 1;
				if (i <= 0) clearInterval(countdownTimer);
			}, 1000);
		};

		if (toggleLoader && cierreActivo) initTimer();
	}, [toggleLoader, refreshPantalla, cierreActivo]);
	useEffect(() => {
		return () => setTimer(false);
	}, []);

	const setTimerLegend =
		oficinasIniciales && oficinasProcesadas ? oficinasIniciales !== oficinasProcesadas : true;

	return (
		<Container
			title="Actualización del Mantenimiento"
			subtitle={setTimerLegend && `Próxima actualización en ${timer} min`}
			iconRight={<TimerIcon color="primary" />}
		>
			<form autoComplete="off">
				<ContainerContent>
					<div className="row around-xs center g-mt-10 g-mb-10">
						<div className="col-xs-3">
							Oficinas Iniciales{' '}
							<strong className="secondary">{oficinasIniciales}</strong>
						</div>
						<div className="col-xs-3" style={{ borderLeft: '1px solid #E8E8E8' }}>
							Oficinas Pendientes{' '}
							<strong className="secondary">{oficinasPendientes}</strong>
						</div>
						<div className="col-xs-3" style={{ borderLeft: '1px solid #E8E8E8' }}>
							Oficinas Procesadas{' '}
							<strong className="secondary">{oficinasProcesadas}</strong>
						</div>
						<div className="col-xs-3" style={{ borderLeft: '1px solid #E8E8E8' }}>
							Oficinas en Proceso{' '}
							<strong className="secondary">{oficinasEnProceso}</strong>
						</div>
					</div>
				</ContainerContent>
			</form>
		</Container>
	);
};

export default MonitorDetalleOficina;
