import type {
	Product,
	Building,
	Recipe,
	Component,
	Input,
	InputBuilding,
	RecipeAlteration
} from '$lib/types';
import components from '$lib/constants/components.json';
import buildings from '$lib/constants/buildings.json';
import recipes from '$lib/constants/recipes.json';
import { error } from '@sveltejs/kit';
import { buildingSelections } from './state.svelte';

let step_id = -1;
const incrementStepId = (): number => ++step_id;
const resetStepId = (): number => (step_id = -1);

const calculateSteps = (target: Product, alts: RecipeAlteration[]): Input => {
	const stepsAltered: number[] = alts.map((alt) => alt.stepId);
	const changes: number[] = alts.map((alt) => alt.useRecipe);
	const ings = getIngredients(target, target.amount, 1, stepsAltered, changes);
	resetStepId();
	return ings;
};

const getIngredients = (
	target: Product,
	cumulativeAmt: number,
	tier: number,
	alts: number[],
	changes: number[]
): Input => {
	let recipeId = 0;
	const stepIndex = alts.findIndex((alt) => alt === step_id + 1);
	if (stepIndex >= 0) {
		recipeId = changes[stepIndex];
	}
	const { identifier } = target;
	const rid = getData(identifier).from_recipes[recipeId];
	if (rid !== undefined) {
		const rd: Recipe = recipes.data[rid];
		return {
			step_id: incrementStepId(),
			identifier,
			requiredBuildings: getRequiredBuildings(identifier, cumulativeAmt, rd),
			amount: cumulativeAmt,
			using_recipe: rid,
			tier,
			ingredients: cascade(identifier, rd, cumulativeAmt, tier, alts, changes)
		};
	} else {
		return {
			step_id: incrementStepId(),
			identifier,
			requiredBuildings: null,
			amount: cumulativeAmt,
			using_recipe: null,
			tier,
			ingredients: []
		};
	}
};

const cascade = (
	targetId: string,
	rd: Recipe,
	amt: number,
	tier: number,
	alts: number[],
	changes: number[]
): Input[] => {
	const itemsPerRecipeUse = rd.products.find((p) => p.identifier === targetId)?.amount || 0;
	const amount = amt / itemsPerRecipeUse;
	const map = rd.ingredients.map((ing) => {
		return getIngredients(ing, amount * ing.amount, tier + 1, alts, changes);
	});
	return map;
};

export const getData = (identifier: string): Building | Component => {
	const id = parseInt(identifier.substring(1));
	if (identifier.includes('c')) return components.data[id];
	else if (identifier.includes('b')) return buildings.data[id];
	console.error('Tried to get invalid identifier: ', identifier);
	throw error(500, 'Invalid type encountered');
};

const getRequiredBuildings = (
	identifier: string,
	amount: number,
	recipe: Recipe
): InputBuilding => {
	const { produced_by, products, base_time_secs } = recipe;
	if (!produced_by)
		return {
			identifier: 'b52',
			product: identifier,
			amountRequired: 1,
			powerUsageKW: 0
		};
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
