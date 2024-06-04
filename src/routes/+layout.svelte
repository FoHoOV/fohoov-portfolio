<script lang="ts" context="module">
	import '../app.css';

	import GridEffect from '$lib/components/effects/GridEffect.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { browser } from '$app/environment';

	if (browser) {
		initGsap();
	}

	function initGsap() {
		gsap.registerPlugin(ScrollTrigger);
	}
</script>

<script lang="ts">
	const { children } = $props();
</script>

<div class="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
	<GridEffect class="h-full w-full"></GridEffect>
</div>

{@render children()}
