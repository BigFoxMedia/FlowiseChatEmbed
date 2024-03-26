import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { babel } from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import typescript from '@rollup/plugin-typescript';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import commonjs from '@rollup/plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
/* import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload"; */

import fs from 'fs';

const extensions = ['.ts', '.tsx'];

const indexConfig = {
	plugins: [
		resolve({ extensions, browser: true }),
		commonjs(),
		uglify(),
		babel({
			babelHelpers: 'bundled',
			exclude: 'node_modules/**',
			presets: ['solid', '@babel/preset-typescript'],
			extensions,
		}),
		postcss({
			plugins: [autoprefixer(), tailwindcss()],
			extract: false,
			modules: false,
			autoModules: false,
			minimize: true,
			inject: false,
		}),
		typescript(),
		typescriptPaths({ preserveExtensions: true }),
		terser({ output: { comments: false } }),
		// If you want to see the live app
		/* serve({
			open: true,
			verbose: true,
			contentBase: ["dist"],
			host: "localhost",
			port: 5678,
		}),
		livereload({ watch: "dist" }), */
	],
};

// Dynamically generate Rollup configurations for each TypeScript file in the src directory
const tsFiles = fs.readdirSync('./src').filter(file => file.endsWith('.ts'));

const configs = tsFiles.map(file => ({
	...indexConfig, // Spread the indexConfig to include its properties here
	input: `src/${file}`,
	output: {
		file: `dist/${file.replace('.ts', '.js')}`,
		format: 'es',
	},
	watch: {
    include: 'src/**',
    exclude: 'node_modules/**'
  }
}));


export default configs;
