<script lang="ts" context="module">
	import BubbleButton from '$lib/components/buttons/BubbleButton.svelte';

	import { getDelusionManager, type TweenConfig } from '$lib';
</script>

<script lang="ts">
	const delusionManager = getDelusionManager();

	let animationState = $state<'started' | 'ended'>('ended');
	let changeDelusionStateTimeLine: gsap.core.Timeline | undefined;

	function createDelusionStateChangeAnimation({ target, getTimeline }: TweenConfig) {
		changeDelusionStateTimeLine = getTimeline({ paused: true });

		changeDelusionStateTimeLine.to(target, {
			scale:
				Math.max(window.innerHeight, window.innerWidth) /
				(target.getBoundingClientRect().width / 6), // TODO: dividing it by width/2 should be enough, but doesn't work
			duration: 1,
			onStart: () => {
				animationState = 'started';
			},
			onComplete: () => {
				delusionManager.toggleDelusionState();
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
	]}>
	<p class="opacity-[1]" class:!opacity-0={animationState == 'started'}>
		{delusionManager.isDelusionOn$().current ? 'fake' : 'real'}
	</p>
</BubbleButton>
