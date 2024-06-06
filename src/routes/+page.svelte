<script lang="ts" context="module">
	import FoHoOV from '$lib/components/FoHoOV.svelte';
</script>

<script lang="ts">
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import WavyTextBackground from '$lib/components/effects/WavyTextBackground.svelte';
</script>

<FoHoOV></FoHoOV>

<div class="h-full w-full">
	<div class="sticky top-0 w-full text-center">
		<GlowEffect>
			<h1 class="pt-14 text-4xl backdrop-blur-sm">Skills</h1>
		</GlowEffect>
	</div>

	<WavyTextBackground class="text-7xl font-extrabold sm:text-8xl" baseColor={'#004cbb'}>
		TypeScript
	</WavyTextBackground>
</div>

<div class="h-full w-full"></div>
