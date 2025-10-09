import buildingsData from './buildings.json';

export interface Building {
	id: number;
	name: string;
	speed_multiplier: number;
	from_recipes: number[];
	power_usage_kW: number | null;
	src: string;
}

export const buildings: Building[] = buildingsData.data;
