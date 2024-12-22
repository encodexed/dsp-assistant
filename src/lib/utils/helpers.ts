import type { BuildingSelection, Input, InputBuilding } from '$lib/types';
import { getData } from './calculateSteps';

export const getQuickName = (identifier: string) => {
	return getData(identifier).name;
};

export const getIconSrc = (identifier: string) => {
	return getData(identifier).src;
};

export const round2DP = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

export const formatPower = (power: number): string => {
	const digits = Math.ceil(power).toString().length;
	if (digits <= 3) return round2DP(power) + ' KW';
	if (digits <= 6) return round2DP(power / 1000) + ' MW';
	return round2DP(power / 100000) + ' GW';
};
