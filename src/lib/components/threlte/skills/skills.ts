export const data = [
	{
		sphereColor: '#6c5254',
		icon: '/icons/brands/svelte.svg',
		text: 'Svelte'
	},
	{
		sphereColor: '#2e5255',
		icon: '/icons/brands/fastapi.svg',
		text: 'Fast API'
	},
	{
		sphereColor: '#fffff0',
		icon: '/icons/brands/flask.svg',
		text: 'Flask'
	},
	{
		sphereColor: '#6c5254',
		icon: '/icons/brands/svelte.svg',
		text: 'SvelteKit'
	},
	{
		sphereColor: '#607885',
		icon: '/icons/brands/tailwind.svg',
		text: 'Tailwind'
	},
	{
		sphereColor: '#ddd8d5',
		icon: '/icons/brands/typescript.svg',
		text: 'Typescript'
	}, //change
	{
		sphereColor: '#698c94',
		icon: '/icons/brands/react.svg',
		text: 'React'
	},
	{
		sphereColor: '#5f8c59',
		icon: '/icons/brands/gsap.svg',
		text: 'Gsap'
	},
	{
		sphereColor: '#6c5254',
		text: 'Threlte'
	},
	{
		sphereColor: '#6c5254',
		text: 'MicroFronts'
	},
	{
		sphereColor: '#51e43e',
		icon: '/icons/brands/dotnet.svg',
		text: 'ASP.NET'
	},
	{
		sphereColor: '#1a5a66',
		icon: '/icons/brands/python.svg',
		text: 'Python'
	},
	{
		sphereColor: '#d7de4e',
		icon: '/icons/brands/javascript.svg',
		text: 'JS'
	},
	{
		sphereColor: '#73497a',
		icon: '/icons/brands/csharp.svg',
		text: 'C#'
	},
	{
		sphereColor: '#73497a',
		text: 'VB.NET :('
	},
	{
		sphereColor: '#84c3d6',
		icon: '/icons/brands/docker.svg',
		text: 'Docker'
	},
	{
		sphereColor: '#4c9296',
		icon: '/icons/brands/mui.svg',
		text: 'MUI'
	},
	{
		sphereColor: '#da4960',
		icon: '/icons/brands/playwright.svg',
		text: 'Playwright'
	},
	{
		sphereColor: '#743ca6',
		icon: '/icons/brands/html.svg',
		text: 'HTML'
	},
	{
		sphereColor: '#65d477',
		icon: '/icons/brands/css.svg',
		text: 'CSS'
	},
	{
		sphereColor: '#322b2e',
		icon: '/icons/brands/vite.svg',
		text: 'Vite'
	},
	{
		sphereColor: '#5a899c',
		icon: '/icons/brands/webpack.svg',
		text: 'Webpack'
	}
] as const satisfies Array<{
	sphereColor: string;
	icon?: `/icons/brands/${string}.svg`;
	text: string;
}>;
