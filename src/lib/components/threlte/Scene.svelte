<script context="module" lang="ts">
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as { component, props, renderedComponent }}
	<svelte:component this={component} bind:this={renderedComponent} {...props()}></svelte:component>
{/each}
