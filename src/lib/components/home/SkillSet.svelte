<script lang="ts" module>
	import ThrelteSkillSet from '$lib/components/threlte/skills/SkillSet.svelte';
	import Section from '$lib/components/section/Section.svelte';

	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export type Props = {
		class?: string;
	};

	const sceneSymbol = Symbol('ThrelteSkillSet');
</script>

<script lang="ts">
	const { class: className }: Props = $props();

	const threlteSceneManager = getThrelteSceneManager();
	let ref: HTMLDivElement | undefined = undefined;

	function mountScene() {
		threlteSceneManager.add(sceneSymbol, {
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
		await threlteSceneManager.remove(sceneSymbol);
	}

	onMount(() => {
		ScrollTrigger.create({
			trigger: ref,
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

<Section bind:ref title="What I know" class={className}></Section>
