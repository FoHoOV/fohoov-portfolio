<script lang="ts" module>
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import { getDelusionManager, gsapCreator, type TweenConfig } from '$lib';
</script>

<script lang="ts">
	import PopInEffect from '$lib/components/effects/PopInEffect.svelte';

	const delusionManager = getDelusionManager();
	let timeLine: gsap.core.Timeline | undefined;

	function createTextSpringEffect({ target }: TweenConfig) {
		if (!timeLine) {
			return;
		}

		timeLine
			.from(
				target,
				{
					autoAlpha: 0
				},
				'<+0.17'
			)
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

	function createHiEffect({ target, getTimeline }: TweenConfig) {
		timeLine = getTimeline({ delay: 1 });
		timeLine
			.to(target, {
				autoAlpha: 1,
				translateX: 0,
				ease: 'elastic.out',
				duration: 0.8
			})
			.to(target, {
				autoAlpha: 0,
				translateX: '-6rem',
				ease: 'elastic.inOut(1.5, 1)',
				duration: 0.8
			});
	}
	function createImEffect({ target }: TweenConfig) {
		if (!timeLine) {
			return;
		}
		timeLine
			.to(
				target,
				{
					autoAlpha: 1,
					translateX: 0,
					ease: 'elastic.out',
					duration: 0.8
				},
				'>-0.4'
			)
			.to(target, {
				autoAlpha: 0,
				translateY: '6rem',
				ease: 'elastic.inOut(1.5, 1)',
				duration: 0.8
			});
	}
</script>

<div
	class="relative flex h-full w-full flex-col items-center justify-center gap-2 overflow-x-hidden text-7xl">
	<GlowEffect>
		{#if !delusionManager.isDelusionOn$().current}
			<p
				class="invisible absolute -translate-x-24"
				use:gsapCreator={[
					(options) => {
						createHiEffect(options);
					}
				]}>
				Greetings!
			</p>
			<p
				class="invisible absolute translate-x-24"
				use:gsapCreator={[
					(options) => {
						createImEffect(options);
					}
				]}>
				I'm
			</p>
			<p
				class="invisible absolute flex text-7xl font-extrabold sm:text-8xl"
				use:gsapCreator={[
					(options) => {
						createTextSpringEffect(options);
					}
				]}>
				<span id="f" class="inline-block">F</span>
				<span id="o1" class="inline-block">o</span>
				<span id="h" class="inline-block">H</span>
				<span id="o2" class="invisible inline-block -translate-y-48">o</span>
				<span id="o3" class="inline-block translate-x-10 md:translate-x-28">O</span>
				<span id="v" class="inline-block translate-x-10 md:translate-x-28">V</span>
			</p>
		{:else}
			<PopInEffect>
				<p class="text-7xl font-extrabold sm:text-8xl">He/Him</p>
			</PopInEffect>
		{/if}
	</GlowEffect>
</div>
