<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type Props = {
		children: Snippet<[{ width: number; height: number; device: 'mobile' | 'desktop' }]>;
	};

	const breakpoints = {
		sm: 640,
		md: 768,
		lg: 1024
	};
</script>

<script lang="ts">
	const { children }: Props = $props();

	let width = $state(0);
	let height = $state(0);
	const device = $derived.by(() => {
		if (width >= breakpoints.lg) {
			return 'desktop';
		} else if (width >= breakpoints.sm) {
			return 'mobile';
		} else {
			return 'mobile';
		}
	});
</script>

<svelte:window bind:outerWidth={width} bind:outerHeight={height} />

{@render children({
	width,
	height,
	device
})}
