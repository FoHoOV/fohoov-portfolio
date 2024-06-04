<script lang="ts" context="module">
	import TextEffect from '$lib/components/effects/TextEffect.svelte';
	import GridEffect from '$lib/components/effects/GridEffect.svelte';
</script>

<GridEffect class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<TextEffect text="FoHoOV" />
</GridEffect>

<div class="flex h-full w-full items-center justify-center gap-2 overflow-hidden text-7xl">
	<span class="text-center"> Some other content </span>
</div>
