<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { gsapCreator, type TimeLineCreator } from '$lib';

	export type Props = {
		text: string;
	};
</script>

<script lang="ts">
	const { text }: Props = $props();

	function createNameIntroEffect(
		index: number,
		wrapper: HTMLElement,
		getTimeline: TimeLineCreator
	) {
		const timeLine = getTimeline({
			label: 'intro',
			errorIfNotExists: true
		});

		timeLine.from(wrapper, {
			yPercent: -300,
			xPercent: Math.pow(index * 5, 2),
			scale: 3,
			duration: 1,
			autoAlpha: 0,
			id: 'scale-tween'
		});
		timeLine.to(wrapper, {
			textShadow: 'rgba(245,242,237,1) 0px 0px 300px',
			yoyo: true,
			repeat: -1,
			duration: 3
		});
	}

	function createNameOutroEffect(
		index: number,
		wrapper: HTMLElement,
		getTimeline: TimeLineCreator
	) {
		const timeLine = getTimeline({
			label: 'intro'
		});

		gsap.to(wrapper, {
			yPercent: 300,
			xPercent: Math.pow(index * 5, 2),
			opacity: 0,
			scrollTrigger: {
				trigger: wrapper.parentElement,
				scrub: true,
				start: 'center center',
				end: 'bottom center',
				onEnter: () => {
					timeLine.getById('scale-tween').seek(Infinity);
					timeLine.pause();
				},
				onLeaveBack: () => {
					timeLine.resume();
				}
			}
		});
	}
</script>

{#each text as character, i}
	<span
		class="invisible"
		use:gsapCreator={[
			({ target, getTimeline }) => {
				createNameOutroEffect(i, target, getTimeline);
			},
			({ target, getTimeline }) => {
				createNameIntroEffect(i, target, getTimeline);
			}
		]}
		style="text-shadow: rgba(245,242,237,0.2) 0px 0px 10px"
	>
		{character}
	</span>
{/each}
