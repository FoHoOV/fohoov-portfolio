<script lang="ts" context="module">
	import { T, useTask } from '@threlte/core';
	import { spring } from 'svelte/motion';
	import { MeshBasicMaterial, MeshDepthMaterial, MeshStandardMaterial } from 'three';
	import { MeshGouraudMaterial } from 'three/examples/jsm/Addons.js';
</script>

<script lang="ts">
	const numberOfCubes = 4;
	const spreadRadius = 10;
	const positions = Array.from({
		length: numberOfCubes
	}).map((_, i) => {
		return getRandomPosition(i);
	});

	function getRandomPosition(index: number) {
		const negativeYFlag = index < numberOfCubes / 2;
		const cords = $state({
			x: -1,
			y: negativeYFlag ? -index : index
		});
		let numberOfUpdates = 0;
		useTask((diff) => {
			if (numberOfUpdates > 10) {
				return;
			}
			cords.x += diff;
			cords.y += (negativeYFlag ? -1 : 1) * diff;
		});
		return cords;
	}
</script>

{#each { length: numberOfCubes } as _, i}
	<T.Mesh position.x={positions[i].x} position.y={positions[i].y} position.z={0}>
		<T.BoxGeometry></T.BoxGeometry>
		<T.MeshStandardMaterial color="orange"></T.MeshStandardMaterial>
	</T.Mesh>
{/each}
