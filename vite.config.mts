import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';
import path from 'node:path';

export default defineConfig({
	root: 'src/',
	base: '/systems/blood-and-doom/',
	publicDir: path.resolve(__dirname, 'public'),
	server: {
		port: 30001,
		open: true,
		proxy: {
			'^/systems/blood-and-doom/(assets|style.css)': 'http://localhost:30000',
			'^(?!/systems/blood-and-doom)': 'http://localhost:30000',
			'/socket.io': {
				target: 'ws://localhost:30000',
				ws: true,
			},
		},
	},
	build: {
		outDir: path.resolve(__dirname, 'dist'),
		emptyOutDir: true,
		sourcemap: true,
		lib: {
			name: 'Blood and Doom',
			entry: path.resolve(__dirname, 'src/bloodAndDoom.ts'),
			formats: ['es'],
			fileName: 'bloodAndDoom',
		},
	},
	esbuild: {
		keepNames: true,
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				scss: {
					prependData: `@use "src/scss/base/_variables.scss";`,
				},
				typescript: {
					tsconfigFile: './tsconfig.json',
				},
			}),
			onwarn: (warning, handler) => {
				// Suppress `a11y-missing-attribute` for missing href in <a> links.
				// Foundry doesn't follow accessibility rules.
				if (warning.message.includes('<a> element should have an href attribute')) return;
				if (warning.code === 'a11y-click-events-have-key-events') return;

				// eslint-disable-next-line no-console
				console.log(warning);

				// Let Rollup handle all other warnings normally.
				handler?.(warning);
			},
		}),
	],
});
