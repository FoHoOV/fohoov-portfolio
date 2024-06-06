<script lang="ts" context="module">
	import { getDelusionStateFromStore } from '$lib';
	import type { TweenConfig } from '$lib/actions';
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import type { Snippet } from 'svelte';

	type PopEffect = (options: TweenConfig, createTimeline?: boolean) => void;

	export type Props = {
		title: string;
		children: Snippet<[{ popEffect: PopEffect }]>;
	};
</script>

<script lang="ts">
	const { title, children }: Props = $props();

	let wrapper: HTMLElement | undefined;
	let timeLine: gsap.core.Timeline | null = null;
	const delusion = getDelusionStateFromStore();

	const createPopEffect = (({ target, getTimeline }, createTimeline = false) => {
		if (createTimeline) {
			timeLine = getTimeline({
				scrollTrigger: {
					trigger: wrapper,
					toggleActions: 'play reverse restart reverse',
					start: '40% bottom'
				}
			});
		}
		if (!timeLine) {
			return;
		}
		timeLine.from(
			target,
			{
				scale: 0,
				duration: 0.4
			},
			createTimeline ? undefined : '>-0.27'
		);
	}) satisfies PopEffect;

	$effect(() => {
		delusion.isDelusionOn$().current;
		timeLine = null;
	});
</script>

<div class="min-h-full w-full">
	<div class="sticky top-0 z-10 w-full self-start text-center align-top">
		<GlowEffect>
			<h1 class="py-7 text-7xl font-extrabold backdrop-blur-sm sm:text-8xl">{title}</h1>
		</GlowEffect>
	</div>
	<div
		class="grid h-full w-full auto-rows-max content-center gap-10 pt-14 md:gap-20"
		bind:this={wrapper}
	>
		{@render children({ popEffect: createPopEffect })}
	</div>
</div>
