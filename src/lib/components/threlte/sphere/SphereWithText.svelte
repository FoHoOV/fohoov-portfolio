<script lang="ts" module>
	import { generateReflectionTexture } from '$lib/utils';
	import { T, useTask } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import {
		type ColorRepresentation,
		type Vector3,
		type Color,
		type Group,
		type Vector3Like,
		AddOperation
	} from 'three';

	export type Props = {
		text: string;
		radius: number;
		fontSize: number;
		position: Vector3 | Vector3Like;
		textColor?: Color | ColorRepresentation;
		sphereColor?: Color | ColorRepresentation;
		distanceFromSphere?: number;
		initialTextRotation?: number;
		rotationSpeed?: number;
		ref?: Group | undefined;
	};
</script>

<script lang="ts">
	let {
		text,
		radius,
		fontSize,
		position,
		textColor,
		sphereColor,
		ref = $bindable(undefined),
		distanceFromSphere = 0.2,
		initialTextRotation = 0,
		rotationSpeed = 3
	}: Props = $props();

	let cubeRotation = $state(initialTextRotation);
	let sphereEnvMap = $derived(ref ? generateReflectionTexture(ref) : null);

	useTask((delta) => {
		cubeRotation += (delta * rotationSpeed) / 5;
	});
</script>

<T.Group bind:ref rotation.y={cubeRotation} position={[position.x, position.y, position.z]}>
	<T.Mesh>
		<T.SphereGeometry args={[radius - 0.05]} />
		<T.MeshStandardMaterial
			color={sphereColor ?? 'black'}
			roughness={0.05}
			metalness={0.9}
			combine={AddOperation}
			envMap={sphereEnvMap?.texture}></T.MeshStandardMaterial>
	</T.Mesh>

	<Text
		position={[0, 0, radius + distanceFromSphere]}
		{text}
		{fontSize}
		curveRadius={-radius - distanceFromSphere}
		anchorY={'50%'}
		color={textColor ?? 'white'} />
</T.Group>
