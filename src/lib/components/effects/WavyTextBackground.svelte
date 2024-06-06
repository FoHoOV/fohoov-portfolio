<script lang="ts" context="module">
	import type { Property } from 'csstype';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import Values from 'values.js';

	export type Props = {
		baseColor: Property.Color;
		children: Snippet;
	} & HTMLAttributes<HTMLParagraphElement>;
</script>

<script lang="ts">
	const { class: className, baseColor, children, ...restParams }: Props = $props();

	const FILL_COLOR_PLACEHOLDER = 'FILL_COLOR_PLACEHOLDER';
	// inorder to add more waves:
	// 1. goto https://app.haikei.app/ - waves
	// 2. copy the output to regex101
	// 3. use this regex fill="(#([0-9]|[a-z])*)" and replace with fill="FILL_COLOR_PLACEHOLDER"
	// 4. then encodeURIComponent the result
	const WAVES = [
		'%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20id%3D%22visual%22%20viewBox%3D%220%200%20960%20540%22%20width%3D%22960%22%20height%3D%22540%22%20version%3D%221.1%22%3E%3Cpath%20d%3D%22M0%2033L80%2037.5C160%2042%20320%2051%20480%2058.3C640%2065.7%20800%2071.3%20880%2074.2L960%2077L960%200L880%200C800%200%20640%200%20480%200C320%200%20160%200%2080%200L0%200Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20147L80%20150.5C160%20154%20320%20161%20480%20187C640%20213%20800%20258%20880%20280.5L960%20303L960%2075L880%2072.2C800%2069.3%20640%2063.7%20480%2056.3C320%2049%20160%2040%2080%2035.5L0%2031Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20179L80%20187.2C160%20195.3%20320%20211.7%20480%20240.5C640%20269.3%20800%20310.7%20880%20331.3L960%20352L960%20301L880%20278.5C800%20256%20640%20211%20480%20185C320%20159%20160%20152%2080%20148.5L0%20145Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20185L80%20206.5C160%20228%20320%20271%20480%20304.2C640%20337.3%20800%20360.7%20880%20372.3L960%20384L960%20350L880%20329.3C800%20308.7%20640%20267.3%20480%20238.5C320%20209.7%20160%20193.3%2080%20185.2L0%20177Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20260L80%20271.7C160%20283.3%20320%20306.7%20480%20340C640%20373.3%20800%20416.7%20880%20438.3L960%20460L960%20382L880%20370.3C800%20358.7%20640%20335.3%20480%20302.2C320%20269%20160%20226%2080%20204.5L0%20183Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20465L80%20457.8C160%20450.7%20320%20436.3%20480%20438.2C640%20440%20800%20458%20880%20467L960%20476L960%20458L880%20436.3C800%20414.7%20640%20371.3%20480%20338C320%20304.7%20160%20281.3%2080%20269.7L0%20258Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3Cpath%20d%3D%22M0%20541L80%20541C160%20541%20320%20541%20480%20541C640%20541%20800%20541%20880%20541L960%20541L960%20474L880%20465C800%20456%20640%20438%20480%20436.2C320%20434.3%20160%20448.7%2080%20455.8L0%20463Z%22%20fill%3D%22FILL_COLOR_PLACEHOLDER%22%2F%3E%3C%2Fsvg%3E'
	];

	function getSvg() {
		const svg = WAVES[Math.round(Math.random() * (WAVES.length - 1))];
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

<p
	class="wavy-bg {className}"
	{...restParams}
	style={`background-image: url("data:image/svg+xml,${getSvg()}");`}
>
	{@render children()}
</p>

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
