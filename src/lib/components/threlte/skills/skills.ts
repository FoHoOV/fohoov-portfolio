import type { Vector3Like } from 'three';

export const startingY = -12;

export const data = [
	{
		sphereColor: '#6c5254',
		icon: '/icons/svelte.svg',
		text: 'Svelte',
		position: {
			x: -10,
			y: startingY,
			z: 0
		}
	},
	{
		sphereColor: '#2e5255',
		icon: '/icons/fastapi.svg',
		text: 'Fast API',
		position: {
			x: -10,
			y: startingY,
			z: 0
		}
	},
	{
		sphereColor: '#fffff0',
		icon: '/icons/flask.svg',
		text: 'Flask',
		position: {
			x: 0,
			y: startingY,
			z: 0
		}
	},
	{
		sphereColor: '#6c5254',
		icon: '/icons/svelte.svg',
		text: 'SvelteKit',
		position: {
			x: 0,
			y: startingY,
			z: 0
		}
	},
	{
		sphereColor: '#607885',
		icon: '/icons/tailwind.svg',
		text: 'Tailwind',
		position: {
			x: 10,
			y: startingY,
			z: 0
		}
	},
	{
		sphereColor: '#ddd8d5',
		icon: '/icons/typescript.svg',
		text: 'Typescript',
		position: {
			x: 10,
			y: startingY,
			z: 0
		}
	}
] as const satisfies Array<{
	sphereColor: string;
	icon: `/icons/${string}.svg`;
	position: Vector3Like;
	text: string;
}>;
