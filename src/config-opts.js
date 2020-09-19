export class ConfigOptsError extends Error {

	name = 'ConfigOptsError';

	constructor(msg) {
		super(msg);
	}

}

let configOpts = (optsCfg, opts) => {
	opts = { ...opts };
	for (let k in optsCfg) {
		let opt = opts[k];
		let cfg = optsCfg[k];

		if (typeof cfg === 'function' || cfg instanceof Array) {
			cfg = { type: cfg };
		}

		let {
			type = null,
			default: def,
			required = false,
			validator = null,
			parse = null,
		} = cfg;

		if (type && !(type instanceof Array)) {
			type = [ type ];
		}

		if (def === undefined) {
			def = (type && type[0] === Boolean) ? false : null;
		} else if (typeof def === 'function') {
			def = def();
		}

		if ([ null, undefined ].includes(opt)) {
			if (required) {
				throw new ConfigOptsError(`Missing required option "${ k }"`);
			}

			opt = def;
		}

		if (type) {
			let isNull = (opt === null);
			if (!type.some((t) => ((isNull && t !== Boolean) || (!isNull && opt.constructor === t)))) {
				throw new ConfigOptsError(`Invalid data type for option "${ k }". Expected ${ type.map((t) => (`"${ t.name }"`)).join(', ') }.`);
			}
		}

		if (validator && (def === undefined || opt !== def) && !validator(opt)) {
			throw new ConfigOptsError(`Option "${ k }" failed validation.`);
		}

		if (parse) {
			opt = parse(opt);
		}

		opts[k] = opt;
	}

	return opts;
};

export default configOpts;
