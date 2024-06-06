<script lang="ts" context="module">
	import { FILL_COLOR_PLACEHOLDER, WAVES } from '$lib/components/effects/wavy-svgs';
	import type { Property } from 'csstype';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Values from 'values.js';

	export type Props = {
		baseColor: Property.Color;
		children: Snippet;
	} & HTMLAttributes<HTMLParagraphElement>;

	let lastUsedWaveIndex = 0;
</script>

<script lang="ts">
	const { class: className, baseColor, children, ...restParams }: Props = $props();

	function getWave() {
		const svg = WAVES[lastUsedWaveIndex];
		lastUsedWaveIndex += 1;
		if (lastUsedWaveIndex == WAVES.length) {
			lastUsedWaveIndex = 0;
		}
		return svg;
	}

	function getSvg() {
		const svg = getWave();
		const colors = new Values(baseColor).tints(6);
		let colorIndex = 0;
		return svg.replaceAll(new RegExp(FILL_COLOR_PLACEHOLDER, 'g'), () => {
			if (colorIndex < colors.length) {
				colorIndex += 1;
			}
			return encodeURIComponent(colors.at(colorIndex)?.hexString() ?? 'white');
		});
	}
</script>

<div
	class="wavy-bg {className}"
	{...restParams}
	style={`background-image: url("data:image/svg+xml,${getSvg()}");`}
>
	{@render children()}
</div>

<style>
	@supports (background-clip: text) {
		.wavy-bg {
			animation-name: animate-wave-bg;
			animation-duration: 9s;
			animation-fill-mode: forwards;
			animation-iteration-count: infinite;
			animation-timing-function: ease-in-out;
			background-size: 150%;
			background-position-x: 100%;
			background-position-y: 100%;
			color: transparent;
			background-clip: text;
		}

		@keyframes animate-wave-bg {
			50% {
				background-position-x: 0%;
				background-position-y: 0%;
			}
			100% {
				background-position-x: 100%;
				background-position-y: 100%;
			}
		}
	}
</style>
