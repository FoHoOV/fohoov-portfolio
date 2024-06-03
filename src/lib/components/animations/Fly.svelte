<script lang="ts" context="module">
	import { getCssVarsString, type CssValue, type WithAnimationProps } from '$lib';
	import type { Snippet } from 'svelte';

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

<div class="fly" style={getCssVarsString({ prefixWith: 'ca', props: restProps })}>
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
