<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/models/FlashLight.svelte';
	import { useInteractivity } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import RotationalLight from '$lib/components/threlte/light/RotationalLight.svelte';
	import { Vector3, type Group, type Object3D } from 'three';

	export type Props = {
		axis: 'x' | 'y';
	};
</script>

<script lang="ts">
	const { axis }: Props = $props();

	let flashLightRef: Group | undefined = undefined;
	const spotLightAngel = 1.2;
	const initialScale = 15;
	const scale = fromStore(
		spring(0, {
			stiffness: 0.1
		})
	);

	const { pointer } = useInteractivity();
	const spotLightRotation = $derived((axis === 'x' ? -$pointer.x : $pointer.y) * 1.5);

	function startDraggingState() {
		scale.current = initialScale;
	}

	function endDraggingState() {
		scale.current = initialScale - 3;
	}

	export function isIntersecting(target: Object3D, strictness = 3) {
		if (!flashLightRef) {
			throw new Error("FlashLight isn't created yet");
		}

		const flashLightDirection = new Vector3();
		const targetDirection = new Vector3();
		flashLightRef.getWorldDirection(flashLightDirection);
		target.getWorldDirection(targetDirection);
		const angleToTarget = flashLightDirection.angleTo(targetDirection);

		if (angleToTarget <= spotLightAngel / strictness) {
			return true;
		}

		return false;
	}

	export function moveOutOfView() {
		scale.current = 0;
	}

	onMount(() => {
		scale.current = initialScale;
	});
</script>

<FlashLight
	bind:ref={flashLightRef}
	scale={scale.current}
	onpointerdown={startDraggingState}
	onpointerleave={endDraggingState}
	onpointerup={endDraggingState}
	position={axis === 'x'
		? [$pointer.x * 15, $pointer.y * 2, 10]
		: [$pointer.x * 2, $pointer.y * 15, 10]}
	{...axis === 'x'
		? { rotation: [0, spotLightRotation, 0] }
		: { rotation: [spotLightRotation, 0, 0] }}>
	<RotationalLight angle={spotLightAngel} intensity={50} color={'white'} position={[0, 0, 0]} />
</FlashLight>
