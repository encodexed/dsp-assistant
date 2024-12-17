import type { Product, Building, Recipe, Component, Input, InputBuilding } from '$lib/types';
import components from '$lib/constants/components.json';
import buildings from '$lib/constants/buildings.json';
import recipes from '$lib/constants/recipes.json';
import { error } from '@sveltejs/kit';
import { buildingSelections } from './state.svelte';

const calculateSteps = (target: Product): Input => {
	return getIngredients(target, target.amount, 1);
};

const getIngredients = (target: Product, cumulativeAmt: number, tier: number): Input => {
	const { identifier } = target;
	const rid = getData(identifier).from_recipes[0];
	if (rid !== undefined) {
		const rd: Recipe = recipes.data[rid];
		return {
			identifier,
			requiredBuildings: getRequiredBuildings(identifier, cumulativeAmt, rd),
			amount: cumulativeAmt,
			using_recipe: rid,
			tier,
			ingredients: cascade(rd, cumulativeAmt, tier)
		};
	} else {
		return {
			identifier,
			requiredBuildings: null,
			amount: cumulativeAmt,
			using_recipe: null,
			tier,
			ingredients: []
		};
	}
};

const cascade = (rd: Recipe, amt: number, tier: number): Input[] => {
	const map = rd.ingredients.map((ing) => {
		return getIngredients(ing, amt * ing.amount, tier + 1);
	});
	return map;
};

export const getData = (identifier: string): Building | Component => {
	const id = parseInt(identifier.substring(1));
	if (identifier.includes('c')) return components.data[id];
	else if (identifier.includes('b')) return buildings.data[id];
	throw error(500, 'Invalid type encountered');
};

const getRequiredBuildings = (
	identifier: string,
	amount: number,
	recipe: Recipe
): InputBuilding => {
	const { produced_by, products, base_time_secs } = recipe;
	// The amount of items produced each time this recipe completes
	const outputAmount = products.find((item) => item.identifier === identifier)?.amount || 1;
	const productionBuildingId = getProductionBuilding(produced_by);
	const bdata = getData(productionBuildingId) as Building;
	// How many times the recipe will be completed per minute
	const actionsPerMin = 60 / (base_time_secs / bdata.speed_multiplier);
	return {
		identifier: productionBuildingId,
		product: identifier,
		amountRequired: amount / (outputAmount * actionsPerMin),
		powerUsageKW: bdata.power_usage_kW || 0
	};
};

const getProductionBuilding = (building: string): string => {
	switch (building) {
		case 'smelters':
		case 'assemblers':
		case 'miners':
		case 'plants':
		case 'labs':
			return buildingSelections[building];
		default:
			return building;
	}
};

export default calculateSteps;
