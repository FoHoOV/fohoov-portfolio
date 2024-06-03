<script lang="ts" context="module">
	import { getCssVarsString, type CssValue, type WithAnimationProps } from '$lib';
	import type { Snippet } from 'svelte';
	import type { AnimationProps } from './types';

	export type Props = AnimationProps<{
		fromDeg?: CssValue;
		toDeg?: CssValue;
		children: Snippet;
	}>;
</script>

<script lang="ts">
	const { start = true, children, ...restProps }: Props = $props();
</script>

<div
	class:wiggle={start}
	style={getCssVarsString({
		prefixWith: 'ca',
		props: restProps,
		defaults: {
			animationDelay: '0',
			animationDirection: 'initial',
			animationDuration: '2s',
			animationFillMode: 'initial',
			animationIterationCount: 'infinite',
			animationTimingFunction: 'ease-in-out',
			fromDeg: '-3deg',
			toDeg: '3deg'
		}
	})}
>
	{@render children()}
</div>

<style>
	.wiggle {
		animation-name: animate-wiggle;
		animation-duration: var(--ca-animation-duration);
		animation-timing-function: var(--ca-animation-timing-function);
		animation-delay: var(--ca-animation-delay);
		animation-fill-mode: var(--ca-animation-fill-mode);
		animation-direction: var(--ca-animation-direction);
		animation-iteration-count: var(--ca-animation-iteration-count);
	}

	@keyframes animate-wiggle {
		33% {
			transform: rotate(var(--ca-from-deg));
		}
		66% {
			transform: rotate(var(--ca-to-deg));
		}
		100% {
			transform: rotate('initial');
		}
	}
</style>
