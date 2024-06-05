<script lang="ts" context="module">
	import '../app.css';

	import GridEffect from '$lib/components/effects/GridEffect.svelte';
	import Delusion from '$lib/components/delusion/Delusion.svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { browser } from '$app/environment';
	import {
		DelusionManager,
		ThemeManager,
		createRootContextManager,
		setThemeManagerToStore,
		setDelusionStateToStore
	} from '$lib';

	if (browser) {
		initGsap();
	}

	function initGsap() {
		gsap.registerPlugin(ScrollTrigger);
	}
</script>

<script lang="ts">
	const { children } = $props();

	createRootContextManager();
	setThemeManagerToStore(new ThemeManager());
	setDelusionStateToStore(new DelusionManager());
</script>

<div class="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden">
	<GridEffect class="h-full w-full"></GridEffect>
</div>

<Delusion></Delusion>

{@render children()}
