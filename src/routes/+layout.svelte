<script lang="ts" context="module">
	import '../app.css';

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

{@render children()}
