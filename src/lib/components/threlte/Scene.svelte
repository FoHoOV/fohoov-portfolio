<script context="module" lang="ts">
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as { component: Component, props, renderedComponent }}
	<Component bind:this={renderedComponent} {...props() as any}></Component>
{/each}
