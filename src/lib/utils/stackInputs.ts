import type { Input, Stack } from '$lib/types';

const stackInputs = (input: Input, uiExpanded: boolean | null) => {
	const stack: Stack[] = [];
	addToStack(input, stack, uiExpanded);
	return stack;
};

const addToStack = (ing: Input, stack: Stack[], uiExpanded: boolean | null) => {
	const { step_id, identifier, requiredBuildings, amount, tier, ingredients, using_recipe } = ing;
	const visible: boolean = !!uiExpanded;
	stack.push({
		step_id,
		identifier,
		requiredBuildings,
		amount,
		usedRecipe: using_recipe,
		tier,
		isShown: visible ? true : tier <= 2,
		isExpanded: visible ? true : tier == 1,
		isLowestTier: !ingredients?.length
	});

	if (ingredients) {
		ingredients.map((ing) => {
			addToStack(ing, stack, uiExpanded);
		});
	}
};

export default stackInputs;
