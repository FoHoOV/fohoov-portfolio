<script lang="ts" context="module">
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		title: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, title, children }: Props = $props();

	let wrapper: HTMLElement | undefined = $state();

	export function getWrapper() {
		return wrapper;
	}
</script>

<div class="min-h-full w-full {className}" bind:this={wrapper}>
	<div class="sticky top-0 z-10 w-full self-start text-center align-top">
		<GlowEffect>
			<h1 class="py-7 text-7xl font-extrabold backdrop-blur-sm sm:text-8xl">{title}</h1>
		</GlowEffect>
	</div>
	{#if wrapper}
		<!--TODO: bruh, do some diff between svelte4 - svelte5 binding timings see if this is a bug, propose a PR anyways -->
		{@render children()}
	{/if}
</div>
