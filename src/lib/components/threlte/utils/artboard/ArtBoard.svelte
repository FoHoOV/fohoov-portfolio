<script lang="ts" module>
	import BentPlaneGeometry from '$lib/components/threlte/utils/geometry/BentPlaneGeometry.svelte';
	import ImageMaterial from '$lib/components/threlte/utils/images/ImageMaterial.svelte';
	import type { ComponentProps } from 'svelte';
	import { T, type Props as ThrelteProps } from '@threlte/core';

	import { DoubleSide, type Mesh } from 'three';

	export type Props = { width: number; height: number; url: string } & {
		materialProps?: ComponentProps<typeof ImageMaterial>;
	} & ThrelteProps<typeof Mesh>;
</script>

<script lang="ts">
	let {
		width,
		height,
		url,
		ref = $bindable(undefined),
		materialProps,
		...restProps
	}: Props = $props();
</script>

<T.Mesh bind:ref receiveShadow side={DoubleSide} {...restProps}>
	<BentPlaneGeometry radius={0.2} {width} {height} widthSegments={20} heightSegments={20} />
	<!-- <ThrelteImageMaterial {url} radius={radius.current} zoom={zoom.current} {...materialProps}
	></ThrelteImageMaterial> -->
	<ImageMaterial {url} {...materialProps}></ImageMaterial>
</T.Mesh>
