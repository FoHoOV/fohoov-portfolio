<script lang="ts" context="module">
	import { gsapCreator } from '$lib';
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import TextPopInEffect from '$lib/components/effects/TextPopInEffect.svelte';
	import { gsap } from 'gsap';
	import FoHoOV from '$lib/components/FoHoOV.svelte';
</script>

<script lang="ts">
	let wrapper: HTMLDivElement;
	let svg: SVGElement;
</script>

<FoHoOV></FoHoOV>

<div class="relative min-h-full w-full">
	<div class="sticky top-0 w-full text-center">
		<h1 class="text-4xl uppercase">skills</h1>
	</div>
	<div class="h-full w-full"></div>
</div>
