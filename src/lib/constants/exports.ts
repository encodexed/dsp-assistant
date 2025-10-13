import type { Product } from '$lib/types';
import buildingsData from './buildings.json';
import componentsData from './components.json';
import recipesData from './recipes.json';

export interface Component {
	id: number;
	name: string;
	from_recipes: number[];
	src: string;
}

export interface Recipe {
	id: number;
	src: string;
	description: string;
	produced_by: string;
	ingredients: Product[];
	products: Product[];
	base_time_secs: number;
}

export interface Building {
	id: number;
	name: string;
	speed_multiplier: number;
	from_recipes: number[];
	available_recipes: number[];
	power_usage_kW: number | null;
	src: string;
}

export const buildings: Building[] = buildingsData.data;
export const components: Component[] = componentsData.data;
export const recipes: Recipe[] = recipesData.data;
