import React from 'react';
import {
	Check as CheckIcon,
	PlayCircleOutline as PlayCircleOutlineIcon,
	ReportProblem as ReportProblemIcon,
	Visibility as VisibilityIcon,
	NotInterested as NotInterestedIcon,
} from '@material-ui/icons';
import { CircularProgress, BottomNavigationAction } from '@material-ui/core';
import SimpleMenu from 'components/SimpleMenu/SimpleMenu';
import { setCierreManual } from 'actions/cierreDiario.actions';

export const convertTimer = time => {
	console.error('=========', time);
	if (typeof time === 'undefined') {
		return '--:--';
	}
	return [...String(time)].length === 1 ? `00:0${time}` : `00:${time && '00'}`;
};

const LoaderButton = () => {
	return (
		<CircularProgress
			variant="indeterminate"
			disableShrink
			size={20}
			thickness={4}
			color="secondary"
			style={{
				animationDuration: '550ms',
			}}
		/>
	);
};

const clickEventError = () => {
	//return <SimpleMenu />;
};

// const handleClick = event => {
// 	setAnchorEl(event.currentTarget);
// };

const actions = [
	{ legend: 'Ejecución manual', type: 'manu' },
	{ legend: 'Ver detalles', type: 'details' },
	{ legend: 'Ver errores', type: 'errors' },
];

const Clock = () => {
	return (
		<div id="g-countdown">
			<div id="g-countdown-number"></div>
			<svg className="g-svg">
				<circle r="9" cx="30" cy="15"></circle>
			</svg>
		</div>
	);
};

const getIcons = {
	handleClickAction: event => {
		event.persist();
		const { target } = event;
		const [
			,
			{
				name,
				data: { dispatch, codigoProceso, idOficina },
			},
		] = Object.values(target);
		dispatch(setCierreManual({ cierreManual: true, name, idOficina, codigoProceso }));
	},
	classIconMessage: {
		E: 'secondary',
		N: 'pointer-not-allowed',
	},
	// eslint-disable-next-line react/display-name
	E: (notAllowed, idOficina, codigoProceso, dispatch) => {
		return (
			/* options disabledMenu handleClickAction */
			<SimpleMenu
				handleClickSelected={getIcons.handleClickAction}
				options={actions}
				disabledMenu={!notAllowed}
				data={{ idOficina, codigoProceso, dispatch }}
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	N: (notAllowed, idOficina) => {
		return (
			<BottomNavigationAction
				onClick={clickEventError(idOficina)}
				icon={<PlayCircleOutlineIcon className={getIcons.classIconMessage[notAllowed]} />}
				className="g-p-0"
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	T: (notAllowed, idOficina) => {
		return (
			<BottomNavigationAction
				//onClick={clickEventError(idOficina)}
				icon={<CheckIcon className={`${getIcons.classIconMessage[notAllowed]} success`} />}
				className="g-p-0"
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	P: () => <BottomNavigationAction icon={<LoaderButton />} className="g-p-0" />,
	// eslint-disable-next-line react/display-name
	H: (notAllowed, idOficina) => {
		return (
			<BottomNavigationAction
				onClick={clickEventError(idOficina)}
				icon={<PlayCircleOutlineIcon className={getIcons.classIconMessage[notAllowed]} />}
				className="g-p-0"
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	C: (notAllowed, idOficina) => {
		return (
			<BottomNavigationAction
				onClick={clickEventError(idOficina)}
				icon={<PlayCircleOutlineIcon className={getIcons.classIconMessage[notAllowed]} />}
				className="g-p-0"
			/>
		);
	},
	// eslint-disable-next-line react/display-name
	O: (notAllowed, idOficina) => {
		return (
			<BottomNavigationAction
				//onClick={clickEventError(idOficina)}
				icon={<NotInterestedIcon className={getIcons.classIconMessage[notAllowed]} />}
				className="g-p-0"
			/>
		);
	},
	setMessage: (type, notAllowed, idOficina, codigoProceso, dispatch) => {
		return getIcons[type](notAllowed, idOficina, codigoProceso, dispatch);
	},
};

const getStatus = {
	N: 'Normal',
	T: <div className="success">Terminado</div>,
	P: 'Procesando',
	E: <div className="danger">Error</div>,
	H: 'Carga caché',
	C: 'Cerrada',
	O: 'No Aplica',
};

const handleOficinasStatus = (oficinas, dispatch) => {
	const oficinasFinal = [];
	const keysType = {
		calculoCobranza: 'COBR',
		asignacionCartera: 'ASIG',
		accionesPost: 'ACPO',
		archivoCobranza: 'ARCC',
	};
	oficinas.map(item => {
		const {
			idOficina,
			accionesPost,
			statusCierre,
			nombreOficina,
			archivoCobranza,
			calculoCobranza,
			asignacionCartera,
		} = item;
		oficinasFinal.push({
			idOficina,
			nombreOficina,
			statusCierre: getStatus[statusCierre],
			calculoCobranza: getIcons.setMessage(
				calculoCobranza,
				statusCierre,
				idOficina,
				keysType.calculoCobranza,
				dispatch
			),
			asignacionCartera: getIcons.setMessage(
				asignacionCartera,
				statusCierre,
				idOficina,
				keysType.asignacionCartera,
				dispatch
			),
			accionesPost: getIcons.setMessage(
				accionesPost,
				statusCierre,
				idOficina,
				keysType.accionesPost,
				dispatch
			),
			archivoCobranza: getIcons.setMessage(
				archivoCobranza,
				statusCierre,
				idOficina,
				keysType.archivoCobranza,
				dispatch
			),
		});
	});
	return oficinasFinal;
};

export default handleOficinasStatus;
