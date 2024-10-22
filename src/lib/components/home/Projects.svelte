<script lang="ts" module>
	import Section from '$lib/components/section/Section.svelte';
	import ThrelteProjects from '$lib/components/threlte/projects/Projects.svelte';
	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	export type Props = {
		class?: string;
	};

	const sceneSymbol = Symbol('ThrelteProjects');
</script>

<script lang="ts">
	const { class: className }: Props = $props();

	let ref: HTMLDivElement | undefined = undefined;

	const threlteSceneManager = getThrelteSceneManager();

	function mountScene() {
		threlteSceneManager.add(sceneSymbol, {
			component: ThrelteProjects,
			props() {
				return {};
			},
			async beforeUnmount(exports) {
				await exports?.moveOutOfView();
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

<Section bind:ref class="lg:flex-row-reverse {className}" title="Projects"></Section>
