import React from 'react';
import Portal from '@material-ui/core/Portal';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Progress.css';

const Progress = ({ requestProgress }) => {
	const {
		show = false,
		message = 'Procesando solicitud. Espere un momento...',
		transparency = 0.85,
	} = requestProgress;
	const displayStyle = (show && 'flex') || 'none';

	return (
		<Portal>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className="progress"
				id="progressBar"
				style={{
					display: displayStyle,
					backgroundColor: `rgba(255,255,255,${transparency})`,
				}}
			>
				<Grid item>
					<CircularProgress size={50} />
					<h2>{message}</h2>
				</Grid>
			</Grid>
		</Portal>
	);
};

export default Progress;
