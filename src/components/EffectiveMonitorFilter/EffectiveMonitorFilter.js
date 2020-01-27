import React, { Component } from 'react';
import { Radio, FormControl, RadioGroup, FormControlLabel } from '@material-ui/core';

const filterDanger = (
	<span className="em-filter-type">
		<span className="em-filter-type-color alert-amount" />
		<span className="em-filter-type-name uppercase">Inmediato</span>
	</span>
);
const filterWarning = (
	<span className="em-filter-type">
		<span className="em-filter-type-color warning-amount" />
		<span className="em-filter-type-name uppercase">Pronto</span>
	</span>
);
const filterSafe = (
	<span className="em-filter-type">
		<span className="em-filter-type-color safe-amount" />
		<span className="em-filter-type-name uppercase">No necesario</span>
	</span>
);

class EffectiveMonitorFilter extends Component {
	state = {
		filterEffectiveMonitorValue: null,
		style: {},
	};
	direction = 'initial';
	componentDidMount = () => {
		const { direction } = this.props;
		this.setState({
			style: {
				lineHeight: 0,
				flexDirection: (direction && direction) || 'initial',
			},
		});
	};

	handleChange = e => {
		this.props.onChangeBoxCut(e.target.value);
	};

	render() {
		const { filterEffectiveMonitorValue } = this.state;
		return (
			<div className="em-filter-container">
				<h4 className="em-filter-sucursal">Tipo de corte</h4>
				<FormControl className="ef-form">
					<RadioGroup
						aria-label="Filtro monitor effectivo"
						name="type"
						value={filterEffectiveMonitorValue}
						onChange={this.handleChange}
						style={this.state.style}
					>
						<FormControlLabel
							style={{ padding: 0 }}
							value="danger"
							control={<Radio />}
							label={filterDanger}
							className="em-filter-radio"
						/>
						<FormControlLabel
							value="warning"
							control={<Radio />}
							label={filterWarning}
							className="em-filter-radio"
						/>
						<FormControlLabel
							value="safe"
							control={<Radio />}
							label={filterSafe}
							className="em-filter-radio"
						/>
					</RadioGroup>
				</FormControl>
			</div>
		);
	}
}

export default EffectiveMonitorFilter;
