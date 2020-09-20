import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const NAMESPACE = 'Threedchart';
const FILENAME = 'threedchart';
const PROD = (process.env.BUILD === 'production');

let output = [
	{
		file: 'dist/threedchart.js',
		format: 'iife',
		name: NAMESPACE,
	},
];

if (PROD) {
	output = [
		...output,
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
	];
}

export default {
	input: 'src/threedchart.js',
	output,
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		nodeResolve(),
	],
};
