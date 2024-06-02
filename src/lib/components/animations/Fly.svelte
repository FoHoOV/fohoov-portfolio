<script lang="ts" context="module">
	import type { Snippet } from 'svelte';
	import { cssVars, type WithAnimationProps, type CssValue } from '$lib';

	export type Props = WithAnimationProps<{
		fromX?: CssValue;
		toX?: CssValue;
		fromY?: CssValue;
		toY?: CssValue;
		children: Snippet;
	}>;
</script>

<script lang="ts">
	const { children, ...restProps }: Props = $props();
</script>

<div
	class="fly"
	use:cssVars={{
		props: restProps,
		prefixWith: 'ca'
	}}
>
	{@render children()}
</div>

<style>
	.fly {
		animation-name: animate-fly;
		animation-duration: var(--ca-animation-duration, 2s);
		animation-timing-function: var(--ca-animation-timing-function, ease-in-out);
		animation-delay: var(--ca-animation-delay, 0);
		animation-fill-mode: var(--ca-animation-fill-mode, initial);
		animation-direction: var(--ca-animation-direction, initial);
		animation-iteration-count: var(--ca-animation-iteration-count, 1);
	}

	@keyframes animate-fly {
		0% {
			transform: translate(var(--ca-from-x, 0), var(--ca-from-y, 0));
		}
		100% {
			transform: translate(var(--ca-to-x, 0), var(--ca-to-y, 0));
		}
	}
</style>
