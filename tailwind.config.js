import daisyui from 'daisyui';
import typography from '@tailwindcss/typography';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: ['class', '[data-theme="sunset"]'],
	plugins: [typography(), daisyui],
	daisyui: {
		themes: ['sunset', 'light'],
		defaultTheme: 'sunset'
	},
	theme: {
		screens: {
			xs: '475px',
			...defaultTheme.screens
		},
		animation: {
			wiggle: 'wiggle 1s ease-in-out infinite'
		},
		keyframes: {
			wiggle: {
				'0%, 100%': { transform: 'rotate(-3deg)' },
				'50%': { transform: 'rotate(3deg)' }
			}
		}
	}
};
