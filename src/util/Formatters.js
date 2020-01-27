import moment from 'moment';

export const toNumber = value => {
	return Number(value);
};

export const toCurrency = value => {
	return value.toLocaleString('es-MX');
};

export const currencyStringToNumber = value => {
	const fromString = value.toString();
	return parseFloat(fromString.replace(/[^0-9\.]+/g, ''));
};

export const currencyNumberToString = value => {
	const fromString = value.toString();
	if (typeof Number(fromString) === 'number' && Number.isFinite(Number(fromString))) {
		return `$\n${parseFloat(fromString.replace(/[^0-9\.]+/g, '')).toLocaleString('es-MX')}`;
	}
};
export const stringToPercentage = value => {
	const fromString = value.toString();
	if (typeof Number(fromString) === 'number' && Number.isFinite(Number(fromString))) {
		return `% ${fromString}`;
	}
};
export const toCamelCase = word => {
	return word
		.replace(/\./g, '')
		.toLowerCase()
		.replace(/\s(.)/g, $1 => {
			return $1.toUpperCase();
		})
		.replace(/\s/g, '')
		.replace(/^(.)/, $1 => {
			return $1.toLowerCase();
		})
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
};

export const getDateFormat = (value, format = '') => {
	let newValue = '';
	const validFormat = [
		'DD-MM-YYYY',
		'DD-MM-YY',
		'DD/MM/YYYY',
		'DD/MM/YY',
		'YY-MM-DD',
		'YY/MM/DD',
		'YYYY/MM/DD',
		'YYYY-MM-DD',
		'YYYY/MMM/DD',
		'YYYY-MMM-DD',
	];

	if (!value) {
		newValue = 'Sin fecha';
	}
	switch (typeof value) {
		case 'object':
			newValue = moment(value).format(format || 'DD/MM/YYYY');
			break;

		case 'string':
			newValue =
				moment(value, validFormat, true).isValid() &&
				moment(value, validFormat, true).format(format || 'DD/MM/YYYY');
			break;

		default:
			newValue = moment(value).format(format || 'DD/MM/YYYY');
			break;
	}

	if (!moment(value, validFormat, true).isValid()) {
		newValue = 'Fecha no válida';
	}

	return newValue;
};
export const setDateFormat = fecha => {
	let fechaFormat;
	if (fecha === null) {
		fechaFormat = '';
	} else {
		fechaFormat = moment(fecha).format('YYYY-MM-DD');
	}
	return fechaFormat;
};
export const getContentFormat = (content, { type = '', format = '' }) => {
	let newValue = '';
	if (type && type === 'date') {
		newValue = getDateFormat(content, format);
	}
	if (type && type === 'currency') {
		newValue = currencyNumberToString(content);
	}
	if (type && type === 'percentage') {
		const fromString = content.toString();
		newValue = `${fromString}%`;
	}
	if (!type) {
		newValue = content;
	}
	return newValue;
};
