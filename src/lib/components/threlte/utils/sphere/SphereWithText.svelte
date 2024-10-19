<script lang="ts" module>
	import SphereWithRotation, {
		type Props as SphereWithRotationProps
	} from '$lib/components/threlte/utils/sphere/SphereWithRotation.svelte';
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
		textColor = 'white',
		distanceFromSphere = 0.2,
		ref = $bindable(undefined),
		children,
		...restProps
	}: Props = $props();
</script>

<SphereWithRotation bind:ref {...restProps}>
	<Text
		position={[0, 0, restProps.radius + distanceFromSphere]}
		{text}
		{fontSize}
		curveRadius={-restProps.radius - distanceFromSphere}
		anchorY={'50%'}
		anchorX={'50%'}
		color={textColor} />
	{@render children?.()}
</SphereWithRotation>
