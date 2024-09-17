<script lang="ts" module>
	import SphereWithImage, {
		type Props as SphereWithImageProps
	} from '$lib/components/threlte/sphere/SphereWithImage.svelte';
	import { Text } from '@threlte/extras';

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
</script>

<SphereWithImage
	bind:ref
	scale={zoom.current}
	onpointerenter={(e: unknown) => {
		zoom.current = 12 / 10;
		rotation.current = Math.PI;
	}}
	onpointerleave={(e: unknown) => {
		zoom.current = 10 / 12;
		rotation.current = 0;
	}}
	xRotation={rotation.current}
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
