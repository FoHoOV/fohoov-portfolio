<script lang="ts" module>
	import Project from '$lib/components/threlte/projects/Project.svelte';
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import { type ComponentExports } from '$lib/utils';
	import { useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
</script>

<script lang="ts">
	let flashLightRef: ComponentExports<typeof FlashLight> | undefined = $state(undefined);

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

<FlashLight bind:this={flashLightRef} />

<Project
	url="/images/project-management-dark.png"
	flashLight={flashLightRef}
	rotation.x={xRotation.current}
	position={[-15, 0, 0]}
	oncreate={(e) => e.lookAt(camera.current.position)}
	artBoardProps={{
		materialProps: {
			opacity: opacity.current
		}
	}}
	textProps={{
		text: 'Project management'
	}}>
</Project>

<Project
	url="/images/project-management-dark.png"
	flashLight={flashLightRef}
	rotation.x={xRotation.current}
	position={[0, 0, 0]}
	oncreate={(e) => e.lookAt(camera.current.position)}
	artBoardProps={{
		materialProps: {
			opacity: opacity.current
		}
	}}
	textProps={{
		text: 'Sam Steel Sina'
	}}>
</Project>

<Project
	url="/images/project-management-dark.png"
	flashLight={flashLightRef}
	rotation.x={xRotation.current}
	position={[15, 0, 0]}
	oncreate={(e) => e.lookAt(camera.current.position)}
	artBoardProps={{
		materialProps: {
			opacity: opacity.current
		}
	}}
	textProps={{
		text: 'To be or not to be'
	}}>
</Project>
