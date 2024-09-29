<script lang="ts" module>
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as [key, { component: Component, props, exports }] (key)}
	<Component bind:this={exports} {...props()}></Component>
{/each}
