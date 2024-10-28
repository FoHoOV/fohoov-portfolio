<script lang="ts" module>
	import Project from '$lib/components/threlte/projects/Project.svelte';
	import FlashLight from '$lib/components/threlte/projects/FlashLight.svelte';
	import Responsive from '$lib/components/threlte/responsive/Responsive.svelte';
	import { Flex, Box } from '@threlte/flex';

	import { type ComponentExports } from '$lib/utils';
	import { useThrelte } from '@threlte/core';
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import { lookAt } from '$lib/utils/threlte/look-at';
	import { projects } from '$lib/components/threlte/projects/projects';
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

<Responsive>
	{#snippet children({ device })}
		<Flex
			width={device == 'desktop' ? 25 : 10}
			flexDirection={device == 'desktop' ? 'Row' : 'Column'}
			gap={5}
			alignItems={'Center'}
			justifyContent={'SpaceBetween'}>
			{#each projects as project}
				<Box flex={1}>
					{#snippet children({ width })}
						<Project
							projectUrl={project.projectUrl}
							imageUrl={project.imageUrl}
							size={width}
							flashLight={flashLightRef}
							rotation.x={xRotation.current}
							oncreate={(e) => lookAt(e, camera.current)}
							artBoardProps={{
								materialProps: {
									opacity: opacity.current
								}
							}}
							center={{
								text: project.name
							}}>
						</Project>
					{/snippet}
				</Box>
			{/each}
		</Flex>
	{/snippet}
</Responsive>
