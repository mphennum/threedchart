export const CHARTS = {
	bar: null,
	line: null,
	pie: null,
	scatter: null,
};

class Chart {

	// opts
	title;
	xLabel;
	yLabel;
	xPrefix;
	yPrefix;
	xSuffix;
	ySuffix;
	data;

	nodes = [ ];
	items = [ ];

	constructor() {

	}

	static factory(opts = { }) {
		let { type } = opts;
		if (!CHARTS[type]) {
			throw new Error(`Invalid chart type "${ type }"`);
		}

		delete opts.type;
		return CHARTS[type](opts);
	}

}

export default Chart;
