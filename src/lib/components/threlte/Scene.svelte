<script context="module" lang="ts">
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as { component, props }}
	<svelte:component this={component} {...props()}></svelte:component>
{/each}
