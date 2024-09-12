<script lang="ts" module>
	import ThrelteSkillSet from '$lib/components/threlte/SkillSet.svelte';
	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { bounds } from '$lib/utils';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	import Section from '$lib/components/section/Section.svelte';

	const { class: className }: Props = $props();
	const threlteSceneManager = getThrelteSceneManager();
	let sectionRef: Section | undefined = undefined;

	onMount(() => {
		const wrapper = sectionRef?.getWrapper();

		const skillSetSymbol = Symbol('ThrelteSkillSet');
		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top 20%',
			end: 'end center',
			onEnter: () => {
				console.log('oe called');
				threlteSceneManager.add(skillSetSymbol, {
					component: ThrelteSkillSet,
					props: () => {
						return {};
					},
					async beforeUnmount(component) {
						await component?.moveOutOfView();
					}
				});
			},
			onLeave: async () => {
				console.log('ol called');
				await threlteSceneManager.remove(skillSetSymbol);
			}
		});
	});
</script>

<Section bind:this={sectionRef} title={'What I know'} class={className}></Section>
