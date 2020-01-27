import { toCamelCase, currencyStringToNumber, getDateFormat } from 'util/Formatters';

const handleCsvError = () => {
	console.error('CSV no válido');
};

const getOptions = (headers, content) => {
	const headersLength = headers.length;
	const options = content.slice(0, content.length - 1);
	const validOptions = options
		.slice(options.indexOf('\n') + 1)
		.split('\n')
		.map(entity => entity.split(','));

	if (validOptions.some(item => item.length > headersLength)) {
		handleCsvError();
		return [];
	}

	return validOptions.map(entity => {
		return headers.reduce((obj, title, index) => {
			if (title.type === 'currency') {
				return (obj[title.key] = currencyStringToNumber(entity[index])), obj;
			}
			if (title.type === 'date') {
				return (obj[title.key] = getDateFormat(entity[index])), obj;
			}

			return (obj[title.key] = entity[index]), obj;
		}, {});
	});
};

const getHeaders = headers => {
	return headers.map(header => {
		if (/capital|monto|interes|total/gim.test(toCamelCase(header))) {
			return { label: header, key: toCamelCase(header), type: 'currency' };
		}
		if (/fecha/gim.test(toCamelCase(header))) {
			return { label: header, key: toCamelCase(header), type: 'date' };
		}

		return { label: header, key: toCamelCase(header) };
	});
};

const getInitialHeader = content => {
	return content.slice(0, content.indexOf('\n')).split(',');
};

const handleCsvToJson = async csvContent => {
	const initialHeader = await getInitialHeader(csvContent);
	const headersCsv = await getHeaders(initialHeader);
	const optionsCsv = await getOptions(headersCsv, csvContent);
	return {
		headersCsv,
		optionsCsv,
	};
};

export default handleCsvToJson;
