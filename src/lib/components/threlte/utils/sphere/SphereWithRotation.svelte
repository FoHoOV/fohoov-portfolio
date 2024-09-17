<script lang="ts" module>
	import Sphere, {
		type Props as SphereProps
	} from '$lib/components/threlte/utils/sphere/Sphere.svelte';
	import { useTask } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

	export type Props = {
		xRotation?: number;
		rotationSpeed?: number;
	} & SphereProps;
</script>

<script lang="ts">
	let {
		xRotation = 0,
		rotationSpeed = 3,
		ref = $bindable(undefined),
		...restProps
	}: Props = $props();

	let cubeRotation = $derived(fromStore(spring(xRotation)));

	useTask((delta) => {
		cubeRotation.current += (delta * rotationSpeed) / 5;
	});
</script>

<Sphere bind:ref rotation.y={cubeRotation.current} {...restProps}></Sphere>
