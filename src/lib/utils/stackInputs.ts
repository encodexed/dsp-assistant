import type { Input, Stack } from '$lib/types';

const stackInputs = (input: Input, uiExpanded: boolean | null) => {
	const stack: Stack[] = [];
	addToStack(input, stack, uiExpanded);
	console.log(stack);
	return stack;
};

const addToStack = (ing: Input, stack: Stack[], uiExpanded: boolean | null) => {
	const { identifier, requiredBuildings, amount, tier, ingredients } = ing;
	const visible: boolean = !!uiExpanded;
	stack.push({
		identifier,
		requiredBuildings,
		amount,
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
