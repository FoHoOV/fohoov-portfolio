<script lang="ts" context="module">
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import TextPopInEffect from '$lib/components/effects/TextPopInEffect.svelte';
	import { getDelusionStateFromStore } from '$lib/stores';
</script>

<script lang="ts">
	const delusion = getDelusionStateFromStore();
</script>

<div
	class="relative flex h-full w-full items-center justify-center gap-2 overflow-x-hidden text-7xl"
>
	<GlowEffect>
		<TextPopInEffect>
			<p>{delusion.isDelusionOn$().current ? 'Who?' : 'FoHoOV'}</p>
		</TextPopInEffect>
	</GlowEffect>
</div>
