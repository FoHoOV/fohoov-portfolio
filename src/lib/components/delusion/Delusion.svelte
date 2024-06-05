<script lang="ts" context="module">
	import BubbleButton from '$lib/components/buttons/BubbleButton.svelte';

	import { getDelusionStateFromStore } from '$lib';
	import { gsap } from 'gsap';
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();

	let bubbleButton: BubbleButton | undefined;
	let animationState = $state<'started' | 'ended'>('ended');

	// TODO: use a createTimeline
	const changeDelusionStateTimeLine = browser ? gsap.timeline() : null;
	function changeDelusionState() {
		const svg = bubbleButton?.getSvgElement();
		if (!svg || !changeDelusionStateTimeLine) {
			return;
		}
		animationState = 'started';
		changeDelusionStateTimeLine.to(svg, {
			scale: Math.max(window.innerHeight, window.innerWidth) / svg.getBoundingClientRect().x,
			duration: 1,
			onComplete: () => {
				delusion.toggleDelusionState();
			}
		});
		changeDelusionStateTimeLine.to(svg, {
			scale: 1,
			duration: 1,
			onComplete: () => {
				animationState = 'ended';
			}
		});
	}

	$effect(() => {
		return () => {
			changeDelusionStateTimeLine?.kill();
		};
	});
</script>

<BubbleButton
	bind:this={bubbleButton}
	class="fixed left-2 top-2 z-10 text-white {animationState !== 'ended' ? 'disabled' : ''}"
	size="5rem"
	fill="#2a384e"
	onclick={changeDelusionState}
	disabled={animationState !== 'ended'}
>
	<p class="opacity-[1]" class:!opacity-0={animationState == 'started'}>
		{delusion.isDelusionOn$().current ? 'fake' : 'real'}
	</p>
</BubbleButton>
