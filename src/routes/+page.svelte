<script lang="ts" context="module">
	import { browser } from '$app/environment';
	import { gsap } from 'gsap';
</script>

<script lang="ts">
	function gsapTo(
		node: HTMLElement,
		options: gsap.TweenVars & {
			timeLine?: gsap.core.Timeline;
			instance?: (instance: gsap.core.Tween | gsap.core.Timeline) => void;
		}
	) {
		const res = (options.timeLine ?? gsap).to(node, options);
		if (options.instance) {
			options.instance(res);
		}
	}

	function gsapFrom(
		node: HTMLElement,
		options: gsap.TweenVars & {
			timeLine?: gsap.core.Timeline;
			instance?: (instance: gsap.core.Tween | gsap.core.Timeline) => void;
		}
	) {
		const res = (options.timeLine ?? gsap).from(node, options);
		if (options.instance) {
			options.instance(res);
		}
	}
</script>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	{#each 'FoHoOV' as character, i}
		<span
			class="invisible"
			use:gsapTo={{
				yPercent: 200,
				xPercent: Math.pow(i * 5, 2),
				opacity: 0,
				scrollTrigger: {
					scrub: true,
					start: 'center center',
					end: 'bottom center'
				}
			}}
			use:gsapFrom={{
				yPercent: -200,
				xPercent: Math.pow(i * 5, 2),
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
