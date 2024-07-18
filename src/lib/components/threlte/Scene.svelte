<script lang="ts" context="module">
	import SphereWithText from '$lib/components/threlte/SphereWithText.svelte';
	import {
		calculateSphericalPathBetweenPoints,
		calculateSphericalPathForOrbit,
		type SphericalAngles
	} from '$lib/utils';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { Mesh, Vector3, type Vector3Like } from 'three';
</script>

<script lang="ts">
	const { camera } = useThrelte();
	const initialPosition = new Vector3(
		$camera.position.x,
		$camera.position.y,
		$camera.position.z + 5
	);

	const data: Array<{
		text: string;
		textColor: string;
		sphereColor: string;
		position: Vector3 | Vector3Like;
	}> = [
		{
			text: 'first',
			textColor: '#ffffff',
			sphereColor: '#000000',
			position: initialPosition.clone()
		},
		{
			text: 'second',
			textColor: '#ffff00',
			sphereColor: '#0000ff',
			position: initialPosition.clone()
		},
		{
			text: 'third',
			textColor: '#ffff00',
			sphereColor: '#00ffff',
			position: initialPosition.clone()
		},
		{
			text: 'fourth',
			textColor: '#000000',
			sphereColor: '#ffffff',
			position: initialPosition.clone()
		}
	];
	const spheresRef: Array<Mesh> = $state(Array(data.length).fill(null));
	$effect(() => {
		if (spheresRef.length !== data.length) {
			return;
		}
		animate();
	});

	function animate(index = 0) {
		if (index == spheresRef.length) {
			return;
		}
		// setTimeout(() => {
		// 	orbitSphere(spheresRef[index]);
		// 	animate(index + 1);
		// }, 1000);
		moveSpheresToStartingLocation(gsap.timeline());
	}

	function moveSpheresToStartingLocation(startingLocationTimeLine: gsap.core.Timeline) {
		const endingPosition = new Vector3(9, 1, 0);
		const radius = 15;
		const rotation = -2 * Math.PI;
		for (const sphere of spheresRef) {
			const { startingPoint, endingPoint, center, generatePositionFromSpherical } =
				calculateSphericalPathBetweenPoints(sphere.position, endingPosition, radius, rotation);

			startingLocationTimeLine.to(
				startingPoint,
				{
					theta: endingPoint.theta,
					phi: endingPoint.phi,
					duration: 1,
					ease: 'none',
					onUpdate: () => {
						sphere.position.copy(
							generatePositionFromSpherical(startingPoint.phi, startingPoint.theta)
						);
					},
					onComplete: () => {
						orbitSphere(sphere);
					}
				},
				'<2'
			);
		}
	}

	function orbitSphere(sphere: Mesh) {
		const { startingPoint, endingPoint, generatePositionFromSpherical } =
			calculateSphericalPathForOrbit(sphere.position, new Vector3(0, 0, 0), { axis: 'theta' });
		gsap.to(startingPoint, {
			theta: endingPoint.theta,
			phi: endingPoint.phi,
			duration: 10,
			repeat: -1,
			ease: 'none',
			onUpdate: () => {
				const newPosition = generatePositionFromSpherical(startingPoint.phi, startingPoint.theta);
				sphere.position.copy(newPosition);
			}
		});
	}
</script>

{#each data as info, i (info)}
	<SphereWithText
		bind:ref={spheresRef[i]}
		text={info.text}
		radius={1.2}
		fontSize={1}
		rotationSpeed={5}
		position={info.position}
		sphereColor={info.sphereColor}
		textColor={info.textColor}></SphereWithText>
{/each}
