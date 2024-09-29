<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/models/FlashLight.svelte';
	import { useInteractivity } from '@threlte/extras';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import RotationalLight from '$lib/components/threlte/light/ RotationalLight.svelte';
</script>

<script lang="ts">
	let componentState: 'moving' | 'stable' = $state('stable');
	const scale = fromStore(
		spring(0, {
			stiffness: 0.1
		})
	);

	const { pointer } = useInteractivity();

	function startDraggingState() {
		componentState = 'moving';
		scale.current = 33;
	}

	function endDraggingState() {
		componentState = 'stable';
		scale.current = 30;
	}

	onMount(() => {
		scale.current = 30;
	});
</script>

<FlashLight
	position={[$pointer.x * 15, $pointer.y * 10, 5]}
	rotation.y={-$pointer.x}
	scale={scale.current}
	onpointerdown={startDraggingState}
	onpointerleave={endDraggingState}
	onpointerup={endDraggingState}>
	<RotationalLight angle={1} intensity={500} color={'white'} position={[0, 0, 0]} />
</FlashLight>
