import type { Product, Recipe, Stack } from '$lib/types';
import recipes from '$lib/constants/recipes.json';

const tallyProductStats = (inputs: Stack[]) => {
	const surplus: Record<string, number> = {};
	const totals: Record<string, number> = {};

	inputs.forEach((i) => {
		// If the item was manually mined or collected from the dark fog
		if (!i.usedRecipe) {
			const mod: Product = {
				identifier: i.identifier,
				amount: i.amount
			};
			modifySurplus(mod, surplus);
			modifyTotals(mod, totals);
			return;
		}

		const rd: Recipe = recipes.data[i.usedRecipe];
		if (rd.products.length) {
			const made = rd.products.findIndex((ing) => ing.identifier === i.identifier);
			const timesRecipeUsed = i.amount / rd.products[made].amount;
			rd.products.forEach((product) => {
				const mod: Product = {
					identifier: product.identifier,
					amount: product.amount * timesRecipeUsed
				};
				modifySurplus(mod, surplus);
				modifyTotals(mod, totals);
			});

			rd.ingredients.forEach((ing) => {
				const mod: Product = {
					identifier: ing.identifier,
					amount: ing.amount * timesRecipeUsed * -1
				};
				modifySurplus(mod, surplus);
			});
		}
	});

	return {
		surplus,
		totals
	};
};

const modifySurplus = (mod: Product, surplus: Record<string, number>) => {
	const { identifier, amount } = mod;
	if (!surplus[identifier]) return (surplus[identifier] = amount);

	const newAmount = surplus[identifier] + amount;
	if (!newAmount) delete surplus[identifier];
	else surplus[identifier] = newAmount;
};

const modifyTotals = (mod: Product, totals: Record<string, number>) => {
	const { identifier, amount } = mod;
	if (!totals[identifier]) return (totals[identifier] = amount);
	else totals[identifier] += amount;
};

export default tallyProductStats;
