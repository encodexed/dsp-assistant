export type Product = {
	identifier: string;
	amount: number;
};

export type ProductSelection = {
	name: string;
	src: string;
	identifier: string;
};

export type Input = {
	step_id: number;
	identifier: string;
	requiredBuildings: InputBuilding | null;
	amount: number;
	using_recipe: number | null;
	tier: number;
	ingredients?: Input[];
};

export type Stack = {
	step_id: number;
	identifier: string;
	requiredBuildings: InputBuilding | null;
	amount: number;
	usedRecipe: number | null;
	tier: number;
	isShown: boolean;
	isExpanded: boolean;
	isLowestTier: boolean;
};

export type InputStore = {
	data: Input | undefined;
	ui: Stack[] | null;
	uiExpanded: boolean | null;
	recipeAlterations: RecipeAlteration[];
	isPrecise: boolean;
	totals: Record<string, number>;
	surplus: Record<string, number>;
};

export type RecipeAlteration = {
	stepId: number;
	useRecipe: number;
};

export type BuildingSelection = {
	smelters: string;
	assemblers: string;
	miners: string;
	plants: string;
	labs: string;
};

export type InputBuilding = {
	identifier: string;
	product: string;
	amountRequired: number;
	powerUsageKW: number;
};

// From JSON constants
export type Component = {
	id: number;
	name: string;
	from_recipes: number[];
	src: string;
};

export type Recipe = {
	id: number;
	src: string;
	description: string;
	produced_by: string;
	ingredients: Product[];
	products: Product[];
	base_time_secs: number;
};

export type Building = {
	id: number;
	name: string;
	speed_multiplier: number;
	from_recipes: number[];
	power_usage_kW: number | null;
	src: string;
};
