<script lang="ts" module>
	import { RandomPosition } from '$lib';
	import Skill from '$lib/components/threlte/skills/Skill.svelte';
	import { T, useThrelte, useTask } from '@threlte/core';
	import { Stars } from '@threlte/extras';
	import { data } from './skills';

	import { Spherical, Vector3 } from 'three';
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { fromStore } from 'svelte/store';
	import { cubicInOut, cubicOut } from 'svelte/easing';

	const CAMERA_OUT_RADIUS = 1000;
	const RADIUS = 2;
	const RANDOM_POSITION_BOX_SIZE = 10;
</script>

<script lang="ts">
	const randomPositionGenerator = new RandomPosition(RANDOM_POSITION_BOX_SIZE, RADIUS * 2);

	randomPositionGenerator.addForcedUseCell(
		randomPositionGenerator.positionToIndex({
			x: Math.ceil(RANDOM_POSITION_BOX_SIZE / 2),
			y: Math.ceil(RANDOM_POSITION_BOX_SIZE / 2),
			z: Math.ceil(RANDOM_POSITION_BOX_SIZE / 2)
		})
	);

	const { camera } = useThrelte();
	const initialCameraPosition = camera.current.position.clone();
	const initialCameraRotation = camera.current.rotation.clone();

	let currentAnimation: 'intro' | 'circle-around' | 'outro' | 'finished' = $state('intro');

	export async function moveOutOfView() {
		currentAnimation = 'outro';
		return new Promise<void>((resolve) => {
			const cleanup = $effect.root(() => {
				$effect(() => {
					if (currentAnimation === 'finished') {
						resolve();
						cleanup();
					}
				});
			});
		});
	}

	function introAnimation(initialSphericalPosition: Spherical) {
		let movedCamera = new Spherical().copy(initialSphericalPosition);

		movedCamera.radius = CAMERA_OUT_RADIUS;
		camera.current.position.setFromSpherical(movedCamera);

		const radiusTweened = fromStore(
			tweened(movedCamera.radius, {
				easing: cubicOut,
				duration: 1500
			})
		);

		const rotationTweened = fromStore(
			tweened(initialSphericalPosition.theta, {
				easing: cubicInOut,
				duration: 1500
			})
		);

		let isInitialized = false;
		const init = () => {
			radiusTweened.current = Math.floor(initialSphericalPosition.radius);
			rotationTweened.current += Math.PI * 2;
		};

		return () => {
			if (!isInitialized) {
				init();
				isInitialized = true;
			}

			const spherical = new Spherical().setFromVector3(camera.current.position);

			spherical.radius = radiusTweened.current;
			spherical.theta = rotationTweened.current;

			if (spherical.radius <= initialSphericalPosition.radius) {
				currentAnimation = 'circle-around';
			}

			camera.current.position.setFromSpherical(spherical);
			camera.current.lookAt(0, 0, 0);
		};
	}

	function circleAroundAnimation(initialSphericalPosition: Spherical) {
		let quotient = 1;

		return () => {
			const spherical = new Spherical().setFromVector3(camera.current.position);

			spherical.radius += 0.02 * quotient;
			spherical.theta += 0.005;

			if (
				spherical.radius <= initialSphericalPosition.radius / 2 ||
				spherical.radius >= (initialSphericalPosition.radius * 3) / 2
			) {
				quotient *= -1;
			}

			camera.current.position.setFromSpherical(spherical);
			camera.current.lookAt(0, 0, 0);
		};
	}

	function outroAnimation() {
		let radiusTweened = { current: 0 };
		let rotationTweened = { current: 0 };

		let isInitialized = false;
		const init = () => {
			const initialSphericalPosition = new Spherical().setFromVector3(camera.current.position);

			radiusTweened = fromStore(
				tweened(initialSphericalPosition.radius, {
					easing: cubicInOut,
					duration: 1000
				})
			);

			rotationTweened = fromStore(
				tweened(initialSphericalPosition.theta, {
					easing: cubicInOut,
					duration: 1000
				})
			);
			radiusTweened.current = CAMERA_OUT_RADIUS;
			rotationTweened.current -= Math.PI * 2;
		};

		return () => {
			if (!isInitialized) {
				init();
				isInitialized = true;
			}

			const spherical = new Spherical().setFromVector3(camera.current.position);

			spherical.radius = radiusTweened.current;
			spherical.theta = rotationTweened.current;

			if (spherical.radius >= CAMERA_OUT_RADIUS) {
				currentAnimation = 'finished';
			}

			camera.current.position.setFromSpherical(spherical);
			camera.current.lookAt(0, 0, 0);
		};
	}

	function animate() {
		let initialSphericalPosition = new Spherical().setFromVector3(initialCameraPosition);

		const intro = introAnimation(initialSphericalPosition);
		const circleAround = circleAroundAnimation(initialSphericalPosition);
		const outro = outroAnimation();

		useTask(() => {
			switch ($state.snapshot(currentAnimation)) {
				case 'intro':
					intro();
					break;
				case 'circle-around':
					circleAround();
					break;
				case 'outro':
					outro();
					break;
				case 'finished':
					break;
				default:
					throw new Error('unhandled animation state');
			}
		});
	}

	onMount(() => {
		return () => {
			camera.current.position.copy(initialCameraPosition);
			camera.current.rotation.set(
				initialCameraRotation.x,
				initialCameraRotation.y,
				initialCameraRotation.z
			);
		};
	});
</script>

<T.PointLight position={[0, 0, 0]} intensity={50} castShadow></T.PointLight>

<Stars count={200} fade={true} lightness={0.2}></Stars>
<T.Group
	position={[
		-randomPositionGenerator.maxDistance / 2,
		-randomPositionGenerator.maxDistance / 2,
		-randomPositionGenerator.maxDistance / 2
	]}
	oncreate={() => {
		animate();
	}}>
	{#each data as info (info)}
		<Skill
			radius={RADIUS}
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
