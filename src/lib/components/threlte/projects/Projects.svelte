<script lang="ts" module>
	import Project from '$lib/components/threlte/projects/Project.svelte';
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import { type ComponentExports } from '$lib/utils';
	import { T, useThrelte } from '@threlte/core';
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

	export function moveOutOfView() {
		opacity.current = 0;
		xRotation.current = Math.PI;
		flashLightRef?.moveOutOfView();

		const promise = new Promise<void>((resolve) => {
			const cleanup = $effect.root(() => {
				$effect(() => {
					if (opacity.current == 0) {
						resolve();
						cleanup();
					}
				});
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
	projectUrl="https://project-management-fohoov.vercel.app/user/projects"
	imageUrl="/images/project-management-dark.png"
	flashLight={flashLightRef}
	rotation.x={xRotation.current}
	position={[-10, 0, 0]}
	oncreate={(e) => e.lookAt(camera.current.position)}
	artBoardProps={{
		materialProps: {
			opacity: opacity.current
		}
	}}
	center={{
		text: 'Project management'
	}}>
</Project>

<Project
	projectUrl="https://project-management-fohoov.vercel.app/user/projects"
	imageUrl="/images/project-management-dark.png"
	flashLight={flashLightRef}
	rotation.x={xRotation.current}
	position={[10, 0, 0]}
	oncreate={(e) => e.lookAt(camera.current.position)}
	artBoardProps={{
		materialProps: {
			opacity: opacity.current
		}
	}}
	center={{
		text: 'Sam Steel Sina'
	}}>
</Project>
