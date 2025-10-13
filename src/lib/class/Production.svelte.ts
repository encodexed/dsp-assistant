import type { Building } from '$lib/constants/exports';

type BuildingWithRecipe = Building & {
	recipeIdx: number;
	amount: number;
};

type Material = {
	identifier: string;
	amount: number;
};

export class ProductionRow {
	id: string; // Used for Svelte key
	buildings: BuildingWithRecipe[] = $state([]);
	requiredMaterials: Material[] = $derived([]);
	producedMaterials: Material[] = $derived([]);

	constructor() {
		this.id = crypto.randomUUID();
	}
}
