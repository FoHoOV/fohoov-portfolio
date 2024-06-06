<script lang="ts" context="module">
	import PopInEffect from '$lib/components/effects/PopInEffect.svelte';
	import { getDelusionStateFromStore, gsapCreator, type TweenConfig } from '$lib';
	import { gsap } from 'gsap';
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
				target.querySelectorAll('path'),
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

<div class="relative flex h-full w-full items-center justify-center gap-2 overflow-x-hidden">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 719.42 142.66"
		class="invisible overflow-visible fill-current sm:text-3xl md:text-4xl"
		width="15em"
		use:gsapCreator={[
			(options) => {
				createTextSpringEffect(options);
			}
		]}
	>
		<defs>
			<filter
				id="white-glow"
				filterUnits="userSpaceOnUse"
				x="-100%"
				y="-100%"
				width="300%"
				height="300%"
			>
				<feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur5" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur15" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur30" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="60" result="blur60" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="90" result="blur90" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="120" result="blur120" />
				<feGaussianBlur in="SourceGraphic" stdDeviation="500" result="blur500" />
				<feMerge result="blur-merged">
					<feMergeNode in="blur15" />
					<feMergeNode in="blur30" />
					<feMergeNode in="blur60" />
					<feMergeNode in="blur90" />
					<feMergeNode in="blur120" />
					<feMergeNode in="blur500" />
				</feMerge>
				<feColorMatrix
					result="white-blur"
					in="blur-merged"
					type="matrix"
					values="1 0 0 0 0
					 0 1 0 0 0
					 0 0 1 0 0
					 0 0 0 0.4 0"
				/>
				<feMerge>
					<feMergeNode in="white-blur" />
					<feMergeNode in="blur5" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		<path id="f" d="M0,2.25h74.4v14.96H17.83v45.91h52.27v14.76H17.83v62.52H0V2.25Z" />
		<path
			id="o1"
			d="M191.19,89.98c0,36.69-25.42,52.68-49.4,52.68-26.85,0-47.55-19.68-47.55-51.04,0-33.21,21.73-52.68,49.19-52.68s47.76,20.7,47.76,51.04ZM112.48,91.01c0,21.73,12.5,38.12,30.13,38.12s30.13-16.19,30.13-38.53c0-16.81-8.4-38.12-29.72-38.12s-30.54,19.68-30.54,38.53Z"
		/>
		<path
			id="h"
			d="M236.43,2.25v57.8h66.82V2.25h18.04v138.15h-18.04v-64.77h-66.82v64.77h-17.83V2.25h17.83Z"
		/>
		<path
			id="o2"
			class="-translate-y-96"
			d="M444.41,89.98c0,36.69-25.42,52.68-49.4,52.68-26.85,0-47.55-19.68-47.55-51.04,0-33.21,21.73-52.68,49.19-52.68s47.76,20.7,47.76,51.04ZM365.7,91.01c0,21.73,12.5,38.12,30.13,38.12s30.13-16.19,30.13-38.53c0-16.81-8.4-38.12-29.72-38.12s-30.54,19.68-30.54,38.53Z"
		/>
		<path
			id="o3"
			class="-translate-x-24"
			d="M584.34,69.9c0,47.55-28.9,72.76-64.16,72.76s-62.11-28.29-62.11-70.1c0-43.86,27.26-72.56,64.16-72.56s62.11,28.9,62.11,69.9ZM477.14,72.15c0,29.52,15.99,55.96,44.07,55.96s44.27-26.03,44.27-57.39c0-27.47-14.35-56.16-44.07-56.16s-44.27,27.26-44.27,57.6Z"
		/>
		<path
			id="v"
			class="-translate-x-24"
			d="M650.34,140.4L605.25,2.25h19.27l21.52,68.05c5.94,18.65,11.07,35.46,14.76,51.65h.41c3.89-15.99,9.63-33.41,15.78-51.45l23.37-68.26h19.06l-49.4,138.15h-19.68Z"
		/>
	</svg>
</div>

<style>
	path {
		filter: url(#white-glow);
	}
</style>
