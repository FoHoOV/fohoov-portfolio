<script lang="ts" module>
	import { gsapCreator, type TimeLineCreator, type TweenConfig } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		children?: Snippet;
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();

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
				grid: [3, 3],
				from: 'center'
			}
		});
	}

	function shiftGridBorders({ target, getTimeline }: TweenConfig) {
		const boxes = target.querySelectorAll('.box');
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
				borderColor: '#80808018',
				scale: 1.3,
				repeat: 1,
				transformOrigin: 'center',
				ease: 'back.in',
				stagger: {
					amount: 1,
					grid: [3, 3],
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
		class="absolute left-0 top-0 -z-50 grid h-full w-full grid-cols-3 grid-rows-3 bg-base-200">
		{#each { length: 3 } as _}
			{#each { length: 3 } as _}
				<span class="box h-full w-full border-0 border-transparent bg-base-300"> </span>
			{/each}
		{/each}
	</div>

	{@render children?.()}
</div>
