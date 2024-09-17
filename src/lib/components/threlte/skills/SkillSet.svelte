<script lang="ts" module>
	import Skill from '$lib/components/threlte/skills/Skill.svelte';

	import { bounds } from '$lib';
	import { gsap } from 'gsap';
	import { onMount } from 'svelte';
	import type { Group } from 'three';
	import { data, startingY } from './skills';
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
		fontSize={1}
		url={info.icon} />
{/each}
