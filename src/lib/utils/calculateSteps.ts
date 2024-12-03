import type { Output, Product, Building, Recipe, Component, Input } from '$lib/types';
import components from '$lib/constants/components.json';
import buildings from '$lib/constants/buildings.json';
import recipes from '$lib/constants/recipes.json';
import { error } from '@sveltejs/kit';

const calculateSteps = (targets: Output) => {
	return getIngredients(targets.products[0], targets.products[0].amount, 1);
};

// TODO: Only using the first recipe right now, need to add a choice later

const getIngredients = (target: Product, cumulativeAmt: number, tier: number): Input => {
	const { type, id, amount } = target;
	const rid = getData(type, id).from_recipes[0] || null;
	if (rid) {
		const rd = recipes.data[rid];
		const cascade: Input[] = rd.ingredients.map((ing) => {
			const newAmt = amount * ing.amount;
			return getIngredients(ing, newAmt, tier + 1);
		});
		return {
			type,
			id,
			amount: amount * cumulativeAmt,
			using_recipe: rid,
			tier,
			ingredients: cascade
		};
	} else {
		return {
			type,
			id,
			amount: amount * cumulativeAmt,
			using_recipe: null,
			tier,
			ingredients: []
		};
	}
};

const getData = (type: string, id: number): Building | Component => {
	if (type === 'component') return components.data[id];
	else if (type === 'building') return buildings.data[id];
	throw error(500, 'Invalid type encountered');
};

export default calculateSteps;
