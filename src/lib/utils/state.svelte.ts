import type { BuildingSelection, InputStore } from '$lib/types';

export const inputStore = $state<InputStore>({
	data: undefined,
	ui: null,
	isPrecise: false
});

export const buildingSelections = $state<BuildingSelection>({
	assemblers: 'b1'
});
