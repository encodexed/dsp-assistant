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
	identifier: string;
	requiredBuildings: InputBuilding[];
	amount: number;
	using_recipe: number | null;
	tier: number;
	ingredients?: Input[];
};

export type BuildingSelection = {
	assembers: string;
};

export type InputBuilding = {
	identifier: string;
	product: string;
	amountRequired: number;
	powerUsageKW: number;
};

export type ButtonAction = {
	icon: string;
	text: string;
	type: 'primary' | 'secondary' | 'warning' | 'danger';
	handler: (e: Event) => void;
};

// From JSON constants
export type Component = {
	id: number;
	name: string;
	from_recipes: number[];
	in_recipes: number[];
	src: string;
};

export type Recipe = {
	id: number;
	description: string;
	produced_by: number[];
	ingredients: Product[];
	products: Product[];
	base_time_secs: number;
};

export type Building = {
	id: number;
	name: string;
	mark: number;
	speed_multiplier: number;
	from_recipes: number[];
	power_usage_kW: number;
	src: string;
};
