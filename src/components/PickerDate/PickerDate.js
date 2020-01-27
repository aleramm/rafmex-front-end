import React from 'react';
import { IconButton, InputAdornment } from '@material-ui/core';
import { CalendarTodayRounded } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import 'moment/locale/es';

const PickerDate = ({
	autoOk,
	clearable,
	value,
	onChange,
	format = 'DD/MM/YYYY',
	label,
	showTodayButton,
	keyboard,
	name,
	minDate,
	maxDate,
	style,
	className,
	disabled,
	autoFocus,
	helperText,
}) => {
	return (
		<DatePicker
			value={value}
			clearable={clearable}
			autoOk={autoOk}
			label={label && label}
			format={format}
			keyboard={keyboard}
			onChange={e => onChange({ target: { name, value: e } })}
			showTodayButton={showTodayButton}
			mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/] || []}
			minDate={minDate}
			maxDate={maxDate}
			className={className}
			disabled={disabled}
			style={style}
			autoFocus={autoFocus}
			helperText={helperText}
			InputProps={{
				endAdornment: (
					<InputAdornment>
						<IconButton>
							<CalendarTodayRounded color="primary" />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};

export default PickerDate;
