/* globals process */

import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import commonjs from 'rollup-plugin-commonjs';
import obfuscatorPlugin from 'rollup-plugin-javascript-obfuscator';

const environment = process.env.ENV || 'development';
const isDevelopmentEnv = (environment === 'development');

module.exports = [
	{
		input: 'src/lib/bin/start.ts',
		output: {
			format: 'cjs',
			sourcemap: false,
			file: `dist/${require('./package.json').name}-v${require('./package.json').version}.js`,
		},
		external: [ 'fs', 'node-schedule', 'node-fetch', 'pouchdb' ],
		plugins: [
			typescript({
        tsconfig: "rollup.tsconfig.json",
				tsconfigOverride: {
					compilerOptions: { declaration: false }
				},
			}),
			!isDevelopmentEnv && terser(),
			!isDevelopmentEnv && obfuscatorPlugin({
				compact: true,
				controlFlowFlattening: true,
				controlFlowFlatteningThreshold: 0.75,
				debugProtection: false,
				debugProtectionInterval: false,
				disableConsoleOutput: true,
				identifierNamesGenerator: 'hexadecimal',
				log: false,
				renameGlobals: false,
				rotateStringArray: true,
				selfDefending: true,
				stringArray: true,
				stringArrayEncoding: 'base64',
				stringArrayThreshold: 0.75,
				transformObjectKeys: true,
				unicodeEscapeSequence: false
			}),
			commonjs()
		],
	}
];
