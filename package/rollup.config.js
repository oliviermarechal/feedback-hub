import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import postcss from 'rollup-plugin-postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import preprocess from 'svelte-preprocess';
import replace from 'rollup-plugin-replace';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.ts',
    output: [
        {
            sourcemap: true,
            format: 'iife',
            file: 'dist/bundle.js',
            name: 'feedbackHubSDK'
        },
        {
            sourcemap: true,
            format: 'es',
            file: 'dist/bundle.esm.js',
        }
    ],
    plugins: [
        typescript({ tsconfig: './tsconfig.json' }),
        replace({
            'process.env.NODE_ENV': JSON.stringify(production ? 'production' : 'development'),
        }),
        svelte({
            preprocess: preprocess({
                typescript: {
                    tsconfigFile: './tsconfig.json',
                },
            }),
            compilerOptions: {
                dev: !production,
            },
        }),
        postcss({
            extract: 'bundle.css',
            plugins: [tailwindcss, autoprefixer],
            minimize: production, // Active la minification en mode production
        }),
        resolve({
            browser: true,
            dedupe: ['svelte'],
            mainFields: ['svelte']
        }),
        commonjs(),
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};