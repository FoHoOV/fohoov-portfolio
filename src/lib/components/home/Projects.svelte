<script lang="ts" module>
	import Section from '$lib/components/section/Section.svelte';
	import ThrelteProjects from '$lib/components/threlte/projects/Projects.svelte';
	import { getThrelteSceneManager } from '$lib/stores';
	import { onMount } from 'svelte';

	export type Props = {
		class?: string;
	};

	const sceneSymbol = Symbol('ThrelteProjects');
</script>

<script lang="ts">
	const { class: className }: Props = $props();
	const threlteSceneManager = getThrelteSceneManager();

	onMount(() => {
		threlteSceneManager.add(sceneSymbol, {
			component: ThrelteProjects,
			props() {
				return {};
			}
		});
	});
</script>

<Section class="lg:flex-row-reverse {className}" title="Projects"></Section>
