import type { BuildingSelection, InputStore, Product } from '$lib/types';

export const outputStore = $state<Product>({
	identifier: 'c100',
	amount: 10
});

export const inputStore = $state<InputStore>({
	data: undefined,
	ui: null,
	uiExpanded: null,
	recipeAlterations: [],
	isPrecise: false,
	totals: {},
	surplus: {}
});

export const buildingSelections = $state<BuildingSelection>({
	smelters: 'b40',
	assemblers: 'b43',
	miners: 'b31',
	plants: 'b37',
	labs: 'b47'
});
