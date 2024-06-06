<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { gsapCreator, type TweenConfig } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		children: Snippet;
	};
</script>

<script lang="ts">
	const { children }: Props = $props();

	function createGlowEffect({ target }: TweenConfig) {
		gsap.to(target, {
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
		(options) => {
			createGlowEffect(options);
		}
	]}
>
	{@render children()}
</div>
