<script lang="ts" context="module">
	import { getCssVarsString, type CssValue } from '$lib';
	import type { Snippet } from 'svelte';
	import type { AnimationProps } from './types';

	export type Props = AnimationProps<{
		fromX?: CssValue;
		toX?: CssValue;
		fromY?: CssValue;
		toY?: CssValue;
		children: Snippet;
	}>;
</script>

<script lang="ts">
	const { start = true, children, ...restProps }: Props = $props();
</script>

<div
	class:fly={start}
	style={getCssVarsString({
		prefixWith: 'ca',
		props: restProps,
		defaults: {
			animationDelay: '0',
			animationDirection: 'initial',
			animationDuration: '1s',
			animationFillMode: 'initial',
			animationIterationCount: '1',
			animationTimingFunction: 'ease-in-out',
			fromX: '0',
			toX: '0',
			fromY: '0',
			toY: '0'
		}
	})}
>
	{@render children()}
</div>

<style>
	.fly {
		animation-name: animate-fly;
		animation-duration: var(--ca-animation-duration);
		animation-timing-function: var(--ca-animation-timing-function);
		animation-delay: var(--ca-animation-delay);
		animation-fill-mode: var(--ca-animation-fill-mode);
		animation-direction: var(--ca-animation-direction);
		animation-iteration-count: var(--ca-animation-iteration-count);
	}

	@keyframes animate-fly {
		0% {
			transform: translate(var(--ca-from-x), var(--ca-from-y));
		}
		100% {
			transform: translate(var(--ca-to-x), var(--ca-to-y));
		}
	}
</style>
