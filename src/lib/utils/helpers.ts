import type { BuildingSelection, Input, InputBuilding } from '$lib/types';
import { getData } from './calculateSteps';

export const getQuickName = (identifier: string) => {
	return getData(identifier).name;
};

export const getIconSrc = (identifier: string) => {
	return getData(identifier).src;
};

export const round2DP = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;
