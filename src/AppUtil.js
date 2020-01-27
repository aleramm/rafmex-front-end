import { isEmptyObject } from 'util/Validators';
import moment from 'moment';
import initialMenu from 'constants/Menu';

const handleNewClaveEmpresa = clave => {
	return clave.padStart(4, '0').padEnd(12, '0');
};

export const parseSucursal = (claveSucursal, descripcionSucursal) => {
	return {
		value: claveSucursal,
		label: `${claveSucursal}-${descripcionSucursal}`,
	};
};
export const parseSucursales = sucursales => {
	if (sucursales.length === 0) {
		return [];
	}
	return sucursales
		.map(sucursal => {
			return {
				value: sucursal.idOficina,
				label: `${sucursal.idOficina}-${sucursal.nombre}`,
				nombre: sucursal.nombre,
			};
		})
		.sort((a, b) => a.value - b.value);
};
export const getParamsObject = params => {
	if (!params.search) {
		return;
	}

	const parsedUrl = new URL(params);
	let newClaveEmpresa = null;
	let newCveUsuario = null;

	if (parsedUrl.searchParams.get('claveEmpresa').length === 1) {
		newClaveEmpresa = handleNewClaveEmpresa(parsedUrl.searchParams.get('claveEmpresa'));
	}
	if (parsedUrl.searchParams.get('claveEmpresa') === '18') {
		newClaveEmpresa = '000100000004';
	}
	if (parsedUrl.searchParams.get('cveUsuario').length !== 12) {
		newCveUsuario = parsedUrl.searchParams.get('cveUsuario').padStart(12, '0');
	}
	return {
		claveEmpresa: newClaveEmpresa || parsedUrl.searchParams.get('claveEmpresa'),
		idOperador: newCveUsuario || parsedUrl.searchParams.get('cveUsuario'),
		idOficina: Number(parsedUrl.searchParams.get('oficina')),
		fechaOperacion: moment(new Date()).format('YYYY-MM-DD'),
	};
};
export const getProfile = profile => {
	if (!isEmptyObject(profile)) {
		return;
	}

	return {
		...profile,
	};
};
export const parseExitstMenu = pathname => {
	return initialMenu.find(menu => menu.path === pathname);
};
export const hasFacultyOperaciones = facultades => {
	return facultades.filter(facultad => facultad.codigoFacultad === 'OPERAFAC000');
};
export const handleCompareFaculties = (codigoFacultad, usuarioFacultades) => {
	return usuarioFacultades.filter(menu => menu.codigoFacultad === codigoFacultad);
};
