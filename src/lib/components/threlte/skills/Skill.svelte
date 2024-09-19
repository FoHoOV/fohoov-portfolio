<script lang="ts" module>
	import SphereWithImage, {
		type Props as SphereWithImageProps
	} from '$lib/components/threlte/utils/sphere/SphereWithImage.svelte';
	import { lookAt } from '$lib/utils/threlte/look-at';
	import { useThrelte } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import { onMount } from 'svelte';

	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import type { Color, ColorRepresentation } from 'three';

	export type Props = {
		text: string;
		fontSize: number;
		textColor?: Color | ColorRepresentation;
		scale?: never;
	} & SphereWithImageProps;
</script>

<script lang="ts">
	let {
		text,
		fontSize,
		textColor = 'white',
		distanceFromSphere = 0.3,
		rotationSpeed = 0,
		ref = $bindable(undefined),
		children,
		...restProps
	}: Props = $props();

	const rotation = fromStore(spring<number>(0));
	const fillOpacity = $derived(rotation.current / Math.PI);
	const zoom = fromStore(spring<number>(1));

	/**
	 * saves the sphere.rotation.y before setting the rotation store
	 * this helps to revert back to the original rotation to prevent snapping
	 */
	let cachedYRotation = 0;

	const { camera } = useThrelte();

	onMount(() => {
		if (!ref) {
			return;
		}
		lookAt(ref, camera.current, {
			condition() {
				return rotation.current == 0;
			}
		});
	});
</script>

<SphereWithImage
	bind:ref
	scale={zoom.current}
	onpointerenter={(e: unknown) => {
		zoom.current = 12 / 10;
		cachedYRotation = ref!.rotation.y;
		rotation.current = cachedYRotation + Math.PI;
	}}
	onpointerleave={(e: unknown) => {
		zoom.current = 10 / 12;
		rotation.current = cachedYRotation;
	}}
	yRotation={rotation.current}
	{rotationSpeed}
	{...restProps}>
	<Text
		position={[0, 0, -restProps.radius - distanceFromSphere]}
		{text}
		{fontSize}
		curveRadius={-restProps.radius - distanceFromSphere}
		anchorY={'50%'}
		anchorX={'50%'}
		rotation.y={Math.PI}
		{fillOpacity}
		color={textColor} />
	{@render children?.()}
</SphereWithImage>
