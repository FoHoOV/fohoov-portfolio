<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { gsapCreator } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		children: Snippet;
	};
</script>

<script lang="ts">
	const { children }: Props = $props();

	function createGlowEffect(wrapper: Element) {
		gsap.to(wrapper, {
			textShadow: 'rgba(245,242,237,1) 0px 0px 300px',
			yoyo: true,
			repeat: -1,
			duration: 3
		});
	}
</script>

<div
	style="text-shadow: rgba(245,242,237,0.2) 0px 0px 10px"
	use:gsapCreator={[
		({ target }) => {
			createGlowEffect(target);
		}
	]}
>
	{@render children()}
</div>
