const Type = {
	isNull: (value: unknown) => {
		return value === null;
	},
	isUndefined: (value: unknown) => {
		return typeof value === 'undefined';
	},
	isNullOrUndefined: (value: unknown) => {
		return Type.isNull(value) || Type.isUndefined(value);
	}
};

export default Type;
