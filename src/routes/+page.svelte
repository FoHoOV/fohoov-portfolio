<script lang="ts" context="module">
	import { gsapCreator } from '$lib';
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import TextPopInEffect from '$lib/components/effects/TextPopInEffect.svelte';
	import { gsap } from 'gsap';
</script>

<script lang="ts">
	let wrapper: HTMLDivElement;
	let svg: SVGElement;
</script>

<div
	class="relative flex h-full w-full items-center justify-center gap-2 overflow-x-hidden text-7xl"
>
	<GlowEffect>
		<TextPopInEffect>
			<p>FoHoOV</p>
		</TextPopInEffect>
	</GlowEffect>
</div>

<div class="flex h-full w-full items-center justify-center gap-2 text-7xl">
	<GlowEffect>some other text</GlowEffect>
</div>
