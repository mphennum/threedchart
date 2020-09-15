import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'dist/index.js',
			format: 'cjs',
			exports: 'auto',
		},
		{
			file: 'dist/threedchart.min.js',
			format: 'iife',
			name: 'threedchart',
			compact: true,
			plugins: [ terser() ],
		},
		{
			file: 'dist/threedchart.js',
			format: 'iife',
			name: 'threedchart',
		},
	],
	plugins: [
		babel({ babelHelpers: 'bundled' }),
		nodeResolve(),
	],
};
