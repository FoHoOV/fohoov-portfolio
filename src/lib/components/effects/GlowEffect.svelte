<script lang="ts" module>
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();
</script>

<div class="glow-effect contents {className}">
	{@render children()}
</div>

<style>
	/**
	 *  TODO: I hate using global styles here, but since text-shadow performance is shit on chromium based browsers,
	 * I have to use this hack till it starts to work like it should
	 */
	.glow-effect > :global(h1),
	.glow-effect > :global(p),
	.glow-effect > :global(a) {
		--from-value: rgb(255, 255, 255);
		--to-value: rgb(124, 124, 124);
		filter: drop-shadow(8px 6px 62px var(--from-value));
		animation-name: animate-glow-effect;
		animation-duration: 6s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}
	@keyframes animate-glow-effect {
		50% {
			filter: drop-shadow(8px 6px 15px var(--to-value));
		}
		100% {
			filter: drop-shadow(8px 6px 62px var(--from-value));
		}
	}
</style>
