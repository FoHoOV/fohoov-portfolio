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

<Responsive>
	{#snippet children({ device })}
		<FlashLight bind:this={flashLightRef} axis={device === 'desktop' ? 'x' : 'y'} />

		{@const gap = 5}
		{@const eachProjectWidth = device === 'desktop' ? 10 : 1}
		<Flex
			width={2 * eachProjectWidth + gap}
			height={2 * eachProjectWidth + gap}
			{gap}
			flexDirection={device == 'desktop' ? 'Row' : 'Column'}
			alignItems={'Stretch'}
			justifyContent={'SpaceBetween'}>
			{#each projects as project}
				<Box width="auto" height="auto" flex={1} paddingTop={3}>
					{#snippet children({ width })}
						<Project
							size={width}
							projectUrl={project.projectUrl}
							imageUrl={project.imageUrl}
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
