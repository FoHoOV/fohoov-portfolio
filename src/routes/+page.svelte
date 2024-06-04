<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	// TODO: create this and grid effects into an action
	type GsapOptions = gsap.TweenVars & {
		/**
		 * last parameter that indicates the timing of this animation
		 */
		timingPosition?: gsap.Position;
		/**
		 * timeline instance to use instead of gsap.*
		 */
		timeLine?: gsap.core.Timeline;
		/**
		 * calls the callback with the instance its using
		 */
		instance?: (instance: gsap.core.Tween | gsap.core.Timeline) => void;
	};

	function gsapTo(node: HTMLElement, options: GsapOptions) {
		const res = (options.timeLine ?? gsap).to(node, options, options.timingPosition);
		if (options.instance) {
			options.instance(res);
		}
	}

	function gsapFrom(node: HTMLElement, options: GsapOptions) {
		const res = (options.timeLine ?? gsap).from(node, options, options.timingPosition);
		if (options.instance) {
			options.instance(res);
		}
	}
</script>

<script lang="ts">
	let wrapper: HTMLElement;

	function createGridEffect() {
		const boxes = wrapper.querySelectorAll('.box');
		const boxesTimeLine = gsap.timeline();
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

		const randomGrid = () => {
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
						randomGrid();
					}, 5000);
				}
			});
		};
		randomGrid();
	}

	onMount(() => {
		createGridEffect();
	});
</script>

<div class="relative flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<div
		bind:this={wrapper}
		class="absolute left-0 top-0 -z-10 grid h-full w-full grid-cols-3 grid-rows-3 bg-base-200"
	>
		{#each { length: 3 } as _, i}
			{#each { length: 3 } as _, i}
				<span class="box h-full w-full border-0 border-transparent bg-base-300"> </span>
			{/each}
		{/each}
	</div>

	{#each 'FoHoOV' as character, i}
		<span
			class="invisible"
			use:gsapTo={{
				yPercent: 300,
				xPercent: Math.pow(i * 5, 2),
				opacity: 0,
				scrollTrigger: {
					scrub: true,
					start: 'center center',
					end: 'bottom center'
				}
			}}
			use:gsapFrom={{
				yPercent: -300,
				xPercent: Math.pow(i * 5, 2),
				scale: 3,
				duration: 1,
				autoAlpha: 0
			}}
			use:gsapTo={{
				textShadow: 'rgba(245,242,237,1) 0px 0px 300px',
				yoyo: true,
				repeat: -1,
				duration: 5,
				delay: 1
			}}
			style="text-shadow: rgba(245,242,237,0.2) 0px 0px 100px"
		>
			{character}
		</span>
	{/each}
</div>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<span class="text-center"> Some other content </span>
</div>
