<script lang="ts" module>
	import Section from '$lib/components/section/Section.svelte';

	import { getDelusionManager } from '$lib';
	import type { TweenConfig } from '$lib/actions';
	import type { Props as SectionProps } from '$lib/components/section/Section.svelte';
	import type { Snippet } from 'svelte';

	type PopEffect = (options: TweenConfig, createTimeline?: boolean) => void;

	export type Props = Omit<SectionProps, 'children'> & {
		children: Snippet<[{ popEffect: PopEffect }]>;
	};
</script>

<script lang="ts">
	const { children, ...restProps }: Props = $props();
	let wrapper: Section | undefined;
	let timeLine: gsap.core.Timeline | null = null;
	const delusionManager = getDelusionManager();

	const createPopEffect = (({ target, getTimeline }, createTimeline = false) => {
		if (createTimeline) {
			timeLine = getTimeline({
				scrollTrigger: {
					trigger: wrapper?.getWrapper(),
					toggleActions: 'play reverse restart reverse',
					start: 'top center',
					end: 'center center'
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

	export function getWrapper() {
		return wrapper?.getWrapper();
	}

	$effect.pre(() => {
		delusionManager.isDelusionOn$().current;
		// on each delusion change we could be getting a new set of items so we have to renew it after the re-render
		timeLine = null;
	});
</script>

<Section {...restProps} bind:this={wrapper}>
	<div class="grid h-full w-full auto-rows-max content-center gap-10 pt-14 md:gap-20">
		{@render children({ popEffect: createPopEffect })}
	</div>
</Section>
