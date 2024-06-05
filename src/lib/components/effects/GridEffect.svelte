<script lang="ts" context="module">
	import { gsapCreator, type TimeLineCreator } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		children?: Snippet;
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();

	function createGridEffect(wrapper: Element, getTimeline: TimeLineCreator) {
		const boxes = wrapper.querySelectorAll('.box');
		const boxesTimeLine = getTimeline({
			label: 'boxesTimeLine'
		});
		boxesTimeLine.from(boxes, {
			duration: 1,
			scale: 0,
			stagger: {
				amount: 0.5,
				grid: [3, 3],
				ease: 'power3.inOut',
				from: 'center'
			}
		});
	}

	function shiftGridBorders(wrapper: Element, getTimeline: TimeLineCreator) {
		const boxes = wrapper.querySelectorAll('.box');
		const boxesTimeLine = getTimeline({
			label: 'boxesTimeLine',
			errorIfNotExists: true
		});

		const inner = () => {
			boxesTimeLine.to(boxes, {
				duration: 2,
				yoyo: true,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#8080804a',
				scale: 1.1,
				repeat: 1,
				transformOrigin: 'center',
				stagger: {
					amount: 1,
					grid: [3, 3],
					ease: 'power3.inOut',
					from: 'random'
				},
				onComplete: () => {
					setTimeout(() => {
						inner();
					}, 5000);
				}
			});
		};

		inner();
	}
</script>

<div class={`relative ${className}`}>
	<div
		use:gsapCreator={[
			({ target, getTimeline }) => {
				createGridEffect(target, getTimeline);
			},
			({ target, getTimeline }) => {
				shiftGridBorders(target, getTimeline);
			}
		]}
		class="absolute left-0 top-0 -z-10 grid h-full w-full grid-cols-3 grid-rows-3 bg-base-200"
	>
		{#each { length: 3 } as _}
			{#each { length: 3 } as _}
				<span class="box h-full w-full border-0 border-transparent bg-base-300"> </span>
			{/each}
		{/each}
	</div>

	{@render children?.()}
</div>
