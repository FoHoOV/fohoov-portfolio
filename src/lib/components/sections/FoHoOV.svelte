<script lang="ts" context="module">
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import { getDelusionStateFromStore, gsapCreator, type TweenConfig } from '$lib';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();

	function createTextSpringEffect({ target, getTimeline }: TweenConfig) {
		const timeLine = getTimeline();
		timeLine
			.from(target, {
				autoAlpha: 0
			})
			.from(
				target.querySelectorAll('span'),
				{
					duration: 1.2,
					yPercent: -270,
					scale: 1.2,
					stagger: {
						amount: 0.1,
						from: 'start'
					}
				},
				'<'
			)
			.to(target.querySelectorAll('#o3, #v'), {
				translateX: 0,
				duration: 2,
				ease: 'elastic.out'
			})
			.from(
				target.querySelector('#o2'),
				{
					autoAlpha: 0
				},
				'<-0.8'
			)
			.to(
				target.querySelector('#o2'),
				{
					duration: 2,
					translateY: 0,
					ease: 'elastic.inOut(1.5, 0.5)'
				},
				'<'
			);
	}
</script>

<div
	class="relative flex h-full w-full items-center justify-center gap-2 overflow-x-hidden text-7xl"
>
	<GlowEffect>
		<p
			class="invisible flex text-7xl font-extrabold sm:text-8xl"
			use:gsapCreator={[
				(options) => {
					createTextSpringEffect(options);
				}
			]}
		>
			<span id="f" class="inline-block">F</span>
			<span id="o1" class="inline-block">o</span>
			<span id="h" class="inline-block">H</span>
			<span id="o2" class="invisible inline-block -translate-y-48">o</span>
			<span id="o3" class="inline-block translate-x-10">O</span>
			<span id="v" class="inline-block translate-x-10">V</span>
		</p>
	</GlowEffect>
</div>
