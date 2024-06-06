<script lang="ts" context="module">
	import type { Snippet } from 'svelte';

	export type Props = {
		children: Snippet;
	};
</script>

<script lang="ts">
	const { children }: Props = $props();
</script>

<div class="glow-effect contents">
	{@render children()}
</div>

<style>
	.glow-effect {
		text-shadow: rgba(245, 242, 237, 0.2) 0px 0px 50px;
		animation-name: animate-glow-effect;
		animation-duration: 6s;
		animation-fill-mode: forwards;
		animation-iteration-count: infinite;
		animation-timing-function: ease-in-out;
	}
	@keyframes animate-glow-effect {
		50% {
			text-shadow: rgba(245, 242, 237, 1) 0px 0px 300px;
		}
		100% {
			text-shadow: rgba(245, 242, 237, 0.2) 0px 0px 50px;
		}
	}
</style>
