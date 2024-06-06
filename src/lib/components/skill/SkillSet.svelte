<script lang="ts" context="module">
	import { getDelusionStateFromStore } from '$lib';
	import type { TweenConfig } from '$lib/actions';
	import type { Props as SectionProps } from '$lib/components/section/Section.svelte';
	import type { Snippet } from 'svelte';

	type PopEffect = (options: TweenConfig, createTimeline?: boolean) => void;

	export type Props = Omit<SectionProps, 'children'> & {
		children: Snippet<[{ popEffect: PopEffect }]>;
	};
</script>

<script lang="ts">
	import SectionWithHeader from '$lib/components/section/Section.svelte';

	const { children, ...restProps }: Props = $props();

	let wrapper: HTMLElement | undefined;
	let timeLine: gsap.core.Timeline | null = null;
	const delusion = getDelusionStateFromStore();

	const createPopEffect = (({ target, getTimeline }, createTimeline = false) => {
		if (createTimeline) {
			timeLine = getTimeline({
				scrollTrigger: {
					trigger: wrapper,
					toggleActions: 'play reverse restart reverse',
					start: '55% bottom'
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
			createTimeline ? undefined : '>-0.15'
		);
	}) satisfies PopEffect;

	$effect.pre(() => {
		delusion.isDelusionOn$().current;
		// on each delusion change we could be getting a new set of skills so we have to renew it after the re-render
		timeLine = null;
	});
</script>

<SectionWithHeader {...restProps}>
	<div
		class="grid h-full w-full auto-rows-max content-center gap-10 pt-14 md:gap-20"
		bind:this={wrapper}
	>
		{@render children({ popEffect: createPopEffect })}
	</div>
</SectionWithHeader>
