import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		lib: {
			entry: 'src/lib/feedback-form.svelte.js',
			name: 'FeedbackFormSvelte',
		},
		rollupOptions: {
			output: {
				format: 'iife',
			},
		},
	},
});
