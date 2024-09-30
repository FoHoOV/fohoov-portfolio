import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="sunset"]'],
	plugins: [typography(), daisyui],
	daisyui: {
		themes: ['sunset', 'light'],
		defaultTheme: 'sunset',
		logs: false
	},
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens
		}
	}
};
