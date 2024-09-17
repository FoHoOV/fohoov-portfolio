<script lang="ts" module>
	import Skill from '$lib/components/threlte/skills/Skill.svelte';

	import { bounds } from '$lib';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import type { Group, Vector3Like } from 'three';

	const startingY = -12;
	const data = [
		{
			sphereColor: '#6c5254',
			icon: '/icons/svelte.svg',
			text: 'Svelte',
			position: {
				x: -10,
				y: startingY,
				z: 0
			}
		},
		{
			sphereColor: '#2e5255',
			icon: '/icons/fastapi.svg',
			text: 'Fast API',
			position: {
				x: -10,
				y: startingY,
				z: 0
			}
		},
		{
			sphereColor: '#fffff0',
			icon: '/icons/flask.svg',
			text: 'Flask',
			position: {
				x: 0,
				y: startingY,
				z: 0
			}
		},
		{
			sphereColor: '#6c5254',
			icon: '/icons/svelte.svg',
			text: 'SvelteKit',
			position: {
				x: 0,
				y: startingY,
				z: 0
			}
		},
		{
			sphereColor: '#607885',
			icon: '/icons/tailwind.svg',
			text: 'Tailwind',
			position: {
				x: 10,
				y: startingY,
				z: 0
			}
		},
		{
			sphereColor: '#ddd8d5',
			icon: '/icons/typescript.svg',
			text: 'Typescript',
			position: {
				x: 10,
				y: startingY,
				z: 0
			}
		}
	] as const satisfies Array<{
		sphereColor: string;
		icon: `/icons/${string}.svg`;
		position: Vector3Like;
		text: string;
	}>;
</script>

<script lang="ts">
	const spheresRef = bounds<Group>(data.length);
	const timeLines: gsap.core.Timeline[] = Array(spheresRef.length).fill(null);

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
			$effect(() => {
				if (noOfRevertedAnimations == timeLines.length) {
					resolve();
				}
			});
		});
	}

	onMount(() => {
		spheresRef.bounds.forEach((sphere, i) => {
			timeLines[i] = gsap.timeline();
			const endingY = i % 2 == 0 ? -3 + Math.random() * 2 : 4 + Math.random() * 2;
			timeLines[i]
				.addLabel('start')
				.to(sphere.position, {
					delay: Math.random(),
					y: endingY,
					duration: 3,
					ease: 'elastic.out'
				})
				.addLabel('bounce')
				.to(sphere.position, {
					y: endingY + 1,
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
		radius={2.8}
		position={info.position}
		sphereColor={info.sphereColor}
		text={info.text}
		textColor={info.sphereColor}
		fontSize={2}
		url={info.icon} />
{/each}
