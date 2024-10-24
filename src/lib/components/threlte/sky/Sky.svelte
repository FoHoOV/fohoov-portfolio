<script lang="ts" module>
	import { presets } from '$lib/components/threlte/sky/presets';
	import { Sky } from '@threlte/extras';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

	export type Props = {
		preset: keyof typeof presets;
	};
</script>

<script lang="ts">
	const { preset }: Props = $props();

	const presetSpring = fromStore(
		spring(presets[preset], {
			damping: 0.95,
			precision: 0.0001,
			stiffness: 0.05
		})
	);

	$effect(() => {
		presetSpring.current = presets[preset];
	});
</script>

<Sky {...presetSpring.current} />
