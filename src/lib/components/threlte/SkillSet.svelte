<script lang="ts" module>
	import SphereWithImage from '$lib/components/threlte/SphereWithImage.svelte';

	import { bounds } from '$lib';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import { Mesh } from 'three';

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
	const spheresRef = bounds<Mesh>(data.length);
	const timeLines: gsap.core.Timeline[] = Array(spheresRef.length).fill(null);
	const startingY = -10;

	export function moveOutOfView() {
		return new Promise<void>((resolve) => {
			let noOfRevertedAnimations = $state(0);
			timeLines.forEach((timeLine, i) => {
				gsap.to(spheresRef.bounds[i].position, {
					y: startingY,
					delay: Math.random(),
					duration: 2,
					ease: 'elastic.in',
					onStart() {
						timeLine.kill();
					},
					onComplete() {
						noOfRevertedAnimations += 1;
					}
				});
			});
			const cleanup = $effect.root(() => {
				$effect(() => {
					if (noOfRevertedAnimations == timeLines.length) {
						resolve();
						cleanup();
					}
				});
			});
		});
	}

	onMount(() => {
		spheresRef.bounds.forEach((sphere, i) => {
			timeLines[i] = gsap.timeline();
			const startingLocation = 2 + Math.random() * 5;
			timeLines[i]
				.addLabel('start')
				.to(sphere.position, {
					delay: Math.random(),
					y: startingLocation,
					duration: 3,
					ease: 'elastic.out'
				})
				.addLabel('bounce')
				.to(sphere.position, {
					y: startingLocation + 2,
					yoyo: true,
					duration: 3,
					repeat: -1,
					ease: 'sine.inOut'
				});
		});
		return () => {
			timeLines.forEach((timeLine) => {
				timeLine.kill();
			});
		};
	});
</script>

{#each data as info, i (info)}
	<SphereWithImage
		bind:ref={spheresRef.toBeBounds[i]}
		radius={2}
		rotationSpeed={0}
		position={{ x: (i - 1.5) * 6, y: startingY, z: Math.random() * 2 }}
		sphereColor={info.sphereColor}
		url={'/icons/svelte.svg'} />
{/each}
