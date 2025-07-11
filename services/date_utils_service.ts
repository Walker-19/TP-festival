class DateUtilsService {
	public getFullDate = (date: string) => {
		const dateSplit = date.split("-");

		const fullDate = new Intl.DateTimeFormat("fr-FR", {
			dateStyle: "full",
		})
			.format(new Date(date))
			.split(" ");

		return {
			dayName: fullDate[0],
			dayNameShort: fullDate[0].substring(0, 3),
			dayNumber: dateSplit[2],
			month: dateSplit[1],
			monthName: fullDate[2],
			monthNameShort: fullDate[2].substring(0, 3),
			year: fullDate[3],
			yearShort: fullDate[3].substring(2),
		};
	};
	public formatDate(value: string): string {
	const date = new Date(value);
	const month = new Intl.DateTimeFormat("fr-FR", {
		month: "long",
	}).format(date);
	const weekDay = new Intl.DateTimeFormat("fr-Fr", {
		weekday: "long",
	}).format(date);
	const day = new Intl.DateTimeFormat("fr-FR", {
		day: "numeric",
	}).format(date);
	return `${weekDay} ${day} ${month}`;
}
}

export default DateUtilsService;
