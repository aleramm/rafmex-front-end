/* eslint-disable no-extra-boolean-cast */
export const findMenu = (mainMenu = [], searchCriterion = '', searchValue = '') => {
	return mainMenu.find(menu => menu[searchCriterion] === searchValue);
};
export const findSubMenuItem = (mainMenu = [], searchCriterion = '', searchValue = '') => {
	return mainMenu
		.map(menu => menu.routes.find(route => route[searchCriterion] === searchValue))
		.find(menuSelected => menuSelected !== undefined);
};
export const findSubmenuItemSelected = (mainMenu, modifierState, key) => {
	const keyCombination = `${modifierState}+${key}`;
	const subMenuSelectedParentIndex = mainMenu.findIndex(item =>
		item.routes.find(route => route.keyCombination === keyCombination)
	);
	const subMenuSelected = mainMenu
		.map(menu => menu.routes.find(route => route.keyCombination === keyCombination))
		.find(menuSelected => menuSelected !== undefined);

	if (Boolean(subMenuSelected)) {
		return { subMenuSelected, subMenuSelectedParentIndex };
	}
	throw new Error(`No existe la combinación ${keyCombination}`);
};
