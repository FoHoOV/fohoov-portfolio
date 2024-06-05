<script lang="ts" context="module">
	import { gsap } from 'gsap';
	import { gsapCreator } from '$lib';
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();

	function createPopInEffect(wrapper: Element) {
		gsap.from(wrapper, {
			yPercent: -300,
			scale: 5,
			duration: 1,
			autoAlpha: 0,
			id: 'scale-tween'
		});
	}
</script>

<div
	class="invisible {className}"
	use:gsapCreator={[
		({ target }) => {
			createPopInEffect(target);
		}
	]}
>
	{@render children()}
</div>
