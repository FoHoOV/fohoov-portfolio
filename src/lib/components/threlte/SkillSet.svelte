<script lang="ts" context="module">
	import SphereWithText from '$lib/components/threlte/SphereWithText.svelte';
	import { calculateSphericalPathBetweenPoints, calculateSphericalPathForOrbit } from '$lib/utils';
	import { useThrelte } from '@threlte/core';
	import { gsap } from 'gsap';
	import { Mesh, Vector3, type Vector3Like } from 'three';

	const data = [
		{
			text: 'Svelte',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		},
		{
			text: 'Fast Api',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		},
		{
			text: 'Sveltekit',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		},
		{
			text: 'Flask',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		},
		{
			text: 'Tailwind',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		},
		{
			text: 'JS - TS',
			textColor: '#000000',
			sphereColor: '#a0bad0'
		}
	] as const satisfies Array<{
		text: string;
		textColor: string;
		sphereColor: string;
	}>;
</script>

<script lang="ts">
	const { camera } = useThrelte();
	const spheresRef: Array<Mesh> = $state(Array(data.length).fill(null));
	const orbitTweenReferences = new Map<Mesh, gsap.core.Tween>();

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

	function moveSpheresToPosition(
		position: Vector3Like,
		events?: {
			onSphereAnimationCompleted?: (sphere: Mesh) => void;
			onTimelineCompleted?: () => void;
			onAnimationStarted?: (sphere: Mesh) => void;
		}
	) {
		const timeLine = gsap.timeline({
			delay: 0,
			onComplete: () => {
				events?.onTimelineCompleted?.();
			}
		});
		const endingPosition = new Vector3(position.x, position.y, position.z);
		const rotation = -1 * Math.PI;

		for (const sphere of spheresRef) {
			const radius = endingPosition.distanceTo(sphere.position) + 2;
			const { startingPoint, endingPoint, center, generatePositionFromSpherical } =
				calculateSphericalPathBetweenPoints(sphere.position, endingPosition, radius, rotation);

			timeLine.to(
				startingPoint,
				{
					theta: endingPoint.theta,
					phi: endingPoint.phi,
					duration: 2,
					ease: 'expo',
					onStart: () => {
						events?.onAnimationStarted?.(sphere);
					},
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
		const tween = gsap.to(startingPoint, {
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
		orbitTweenReferences.set(sphere, tween);
	}

	export function moveSpheresOutOfView() {
		return new Promise<void>((resolve) => {
			moveSpheresToPosition(
				{ x: $camera.position.x + 5, y: $camera.position.y, z: $camera.position.z + 5 },
				{
					onAnimationStarted(sphere) {
						const tween = orbitTweenReferences.get(sphere);
						tween?.pause();
						tween && orbitTweenReferences.delete(sphere);
					},
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
		position={{ x: $camera.position.x - 3, y: $camera.position.y, z: $camera.position.z + 2 }}
		sphereColor={info.sphereColor}
		textColor={info.textColor}></SphereWithText>
{/each}
