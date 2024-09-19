<script lang="ts" module>
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		title: string;
		ref?: HTMLDivElement;
		children?: Snippet;
	};
</script>

<script lang="ts">
	let { class: className, title, ref = $bindable(undefined), children }: Props = $props();
</script>

<div class="min-h-full w-full {className}" bind:this={ref}>
	<div class="sticky top-0 z-10 w-full self-start text-center align-top">
		<GlowEffect>
			<h1 class="py-7 text-7xl font-extrabold backdrop-blur-sm sm:text-8xl">{title}</h1>
		</GlowEffect>
	</div>
	{@render children?.()}
</div>
