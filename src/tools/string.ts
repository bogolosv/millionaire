import Type from './type';

export default {
	isNullOrEmpty: (value: unknown) => {
		if (Type.isNullOrUndefined(value)) {
			return true;
		}

		// @ts-ignore
		return value.toString().trim().length === 0;
	},
};
