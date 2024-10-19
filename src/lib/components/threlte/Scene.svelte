<svelte:options runes={true} />

<script lang="ts" module>
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as [key, scene] (key)}
	<scene.component bind:this={scene.exports} {...scene.props()} />
{/each}
