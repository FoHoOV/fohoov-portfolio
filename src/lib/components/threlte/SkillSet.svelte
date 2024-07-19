<script lang="ts" context="module">
	import SphereWithText from '$lib/components/threlte/SphereWithText.svelte';
	import { calculateSphericalPathBetweenPoints, calculateSphericalPathForOrbit } from '$lib/utils';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { Mesh, Vector3, type Vector3Like } from 'three';
</script>

<script lang="ts">
	const { camera } = useThrelte();
	const initialPosition = new Vector3(
		$camera.position.x - 3,
		$camera.position.y,
		$camera.position.z + 2
	);

	const data: Array<{
		text: string;
		textColor: string;
		sphereColor: string;
		position: Vector3 | Vector3Like;
	}> = [
		{
			text: 'Svelte',
			textColor: '#000000',
			sphereColor: '#a0bad0',
			position: initialPosition.clone()
		},
		{
			text: 'Fast Api',
			textColor: '#000000',
			sphereColor: '#a0bad0',
			position: initialPosition.clone()
		},
		{
			text: 'Sveltekit',
			textColor: '#000000',
			sphereColor: '#a0bad0',
			position: initialPosition.clone()
		},
		{
			text: 'Flask',
			textColor: '#000000',
			sphereColor: '#a0bad0',
			position: initialPosition.clone()
		},
		{
			text: 'Tailwind',
			textColor: '#000000',
			sphereColor: '#a0bad0',
			position: initialPosition.clone()
		},
		{
			text: 'JS - TS',
			textColor: '#000000',
			sphereColor: '#a0bad0',
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
		moveSpheresToPosition(
			{ x: 11, y: 1, z: 0 },
			{
				onSphereAnimationCompleted(sphere) {
					orbitSphere(sphere);
				}
			}
		);
	}

	export function moveSpheresToPosition(
		position: Vector3Like,
		events?: {
			onSphereAnimationCompleted?: (sphere: Mesh) => void;
			onTimelineCompleted?: () => void;
		}
	) {
		const timeLine = gsap.timeline({
			onComplete: () => {
				events?.onTimelineCompleted?.();
			}
		});
		const endingPosition = new Vector3(position.x, position.y, position.z);
		const radius = 16;
		const rotation = -1 * Math.PI;

		for (const sphere of spheresRef) {
			const { startingPoint, endingPoint, center, generatePositionFromSpherical } =
				calculateSphericalPathBetweenPoints(sphere.position, endingPosition, radius, rotation);

			timeLine.to(
				startingPoint,
				{
					theta: endingPoint.theta,
					phi: endingPoint.phi,
					duration: 2,
					ease: 'expo',
					onUpdate: () => {
						sphere.position.copy(
							generatePositionFromSpherical(startingPoint.phi, startingPoint.theta)
						);
					},
					onComplete: () => {
						events?.onSphereAnimationCompleted?.(sphere);
					}
				},
				'<1.5'
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

	export function moveSpheresOutOfView() {
		return new Promise<void>((resolve) => {
			moveSpheresToPosition(
				{ x: $camera.position.x, y: $camera.position.y, z: $camera.position.z },
				{
					onTimelineCompleted() {
						resolve();
					}
				}
			);
		});
	}
</script>

{#each data as info, i (info)}
	<SphereWithText
		bind:ref={spheresRef[i]}
		text={info.text}
		radius={2}
		fontSize={1}
		rotationSpeed={5}
		position={info.position}
		sphereColor={info.sphereColor}
		textColor={info.textColor}></SphereWithText>
{/each}
