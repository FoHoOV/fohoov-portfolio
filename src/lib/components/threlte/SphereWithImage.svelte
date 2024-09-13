<script lang="ts" module>
	import { generateReflectionTexture } from '$lib/utils';
	import { T, useTask } from '@threlte/core';
	import {
		type ColorRepresentation,
		type Vector3,
		type Color,
		type Group,
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
		ref?: Group | undefined;
	};
</script>

<script lang="ts">
	import Svg from '$lib/components/threlte/Svg.svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

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

	const zoom = fromStore(spring<number>(1));

	useTask((delta) => {
		cubeRotation += (delta * rotationSpeed) / 5;
	});
</script>

<T.Group
	bind:ref
	rotation.y={cubeRotation}
	position={[position.x, position.y, position.z]}
	scale={zoom.current}
	onpointerenter={(e: unknown) => {
		zoom.current = 12 / 10;
	}}
	onpointerleave={(e: unknown) => {
		zoom.current = 10 / 12;
	}}>
	<T.Mesh>
		<T.SphereGeometry args={[radius - 0.05]} />
		<T.MeshStandardMaterial
			color={sphereColor ?? 'black'}
			roughness={0.2}
			metalness={0.98}
			combine={AddOperation}
			envMap={sphereEnvMap?.texture}></T.MeshStandardMaterial>
	</T.Mesh>

	<!-- TODO: scaling factor shouldn't be hardcoded like this, add a size? -->
	<Svg {url} scalingFactor={0.02} position={{ x: 0, y: 0, z: radius + distanceFromSphere }} />
</T.Group>
