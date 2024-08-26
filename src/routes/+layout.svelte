<script lang="ts" module>
	import '../app.css';

	import GridEffect from '$lib/components/effects/GridEffect.svelte';
	import DelusionToggle from '$lib/components/delusion/DelusionToggle.svelte';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { browser } from '$app/environment';
	import { initGlobalStores } from '$lib';
</script>

<script lang="ts">
	const { data, children } = $props();

	init();

	function initGsap() {
		gsap.registerPlugin(ScrollTrigger);
	}

	function init() {
		if (browser) {
			initGsap();
		}
		initGlobalStores(data.sharedCookies);
	}
</script>

<div class="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
	<GridEffect class="h-full w-full"></GridEffect>
</div>

<DelusionToggle />

{@render children()}
