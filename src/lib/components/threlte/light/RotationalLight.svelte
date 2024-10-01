<script lang="ts" module>
	import { T, type Props as ThrelteProps } from '@threlte/core';
	import { onMount } from 'svelte';
	import { Object3D } from 'three';
	import type { SpotLight } from 'three/src/lights/SpotLight.js';
	import type { Vector3, Vector3Like } from 'three/src/math/Vector3.js';

	export type Props = {
		position?: Vector3 | Vector3Like | [x: number, y: number, z: number];
		rotation?: Vector3Like;
	} & ThrelteProps<typeof SpotLight>;
</script>

<script lang="ts">
	const { position, rotation, ...lightProps }: Props = $props();

	let objRef: Object3D | undefined = undefined;
	let spotlightRef: SpotLight | undefined = undefined;

	onMount(() => {
		if (!spotlightRef || !objRef) {
			throw new Error('RotationalLight refs are not bound yet');
		}
		spotlightRef.target = objRef;
	});
</script>

<T.Group {position}>
	<T.Object3D bind:ref={objRef} position.z={-1} {rotation}></T.Object3D>
	<T.SpotLight bind:ref={spotlightRef} position={[0, 0, 0]} {...lightProps}></T.SpotLight>
</T.Group>
