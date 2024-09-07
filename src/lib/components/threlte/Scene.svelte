<script lang="ts" module>
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as { component: Component, props, exports }}
	<Component bind:this={exports} {...props()}></Component>
{/each}
