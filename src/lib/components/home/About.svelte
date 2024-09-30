<script lang="ts" module>
	import { gsapCreator, type TweenConfig } from '$lib/actions';
	import Card from '$lib/components/daisy/Card.svelte';
	import Section from '$lib/components/section/Section.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();
	const commonCardClass =
		'w-full h-full justify-self-center text-2xl opacity-0 -translate-x-4 font-bold transition-transform hover:scale-90 box';
	const commonPClass = 'grow-0';

	function createPopInEffect(options: TweenConfig) {
		const enterAnimation = () => {
			gsap.to(options.target.querySelectorAll('.box'), {
				x: 0,
				opacity: 1,
				duration: 1,
				stagger: 0.1,
				delay: 0.3,
				ease: 'power3.out',
				overwrite: 'auto'
			});
		};
		const leaveAnimation = () => {
			gsap.to(options.target.querySelectorAll('.box'), {
				x: -3,
				opacity: 0,
				duration: 1,
				stagger: 0.1,
				ease: 'power3.out',
				overwrite: 'auto'
			});
		};
		ScrollTrigger.create({
			trigger: options.target,
			start: 'center bottom',
			end: 'bottom center',
			onEnter: enterAnimation,
			onLeave: leaveAnimation,
			onLeaveBack: leaveAnimation,
			onEnterBack: enterAnimation
		});
	}
</script>

<Section class="flex h-full flex-col items-center justify-center {className}" title="About me">
	<div
		class="grid h-full w-10/12 auto-rows-fr grid-cols-2 gap-10 py-16 md:grid-cols-3"
		use:gsapCreator={[createPopInEffect]}>
		<Card class="{commonCardClass} bg-primary text-primary-content">
			<p class={commonPClass}>Enthusiastic</p>
		</Card>

		<Card class="{commonCardClass} bg-secondary text-secondary-content">
			<p class={commonPClass}>Loves coding!</p>
		</Card>

		<Card class="{commonCardClass} bg-accent text-accent-content">
			<p class={commonPClass}>Fast learner</p>
		</Card>

		<Card class="{commonCardClass} bg-success text-success-content">
			<p class="{commonPClass} inline">
				Contributed to our lord and savior <code class="font-bold">Svelte</code>
			</p>
		</Card>

		<Card class="{commonCardClass} bg-error text-error-content">
			<p class={commonPClass}>Loves to try out new stuff</p>
		</Card>

		<Card class="{commonCardClass} bg-info text-info-content">
			<p class={commonPClass}>Actual team player!</p>
		</Card>
	</div>
</Section>
