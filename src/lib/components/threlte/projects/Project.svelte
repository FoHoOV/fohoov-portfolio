<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';
	import { type ComponentExports } from '$lib/utils';
	import { T, useTask, type Props as ThrelteProps } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { type ComponentProps } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import type { Mesh, Group } from 'three';

	export type Props = { url: string; flashLight: ComponentExports<typeof FlashLight> } & {
		artBoardProps?: Omit<ComponentProps<typeof ArtBoard>, 'url'>;
		textProps?: ComponentProps<Text>;
	} & ThrelteProps<typeof Group>;
</script>

<script lang="ts">
	let {
		url,
		ref = $bindable(undefined),
		flashLight,
		artBoardProps,
		textProps,
		...rootProps
	}: Props = $props();

	const textOpacity = fromStore(spring(1));

	useTask(() => {
		if (!ref) {
			return;
		}
		if (flashLight?.isIntersecting(ref)) {
			textOpacity.current = 0;
		} else {
			textOpacity.current = 1;
		}
	});
</script>

<T.Group bind:ref {...rootProps}>
	<ArtBoard {url} {...artBoardProps}></ArtBoard>
	<Text
		textAlign="center"
		anchorX={'50%'}
		strokeWidth={2}
		strokeColor={0xffffff}
		color={0xffffff}
		outlineBlur={0.5}
		outlineColor={0x0000a1}
		position.z={3}
		curveRadius={7}
		fontSize={1}
		fillOpacity={textOpacity.current}
		outlineOpacity={textOpacity.current}
		strokeOpacity={textOpacity.current}
		{...textProps}></Text>
</T.Group>
