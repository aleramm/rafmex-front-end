import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberPhone = props => {
	const { inputRef, format, mask, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			allowEmptyFormatting={false}
			getInputRef={inputRef}
			format={format}
			mask={mask}
			onValueChange={values => {
				onChange({
					target: {
						value: values.value,
					},
				});
			}}
		/>
	);
};

NumberPhone.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default NumberPhone;
