import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const NAMESPACE = 'Threedchart';
const FILENAME = 'threedchart';
const PROD = (process.env.BUILD === 'production');

export default {
	input: 'src/threedchart.js',
	output: [
		{
			file: 'dist/threedchart.js',
			format: 'iife',
			name: NAMESPACE,
			globals: PROD ? null : {
				'three': 'THREE',
			},
		},
		...(PROD ? [
			{
				file: 'dist/index.js',
				format: 'cjs',
				exports: 'auto',
			},
			{
				file: 'dist/threedchart.min.js',
				format: 'iife',
				name: NAMESPACE,
				compact: true,
				plugins: [ terser() ],
			},
		] : [ ]),
	],
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		nodeResolve(),
	],
	external: PROD ? null : [
		'three',
		// /node_modules/,
	],
};
