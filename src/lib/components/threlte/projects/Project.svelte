<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';
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
			props?: ComponentProps<HTML>;
			class?: string;
		};
		bottom?: {
			props?: ComponentProps<HTML>;
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
	{...rootProps}>
	<ArtBoard url={imageUrl} width={10} height={10} {...artBoardProps}></ArtBoard>

	<HTML transform center {...center.props}>
		<p
			class="w-max text-pretty text-3xl font-extrabold text-secondary {center.class}"
			style="opacity: {textOpacity.current};">
			{center.text}
		</p>
	</HTML>

	<HTML transform position={[3, -3.5, 2]} {...bottom?.props}>
		<a
			class="link link-success block w-28 text-3xl font-extrabold {bottom?.class}"
			style="opacity: {1 - textOpacity.current};"
			href={projectUrl}
			target="_blank">
			<span>visit</span>
			<Icon class="inline-block" icon="mdi:arrow-right" />
		</a>
	</HTML>
</T.Group>
