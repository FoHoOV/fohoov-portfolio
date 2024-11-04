<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';

	import { type ComponentExports } from '$lib/utils';
	import { T, useTask, type Props as ThrelteProps } from '@threlte/core';
	import { type IntersectionEvent } from '@threlte/extras';
	import { Text } from '@threlte/extras';
	import { type ComponentProps } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import type { Group } from 'three';

	export type Props = {
		projectUrl: string;
		imageUrl: string;
		flashLight?: ComponentExports<typeof FlashLight>;
		size?: number;
	} & {
		artBoardProps?: Omit<ComponentProps<typeof ArtBoard>, 'url'>;
		center: {
			text: string;
			props?: ComponentProps<Text>;
		};
		bottom?: {
			props?: ComponentProps<Text>;
		};
	} & ThrelteProps<typeof Group>;
</script>

<script lang="ts">
	let {
		projectUrl,
		imageUrl,
		ref = $bindable(undefined),
		flashLight,
		artBoardProps,
		size = 10,
		center,
		bottom,
		...rootProps
	}: Props = $props();
	const textOpacity = fromStore(spring(1));

	const scale = fromStore(spring(1));
	const radius = fromStore(spring(0.1));
	const zoom = fromStore(spring(1));

	function stopPropagation(callback: () => void) {
		return (event: IntersectionEvent<'pointerover' | 'pointerleave'>) => {
			event.stopPropagation();
			callback();
		};
	}

	useTask(() => {
		if (!ref) {
			return;
		}

		if (flashLight?.isIntersecting(ref, 4)) {
			textOpacity.current = 0;
		} else {
			textOpacity.current = 1;
		}
	});
</script>

<T.Group
	bind:ref
	scale={scale.current}
	onpointerover={stopPropagation(() => {
		scale.current = 1.3;
		radius.current = 0.25;
		zoom.current = 1.25;
	})}
	onpointerleave={stopPropagation(() => {
		scale.current = 1;
		radius.current = 0.1;
		zoom.current = 1;
	})}
	onclick={() => {
		window.open(projectUrl, '_blank');
	}}
	{...rootProps}>
	<ArtBoard url={imageUrl} width={size} height={size} {...artBoardProps}></ArtBoard>

	<Text
		text={center.text}
		color={'#fd6f9c'}
		fillOpacity={textOpacity.current}
		fontSize={0.8}
		strokeColor={'#fd6f9c'}
		letterSpacing={0.1}
		outlineColor={'#fd6f9c'}
		outlineWidth={0.01}
		outlineOpacity={textOpacity.current}
		position.z={3}
		anchorX={'50%'}
		{...center.props} />

	<Text
		text={'visit'}
		color={'#b0e2b0'}
		fillOpacity={1 - textOpacity.current}
		fontSize={0.8}
		strokeColor={'#b0e2b0'}
		letterSpacing={0.1}
		outlineColor={'#b0e2b0'}
		outlineWidth={0.01}
		outlineOpacity={1 - textOpacity.current}
		position={[size / 4, -size / 3, 1]}
		{...bottom?.props} />
</T.Group>
