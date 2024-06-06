<script lang="ts" context="module">
	import WavyTextBackground from '$lib/components/effects/WavyTextBackground.svelte';

	import { gsapCreator, type GsapOptions } from '$lib/actions';
	import { type NumberRange } from '$lib/utils';
	import type { Property } from 'csstype';

	export type Props = {
		baseColor: Property.Color;
		text: string;
		level: NumberRange<0, 12> | '?';
		gsaps?: GsapOptions;
	};
</script>

<script lang="ts">
	const { baseColor, text, level, gsaps }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-20" use:gsapCreator={gsaps ?? []}>
	<WavyTextBackground class="text-center text-4xl font-extrabold" {baseColor}>
		<p>{text}</p>
	</WavyTextBackground>
	<p class="text-center text-3xl">
		<span class="text-primary">{level}</span>/<span class="text-primary">10</span>
	</p>
</div>
