<script lang="ts" module>
	import { RandomPosition } from '$lib';
	import SphereWithText from '$lib/components/threlte/utils/sphere/SphereWithText.svelte';

	import { Vector3 } from 'three';
</script>

<script lang="ts">
	const numberOfItems = 10;
	const radius = 1;
	const randomPositionGenerator = new RandomPosition(numberOfItems);
	export async function moveOutOfView() {}
</script>

{#each { length: numberOfItems } as _}
	<SphereWithText
		fontSize={20}
		{radius}
		sphereColor={'red'}
		textColor={'white'}
		rotationSpeed={5}
		position={new Vector3(...Object.values(randomPositionGenerator.generate()))
			.multiplyScalar(radius * 2)
			.subScalar(numberOfItems)}
		text="s {randomPositionGenerator.noOfUsedCells().toString()}"></SphereWithText>
{/each}
