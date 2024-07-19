<script lang="ts" context="module">
	import type { Snippet } from 'svelte';

	export type Props = {
		class?: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	const { class: className, children }: Props = $props();
</script>

<div class="contents {className}">
	{@render children()}
</div>

<style>
	.glow-effect {
		--initial-value: rgba(245, 242, 237, 0.2) 0px 0px 50px;
		--to-value: rgba(245, 242, 237, 1) 0px 0px 150px;
		text-shadow: var(--initial-value);
		animation-name: animate-glow-effect;
		animation-duration: 6s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}
	@keyframes animate-glow-effect {
		50% {
			text-shadow: var(--to-value);
		}
		100% {
			text-shadow: var(--initial-value);
		}
	}
</style>
