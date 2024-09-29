<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/models/FlashLight.svelte';
	import { useInteractivity } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import RotationalLight from '$lib/components/threlte/light/ RotationalLight.svelte';
	import { Vector3, type Group, type Object3D } from 'three';
</script>

<script lang="ts">
	let componentState: 'moving' | 'stable' = $state('stable');
	let flashLightRef: Group | undefined = undefined;

	const spotLightAngel = 1.2;

	const scale = fromStore(
		spring(0, {
			stiffness: 0.1
		})
	);

	const { pointer } = useInteractivity();
	const spotLightYRotation = $derived(-$pointer.x);

	function startDraggingState() {
		componentState = 'moving';
		scale.current = 33;
	}

	function endDraggingState() {
		componentState = 'stable';
		scale.current = 30;
	}

	export function isIntersecting(target: Object3D, easiness = 2) {
		if (!flashLightRef) {
			throw new Error("FlashLight isn't created yet");
		}
		const distance = target.position.clone().sub(flashLightRef.position);
		const directionToTarget = distance.clone().normalize();
		const angelToTarget = new Vector3(0, spotLightYRotation, -1).angleTo(directionToTarget);

		if (angelToTarget <= spotLightAngel / easiness) {
			return true;
		}

		return false;
	}

	onMount(() => {
		scale.current = 30;
	});
</script>

<FlashLight
	bind:ref={flashLightRef}
	position={[$pointer.x * 15, $pointer.y * 10, 10]}
	rotation.y={spotLightYRotation}
	scale={scale.current}
	onpointerdown={startDraggingState}
	onpointerleave={endDraggingState}
	onpointerup={endDraggingState}>
	<RotationalLight angle={spotLightAngel} intensity={300} color={'white'} position={[0, 0, 0]} />
</FlashLight>
