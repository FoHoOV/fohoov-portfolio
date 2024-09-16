<script lang="ts" module>
	import Skill from '$lib/components/threlte/skills/Skill.svelte';

	import { bounds } from '$lib';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import type { Group } from 'three';

	const data = [
		{
			sphereColor: '#6c5254',
			icon: '/icons/svelte.svg'
		},
		{
			sphereColor: '#2e5255',
			icon: '/icons/fastapi.svg'
		},
		{
			sphereColor: '#6c5254',
			icon: '/icons/svelte.svg'
		},
		{
			sphereColor: '#fffff0',
			icon: '/icons/flask.svg'
		},
		{
			sphereColor: '#607885',
			icon: '/icons/tailwind.svg'
		},
		{
			sphereColor: '#ddd8d5',
			icon: '/icons/typescript.svg'
		}
	] as const satisfies Array<{
		sphereColor: string;
		icon: `/icons/${string}.svg`;
	}>;
</script>

<script lang="ts">
	const spheresRef = bounds<Group>(data.length);
	const timeLines: gsap.core.Timeline[] = Array(spheresRef.length).fill(null);
	const startingY = -12;

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
			const startingLocation = 2 + Math.random() * 2;
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
					y: startingLocation + 1,
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
	<Skill
		bind:ref={spheresRef.toBeBounds[i]}
		radius={2}
		rotationSpeed={0}
		position={{ x: (i - 2.5) * 6, y: startingY, z: Math.random() * 2 }}
		sphereColor={info.sphereColor}
		url={info.icon} />
{/each}
