import type { Output, Product, Building, Recipe, Component, Input } from '$lib/types';
import components from '$lib/constants/components.json';
import buildings from '$lib/constants/buildings.json';
import recipes from '$lib/constants/recipes.json';
import { error } from '@sveltejs/kit';

const calculateSteps = (targets: Output) => {
	return getIngredients(targets.product, targets.product.amount, 1);
};

const getIngredients = (target: Product, cumulativeAmt: number, tier: number): Input => {
	const { identifier } = target;
	let rid = getData(identifier).from_recipes[0];
	if (rid != undefined) {
		const rd = recipes.data[rid];
		const cascade: Input[] = rd.ingredients.map((ing) => {
			return getIngredients(ing, cumulativeAmt * ing.amount, tier + 1);
		});
		return {
			identifier,
			amount: cumulativeAmt,
			using_recipe: rid,
			tier,
			ingredients: cascade
		};
	} else {
		return {
			identifier,
			amount: cumulativeAmt,
			using_recipe: null,
			tier,
			ingredients: []
		};
	}
};

export const getData = (identifier: string): Building | Component => {
	const id = parseInt(identifier.substring(1));
	if (identifier.includes('c')) return components.data[id];
	else if (identifier.includes('b')) return buildings.data[id];
	throw error(500, 'Invalid type encountered');
};

export default calculateSteps;
