import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const NumberFormatCustom = props => {
	const { inputRef, name, onChange, ...other } = props;
	return (
		<NumberFormat
			{...other}
			allowEmptyFormatting={false}
			getInputRef={inputRef}
			onValueChange={values => {
				onChange({
					target: {
						value: values.value,
						name,
					},
				});
			}}
			thousandSeparator
			allowNegative={false}
			decimalScale={2}
		/>
	);
};

NumberFormatCustom.propTypes = {
	inputRef: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default NumberFormatCustom;
