<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/models/FlashLight.svelte';
	import { getThrelteSceneManager } from '$lib/stores';
</script>

<script lang="ts">
	const threlteSceneManager = getThrelteSceneManager();
</script>

{#each threlteSceneManager.scenes$ as [key, { component: Component, props, exports }] (key)}
	<Component bind:this={exports} {...props()}></Component>
{/each}
