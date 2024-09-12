<script lang="ts" module>
	import { gsapCreator, type Size, type GsapOptions, type TweenConfig } from '$lib';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { MORPHS } from './morphs';

	export type Props = {
		size?: Size;
		fill: string;
		svgGsaps?: GsapOptions;
		children: Snippet;
	} & HTMLButtonAttributes;
</script>

<script lang="ts">
	const {
		size,
		class: className,
		fill = 'white',
		svgGsaps,
		children,
		...restParams
	}: Props = $props();

	function createMorphAnimations({ target, getTimeline }: TweenConfig) {
		const timeLine = getTimeline({
			repeat: -1,
			yoyo: true,
			delay: 0,
			repeatDelay: 0
		});
		for (const morph of MORPHS) {
			timeLine.to(target, {
				attr: { d: morph },
				ease: 'none',
				duration: 1
			});
		}
	}
</script>

<div class="relative">
	<button class={className} style="width: {size}; height: {size}" {...restParams}>
		{@render children()}
		<svg
			class="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2"
			viewBox="0 0 200 200"
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			use:gsapCreator={svgGsaps ?? []}>
			<path
				transform="translate(100 100)"
				{fill}
				d="M45.8,-72C58.6,-63.1,67.7,-49.1,73.8,-34.2C79.9,-19.2,83,-3.4,80.4,11.3C77.9,26,69.6,39.6,59.5,52.1C49.5,64.6,37.6,76.1,23.8,79.4C10,82.6,-5.7,77.7,-21.1,72.7C-36.5,67.7,-51.6,62.8,-60.8,52.5C-70,42.2,-73.2,26.6,-76.8,10.3C-80.3,-6.1,-84.2,-23.2,-79.6,-37.6C-74.9,-52,-61.8,-63.9,-47.1,-71.9C-32.4,-79.8,-16.2,-84,0.2,-84.3C16.5,-84.5,33.1,-80.8,45.8,-72Z"
				use:gsapCreator={[createMorphAnimations]}></path>
		</svg>
	</button>
</div>
