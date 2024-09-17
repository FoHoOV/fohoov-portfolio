<script lang="ts" module>
	import ThrelteSkillSet from '$lib/components/threlte/skills/SkillSet.svelte';
	import Section from '$lib/components/section/Section.svelte';

	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export type Props = {
		class?: string;
	};
</script>

<script lang="ts">
	const { class: className }: Props = $props();

	const threlteSceneManager = getThrelteSceneManager();
	let sectionRef: Section | undefined = undefined;
	const skillSetSymbol = Symbol('ThrelteSkillSet');

	function mountScene() {
		threlteSceneManager.add(skillSetSymbol, {
			component: ThrelteSkillSet,
			props: () => {
				return {};
			},
			async beforeUnmount(component) {
				await component?.moveOutOfView();
			}
		});
	}

	async function unMountScene() {
		await threlteSceneManager.remove(skillSetSymbol);
	}

	onMount(() => {
		const wrapper = sectionRef?.getWrapper();
		// mountScene(); // TODO: remove
		ScrollTrigger.create({
			trigger: wrapper,
			start: 'top center',
			end: '60% center',
			onEnter: () => {
				mountScene();
			},
			onLeave: async () => {
				await unMountScene();
			},
			onLeaveBack: async () => {
				await unMountScene();
			},
			onEnterBack: () => {
				mountScene();
			}
		});
	});
</script>

<Section bind:this={sectionRef} title="What I know" class={className}></Section>
