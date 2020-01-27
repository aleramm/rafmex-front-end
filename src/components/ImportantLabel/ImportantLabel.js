import React from 'react';
import PropTypes from 'prop-types';
import { currencyNumberToString } from 'util/Formatters';
import { isValidNumber } from 'util/Validators';

const ImportantLabel = ({
	fullWidth,
	title,
	content,
	toCurrency,
	labelStyle = {},
	contentStyle = {},
	className = '',
}) => {
	const importantLabelTitle = {
		display: 'block',
		color: '#767676',
		fontSize: '0.75rem',
		marginBottom: '0.3125rem',
		fontWeight: 400,
	};
	const importantLabelContent = {
		color: '#444353',
		fontWeight: '500',
		fontSize: '1.875rem',
	};

	const display = (fullWidth && 'block') || 'inline-block';
	const dataCurrency =
		(toCurrency && isValidNumber(content) && currencyNumberToString(content)) ||
		currencyNumberToString('0');
	const newContent = (toCurrency && dataCurrency) || content;

	return (
		<div className={`label important-label ${className}`} style={{ display }}>
			<h1 style={{ ...importantLabelTitle, labelStyle }}>{title || 'Sin título'}</h1>
			<span style={{ ...importantLabelContent, ...contentStyle }}>{newContent}</span>
		</div>
	);
};
ImportantLabel.propTypes = {
	fullWidth: PropTypes.bool,
	toCurrency: PropTypes.bool,
	title: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ImportantLabel.defaultProps = {
	fullWidth: false,
	toCurrency: false,
	title: 'Sin título',
	content: '...',
};

export default ImportantLabel;
