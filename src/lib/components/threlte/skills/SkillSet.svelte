<script lang="ts" module>
	import { RandomPosition } from '$lib';
	import Skill from '$lib/components/threlte/skills/Skill.svelte';
	import { T, useThrelte, useTask } from '@threlte/core';
	import { data } from './skills';

	import { Spherical, Vector3, type Group } from 'three';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import { cubicInOut } from 'svelte/easing';
</script>

<script lang="ts">
	const radius = 2;
	const randomPositionBoxSize = 10;
	const randomPositionGenerator = new RandomPosition(randomPositionBoxSize, radius * 2);
	randomPositionGenerator.addForcedUseCell(
		randomPositionGenerator.positionToIndex({
			x: Math.ceil(randomPositionBoxSize / 2),
			y: Math.ceil(randomPositionBoxSize / 2),
			z: Math.ceil(randomPositionBoxSize / 2)
		})
	);

	const { camera } = useThrelte();
	const initialCameraPosition = camera.current.position;

	export async function moveOutOfView() {}

	function explode(group: Group) {
		const scale = fromStore(
			tweened(0, {
				duration: 2000,
				easing: cubicInOut
			})
		);

		scale.current = 1;
		const { stop } = useTask(() => {
			if (scale.current === 1) {
				stop();
			}

			group.rotation.y = (1 - scale.current) * 3 * Math.PI;
		});
	}

	function moveCameraAround() {
		let quotient = 1;
		let initialSphericalPosition = new Spherical().setFromVector3(initialCameraPosition);
		useTask(() => {
			const spherical = new Spherical().setFromVector3(camera.current.position);
			spherical.theta += 0.003;
			spherical.radius += 0.02 * quotient;
			if (
				spherical.radius <= initialSphericalPosition.radius / 2 ||
				spherical.radius >= (initialSphericalPosition.radius * 3) / 2
			) {
				quotient *= -1;
			}
			camera.current.position.setFromSpherical(spherical);
			camera.current.lookAt(0, 0, 0);
		});
	}

	onMount(() => {
		return () => {
			camera.current.position.copy(initialCameraPosition);
		};
	});
</script>

<T.PointLight position={[0, 0, 0]} intensity={50} castShadow></T.PointLight>

<T.Group
	position={[
		-randomPositionGenerator.maxDistance / 2,
		-randomPositionGenerator.maxDistance / 2,
		-randomPositionGenerator.maxDistance / 2
	]}
	oncreate={(ref) => {
		explode(ref);
		moveCameraAround();
	}}>
	{#each data as info (info)}
		<Skill
			{radius}
			position={new Vector3(...Object.values(randomPositionGenerator.generate()))}
			sphereColor={info.sphereColor}
			text={info.text}
			textColor={info.sphereColor}
			size={1.5}
			fontSize={1}
			enableReflection={false}
			url={'icon' in info ? info.icon : undefined} />
	{/each}
</T.Group>
