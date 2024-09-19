<script lang="ts" module>
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';
	import { useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
</script>

<script lang="ts">
	const { camera } = useThrelte();
	const xRotation = fromStore(
		spring(Math.PI, {
			stiffness: 0.07
		})
	);
	onMount(() => {
		xRotation.current = 0;
	});
</script>

<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	position={[-15, 0, 0]}></ArtBoard>
<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	position={[0, 0, 0]}></ArtBoard>
<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	position={[15, 0, 0]}></ArtBoard>
