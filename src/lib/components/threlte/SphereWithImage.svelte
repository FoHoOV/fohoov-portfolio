<script lang="ts" module>
	import { generateReflectionTexture } from '$lib/utils';
	import { T, useTask } from '@threlte/core';
	import {
		type ColorRepresentation,
		type Vector3,
		type Color,
		type Mesh,
		type Vector3Like,
		AddOperation
	} from 'three';

	export type Props = {
		position: Vector3 | Vector3Like;
		radius: number;
		url: string;
		sphereColor?: Color | ColorRepresentation;
		distanceFromSphere?: number;
		initialRotation?: number;
		rotationSpeed?: number;
		ref?: Mesh | undefined;
	};
</script>

<script lang="ts">
	import Svg from '$lib/components/threlte/Svg.svelte';

	let {
		radius,
		position,
		sphereColor,
		url,
		ref = $bindable(undefined),
		distanceFromSphere = 0.2,
		initialRotation: initialTextRotation = 0,
		rotationSpeed = 3
	}: Props = $props();

	let cubeRotation = $state(initialTextRotation);
	let sphereEnvMap = $derived(ref ? generateReflectionTexture(ref) : null);

	useTask((delta) => {
		cubeRotation += (delta * rotationSpeed) / 5;
	});
</script>

<T.Mesh bind:ref rotation.y={cubeRotation} position={[position.x, position.y, position.z]}>
	<T.Mesh>
		<T.SphereGeometry args={[radius - 0.05]} />
		<T.MeshStandardMaterial
			color={sphereColor ?? 'black'}
			roughness={0.05}
			metalness={0.9}
			combine={AddOperation}
			envMap={sphereEnvMap?.texture}></T.MeshStandardMaterial>
	</T.Mesh>

	<!-- TODO: the position and scaling factor shouldn't be hardcoded like this -->
	<Svg {url} scalingFactor={0.02} position={{ x: -1, y: 1, z: radius + distanceFromSphere }} />
</T.Mesh>
