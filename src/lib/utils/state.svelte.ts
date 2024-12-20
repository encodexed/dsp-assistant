import type { BuildingSelection, InputStore } from '$lib/types';

export const inputStore = $state<InputStore>({
	data: undefined,
	ui: null,
	uiExpanded: null,
	recipeAlterations: [],
	isPrecise: false
});

export const buildingSelections = $state<BuildingSelection>({
	smelters: 'b40',
	assemblers: 'b43',
	miners: 'b31',
	plants: 'b37',
	labs: 'b47'
});
