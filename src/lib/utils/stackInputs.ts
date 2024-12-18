import type { Input, Stack } from '$lib/types';

const stackInputs = (input: Input) => {
	const stack: Stack[] = [];
	addToStack(input, stack);
	console.log(stack);
	return stack;
};

const addToStack = (ing: Input, stack: Stack[]) => {
	const { identifier, requiredBuildings, amount, tier, ingredients } = ing;
	stack.push({
		identifier,
		requiredBuildings,
		amount,
		tier,
		isShown: true,
		isExpanded: true
	});

	if (ingredients) {
		ingredients.map((ing) => {
			addToStack(ing, stack);
		});
	}
};

export default stackInputs;