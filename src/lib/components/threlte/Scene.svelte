<script lang="ts" module>
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	import ArtBoard from '$lib/components/threlte/artboard/ArtBoard.svelte';

	const threlteSceneManager = getThrelteSceneManager();
</script>

<ArtBoard></ArtBoard>

{#each threlteSceneManager.scenes$ as { component: Component, props, exports }}
	<Component bind:this={exports} {...props()}></Component>
{/each}
