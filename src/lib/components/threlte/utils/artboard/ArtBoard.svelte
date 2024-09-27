<script lang="ts" module>
	import BentPlaneGeometry from '$lib/components/threlte/utils/geometry/BentPlaneGeometry.svelte';
	import { ImageMaterial, type IntersectionEvent } from '@threlte/extras';
	import { T, type Props as ThrelteProps } from '@threlte/core';

	import { DoubleSide, type Mesh } from 'three';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

	export type Props = { url: string } & ThrelteProps<Mesh> & {
			materialProps?: ThrelteProps<ImageMaterial>;
		};
</script>

<script lang="ts">
	let { url, ref = $bindable(undefined), materialProps, ...restProps }: Props = $props();

	const scale = fromStore(spring(1));
	const radius = fromStore(spring(0.1));
	const zoom = fromStore(spring(1));

	function stopPropagation(callback: () => void) {
		return (event: IntersectionEvent<'pointerover' | 'pointerleave'>) => {
			event.stopPropagation();
			callback();
		};
	}
</script>

<T.Mesh
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
	{...restProps}>
	<BentPlaneGeometry radius={0.2} width={10} height={10} widthSegments={20} heightSegments={20} />
	<ImageMaterial transparent {url} radius={radius.current} zoom={zoom.current} {...materialProps} />
</T.Mesh>
