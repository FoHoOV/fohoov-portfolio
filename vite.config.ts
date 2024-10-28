import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	optimizeDeps: {
		esbuildOptions: {
			// TODO: remove
			supported: {
				'top-level-await': true
			}
		}
	},
	esbuild: {
		supported: {
			// TODO: remove
			'top-level-await': true
		}
	},
	ssr: {
		noExternal: ['gsap', '@gsap/shockingly', 'three']
	}
});
