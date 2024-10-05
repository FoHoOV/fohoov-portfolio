<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';
	import GlowEffect from '$lib/components/effects/GlowEffect.svelte';

	import { type ComponentExports } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { T, useTask, type Props as ThrelteProps } from '@threlte/core';
	import {
		HTML,
		ImageMaterial as ThrelteImageMaterial,
		type IntersectionEvent
	} from '@threlte/extras';
	import { Text } from '@threlte/extras';
	import { type ComponentProps } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import type { Mesh, Group } from 'three';

	export type Props = {
		projectUrl: string;
		imageUrl: string;
		flashLight: ComponentExports<typeof FlashLight>;
	} & {
		artBoardProps?: Omit<ComponentProps<typeof ArtBoard>, 'url'>;
		center: {
			text: string;
			props?: ComponentProps<Text>;
			class?: string;
		};
		bottom?: {
			props?: ComponentProps<Text>;
			class?: string;
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
	<ArtBoard url={imageUrl} width={10} height={10} {...artBoardProps}></ArtBoard>

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
		anchorX={'50%'} />

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
		position={[2.5, -3, 1]} />
</T.Group>
