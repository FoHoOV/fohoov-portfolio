<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';

	// TODO: create this and grid effects into an action
	type GsapOptions = gsap.TweenVars & {
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
		const res = (options.timeLine ?? gsap).to(node, options);
		if (options.instance) {
			options.instance(res);
		}
	}

	function gsapFrom(node: HTMLElement, options: GsapOptions) {
		const res = (options.timeLine ?? gsap).from(node, options);
		if (options.instance) {
			options.instance(res);
		}
	}
</script>

<script lang="ts">
	let wrapper: HTMLElement;
	function createGridEffect() {
		const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
		tl.from(wrapper.querySelectorAll('.box'), {
			duration: 1,
			scale: 0,
			yoyo: true,
			repeat: -1,
			repeatDelay: 2,
			ease: 'power1.inOut',
			stagger: {
				amount: 0.5,
				grid: [3, 3],
				ease: 'power2.in',
				from: 'center'
			}
		});
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
				<span class="box h-full w-full bg-base-300"> </span>
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
		>
			{character}
		</span>
	{/each}
</div>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<span class="text-center"> Some other content </span>
</div>
