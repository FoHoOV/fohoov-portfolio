<script lang="ts" module>
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import ArtBoard from '$lib/components/threlte/utils/artboard/ArtBoard.svelte';
	import { useThrelte, T } from '@threlte/core';
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
	const opacity = fromStore(spring(0));

	export async function moveOutOfView() {
		opacity.current = 0;
		xRotation.current = Math.PI;

		const promise = new Promise<void>((resolve) => {
			const cleanup = $effect.root(() => {
				if (opacity.current == 0) {
					resolve();
					cleanup();
				}
			});
		});
		return promise;
	}

	onMount(() => {
		xRotation.current = 0;
		opacity.current = 1;
	});
</script>

<FlashLight />

<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	materialProps={{
		opacity: opacity.current
	}}
	position={[-15, 0, 0]}></ArtBoard>
<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	materialProps={{
		opacity: opacity.current
	}}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	position={[0, 0, 0]}></ArtBoard>
<ArtBoard
	url="/images/project-management-dark.png"
	rotation.x={xRotation.current}
	materialProps={{
		opacity: opacity.current
	}}
	oncreate={(e) => {
		e.lookAt(camera.current.position);
	}}
	position={[15, 0, 0]}></ArtBoard>
