<script lang="ts" module>
	import { gsapCreator, type TweenConfig } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		children?: Snippet;
		grid: {
			x: number;
			y: number;
		};
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className, grid, children }: Props = $props();

	function createGridEffect({ target, getTimeline }: TweenConfig) {
		const boxes = target.querySelectorAll('.box');
		const boxesTimeLine = getTimeline({
			label: 'boxesTimeLine'
		});
		boxesTimeLine.from(boxes, {
			duration: 1,
			scale: 0,
			ease: 'power2.inOut',
			stagger: {
				amount: 0.5,
				grid: [grid.y, grid.x],
				from: 'center'
			}
		});
	}

	function shiftGridBorders({ target, getTimeline }: TweenConfig) {
		const boxes = target.querySelectorAll('.box');
		const boxesTimeLine = getTimeline({
			label: 'boxesTimeLine',
			errorIfLabelDoesntExist: true
		});

		const inner = () => {
			boxesTimeLine.to(boxes, {
				duration: 2,
				yoyo: true,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#80808018',
				scale: 1.3,
				repeat: 1,
				transformOrigin: 'center',
				ease: 'back.in',
				stagger: {
					amount: 1,
					grid: [grid.y, grid.x],
					from: 'random'
				},
				onComplete: () => {
					setTimeout(() => {
						inner();
					}, 1000);
				}
			});
		};

		inner();
	}
</script>

<div class={`relative ${className}`}>
	<div
		use:gsapCreator={[
			(options) => {
				createGridEffect(options);
			},
			(options) => {
				shiftGridBorders(options);
			}
		]}
		class="absolute left-0 top-0 -z-50 grid h-full w-full bg-base-200"
		style:grid-template-rows="repeat({grid.y}, minmax(0, 1fr))"
		style:grid-template-columns="repeat({grid.x}, minmax(0, 1fr))">
		{#each { length: grid.y } as _}
			{#each { length: grid.x } as _}
				<span class="box h-full w-full border-0 border-transparent bg-base-300"> </span>
			{/each}
		{/each}
	</div>

	{@render children?.()}
</div>
