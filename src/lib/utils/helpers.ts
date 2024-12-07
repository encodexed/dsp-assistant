import { getData } from './calculateSteps';

export const getQuickName = (identifier: string) => {
	return getData(identifier).name;
};
