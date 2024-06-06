<script lang="ts" context="module">
	import BubbleButton from '$lib/components/buttons/BubbleButton.svelte';

	import { getDelusionStateFromStore, type TweenConfig } from '$lib';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();

	let animationState = $state<'started' | 'ended'>('ended');
	let changeDelusionStateTimeLine: gsap.core.Timeline | undefined;

	function createDelusionStateChangeAnimation({ target, getTimeline }: TweenConfig) {
		changeDelusionStateTimeLine = getTimeline({ paused: true });

		changeDelusionStateTimeLine.to(target, {
			scale:
				Math.max(window.innerHeight, window.innerWidth) /
				(target.getBoundingClientRect().width / 6),
			duration: 1,
			onStart: () => {
				animationState = 'started';
			},
			onComplete: () => {
				delusion.toggleDelusionState();
			}
		});

		changeDelusionStateTimeLine.to(target, {
			scale: 1,
			duration: 1,
			onComplete: () => {
				animationState = 'ended';
			}
		});
	}

	function startToggleAnimation() {
		changeDelusionStateTimeLine?.restart();
	}
</script>

<BubbleButton
	class="fixed bottom-2 right-2 z-40 text-2xl text-white {animationState !== 'ended'
		? 'disabled'
		: ''}"
	size="7rem"
	fill="#2a384e"
	onclick={startToggleAnimation}
	disabled={animationState !== 'ended'}
	svgGsaps={[
		(options) => {
			createDelusionStateChangeAnimation(options);
		}
	]}
>
	<p class="opacity-[1]" class:!opacity-0={animationState == 'started'}>
		{delusion.isDelusionOn$().current ? 'fake' : 'real'}
	</p>
</BubbleButton>
