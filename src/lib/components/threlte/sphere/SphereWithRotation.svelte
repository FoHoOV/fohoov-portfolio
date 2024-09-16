<script lang="ts" module>
	import Sphere, { type Props as SphereProps } from '$lib/components/threlte/sphere/Sphere.svelte';
	import { useTask } from '@threlte/core';

	export type Props = {
		initialRotation?: number;
		rotationSpeed?: number;
	} & SphereProps;
</script>

<script lang="ts">
	let {
		initialRotation: initialTextRotation = 0,
		rotationSpeed = 3,
		ref = $bindable(undefined),
		...restProps
	}: Props = $props();

	let cubeRotation = $state(initialTextRotation);

	useTask((delta) => {
		cubeRotation += (delta * rotationSpeed) / 5;
	});
</script>

<Sphere bind:ref rotation.y={cubeRotation} {...restProps}></Sphere>
