import type { Input } from '$lib/types';

const sortInputs = (input: Input) => {
	const structuredInput = structureInput(input);
	console.log({ structuredInput });
	const sortedInput = sortInputByTier(structuredInput);
	console.log({ sortedInput });
	return sortedInput;
};

const structureInput = (input: Input) => {
	const allIngredients: Input[] = [];

	const nextStep = (input: Input) => {
		const { ingredients } = input;
		if (ingredients && ingredients.length) {
			allIngredients.push({ ...input, ingredients: undefined });
			ingredients.forEach((ing) => nextStep(ing));
		} else {
			allIngredients.push({ ...input, ingredients: undefined });
		}
	};

	nextStep(input);
	return allIngredients;
};

const sortInputByTier = (inputs: Input[]) => {
	const sortedInputs: Input[] = [];

	for (let tier = 1; tier <= 12; tier++) {
		for (let i = 0; i < inputs.length; i++) {
			if (inputs[i].tier == tier) {
				sortedInputs.push(inputs[i]);
				inputs.splice(i, 1);
				i--;
			}
			if (!inputs.length) break;
		}
		if (!inputs.length) break;
	}

	return sortedInputs;
};

export default sortInputs;
