import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { currencyNumberToString } from 'util/Formatters';

const SimpleLabel = ({
	fullWidth = false,
	title,
	content,
	toDate = false,
	toCurrency = false,
	primary,
	simpleLabelstyle = {},
	labelStyle = {},
	contentStyle = {},
	className,
}) => {
	const style = {
		simpleLabel: {
			backgroundColor: '#ececec',
			padding: '0.2188rem 0.625rem',
			borderStyle: 'solid',
			borderWidth: '1px',
			borderColor: '#9b9b9b',
			borderRadius: '3px',
			minHeight: '48px',
		},
		simpleLabelTitle: {
			display: 'block',
			color: '#767676',
			fontSize: '0.75rem',
			marginBottom: '6px',
			fontWeight: 500,
		},
		simpleLabelContent: {
			fontSize: '1rem',
			margin: 0,
			color: '#444353',
			padding: 0,
			fontWeight: 400,
		},
	};
	const display = (fullWidth && { display: 'block' }) || { display: 'inline-block' };
	const dataCurrency =
		(typeof content !== 'undefined' && toCurrency && currencyNumberToString(content)) ||
		currencyNumberToString('0');
	const dataDateCurrency =
		(typeof content !== 'undefined' &&
			toDate &&
			(moment(content).isValid() && moment(content).format('DD/MM/YYYY'))) ||
		'Fecha no disponible';
	const dataString =
		(typeof content !== 'undefined' && !toDate && !toCurrency && String(content)) ||
		'No disponible';
	const colorTitle = (primary && { color: '#233A79' }) || { color: '#767676' };
	const colorLabel = (primary && { color: '#233A79' }) || { color: '#444353' };
	const borderColor = (primary && { borderColor: '#233A79' }) || {
		borderColor: '#9b9b9b',
	};
	const newContent = (toCurrency && dataCurrency) || (toDate && dataDateCurrency) || dataString;

	return (
		<div
			className={className}
			style={{
				...style.simpleLabel,
				...display,
				...borderColor,
				...colorLabel,
				...simpleLabelstyle,
			}}
		>
			<span style={{ ...style.simpleLabelTitle, ...colorTitle, ...labelStyle }}>{title}</span>
			<p style={{ ...style.simpleLabelContent, ...contentStyle }}>{newContent}</p>
		</div>
	);
};
SimpleLabel.propTypes = {
	fullWidth: PropTypes.bool,
	title: PropTypes.string,
	content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	toDate: PropTypes.bool,
	toCurrency: PropTypes.bool,
	primary: PropTypes.bool,
	simpleLabelstyle: PropTypes.object,
	labelStyle: PropTypes.object,
	contentStyle: PropTypes.object,
};
export default SimpleLabel;
