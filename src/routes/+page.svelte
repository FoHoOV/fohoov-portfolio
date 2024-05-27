<script lang="ts" context="module">
	import { cubicInOut } from 'svelte/easing';
	import { fade, fly } from 'svelte/transition';
</script>

<script lang="ts">
	let visible = $state(false);

	$effect(() => {
		visible = true;
	});
</script>

<p class="flex h-full w-full items-center justify-center gap-2 text-7xl">
	{#if visible}
		{#each 'FoHoOV' as character, i}
			{#if i % 2 == 0}
				<span class=" -translate-y-2" in:fly|global={{ y: -100, duration: 1100 }} out:fade>
					{character}
				</span>
			{:else}
				<span class=" translate-y-2" in:fly|global={{ y: 100, duration: 1100 }} out:fade>
					{character}
				</span>
			{/if}
		{/each}
	{/if}
</p>

<style>
</style>
