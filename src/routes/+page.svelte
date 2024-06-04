<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { gsapCreator, type TimeLineCreator } from '$lib';
</script>

<script lang="ts">
	function createGridEffect(wrapper: HTMLElement, getTimeline: TimeLineCreator) {
		const boxes = wrapper.querySelectorAll('.box');
		const boxesTimeLine = getTimeline();
		boxesTimeLine.from(boxes, {
			duration: 1,
			scale: 0,
			stagger: {
				amount: 0.5,
				grid: [3, 3],
				ease: 'power3.inOut',
				from: 'center'
			}
		});

		const shiftGridBorders = () => {
			boxesTimeLine.to(boxes, {
				duration: 2,
				yoyo: true,
				borderWidth: '1px',
				borderStyle: 'solid',
				borderColor: '#8080804a',
				scale: 1.1,
				repeat: 1,
				transformOrigin: 'center',
				stagger: {
					amount: 1,
					grid: [3, 3],
					ease: 'power3.inOut',
					from: 'random'
				},
				onComplete: () => {
					setTimeout(() => {
						shiftGridBorders();
					}, 5000);
				}
			});
		};
		shiftGridBorders();
	}

	function createNameEffect(index: number, wrapper: HTMLElement, getTimeline: TimeLineCreator) {
		gsap.to(wrapper, {
			yPercent: 300,
			xPercent: Math.pow(index * 5, 2),
			opacity: 0,
			scrollTrigger: {
				scrub: true,
				start: 'center center',
				end: 'bottom center'
			}
		});
		const timeLine = getTimeline();
		timeLine.from(wrapper, {
			yPercent: -300,
			xPercent: Math.pow(index * 5, 2),
			scale: 3,
			duration: 1,
			autoAlpha: 0
		});
		timeLine.to(wrapper, {
			textShadow: 'rgba(245,242,237,1) 0px 0px 300px',
			yoyo: true,
			repeat: -1,
			duration: 3
		});
	}
</script>

<div class="relative flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<div
		use:gsapCreator={[
			({ target, getTimeline }) => {
				createGridEffect(target, getTimeline);
			}
		]}
		class="absolute left-0 top-0 -z-10 grid h-full w-full grid-cols-3 grid-rows-3 bg-base-200"
	>
		{#each { length: 3 } as _, i}
			{#each { length: 3 } as _, i}
				<span class="box h-full w-full border-0 border-transparent bg-base-300"> </span>
			{/each}
		{/each}
	</div>

	{#each 'FoHoOV' as character, i}
		<span
			class="invisible"
			use:gsapCreator={[
				({ target, getTimeline }) => {
					createNameEffect(i, target, getTimeline);
				}
			]}
			style="text-shadow: rgba(245,242,237,0.2) 0px 0px 10px"
		>
			{character}
		</span>
	{/each}
</div>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<span class="text-center"> Some other content </span>
</div>
