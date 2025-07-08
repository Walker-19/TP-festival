class StringUtilsService {
	// raccourcir un texte
	public getTextOverflow = (value: string, limit: number = 10) => {
		if (value) {
			return value.length > limit ? `${value.substring(0, limit)}…` : value;
		}
	};
}

export default StringUtilsService;
