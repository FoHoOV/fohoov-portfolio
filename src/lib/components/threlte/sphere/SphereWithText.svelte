<script lang="ts" module>
	import SphereWithRotation, {
		type Props as SphereWithRotationProps
	} from '$lib/components/threlte/sphere/SphereWithRotation.svelte';
	import type { Color, ColorRepresentation } from 'three';
	import { Text } from '@threlte/extras';

	export type Props = {
		text: string;
		distanceFromSphere?: number;
		fontSize: number;
		textColor?: Color | ColorRepresentation;
	} & SphereWithRotationProps;
</script>

<script lang="ts">
	let {
		text,
		fontSize,
		textColor,
		distanceFromSphere = 0.2,
		ref = $bindable(undefined),
		...restProps
	}: Props = $props();
</script>

<SphereWithRotation bind:ref {...restProps}>
	<Text
		position={[0, 0, restProps.radius + restProps.distanceFromSphere]}
		{text}
		{fontSize}
		curveRadius={-restProps.radius - restProps.distanceFromSphere}
		anchorY={'50%'}
		color={textColor ?? 'white'} />
</SphereWithRotation>
