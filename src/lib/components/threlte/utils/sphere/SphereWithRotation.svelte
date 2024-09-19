<script lang="ts" module>
	import Sphere, {
		type Props as SphereProps
	} from '$lib/components/threlte/utils/sphere/Sphere.svelte';
	import { useTask } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';

	export type Props = {
		yRotation?: number;
		rotationSpeed?: number;
	} & SphereProps;
</script>

<script lang="ts">
	let {
		yRotation = 0,
		rotationSpeed = 3,
		ref = $bindable(undefined),
		...restProps
	}: Props = $props();

	useTask((delta) => {
		ref!.rotation.y += (delta * rotationSpeed) / 5;
	});
</script>

<Sphere bind:ref rotation.y={yRotation} {...restProps}></Sphere>
