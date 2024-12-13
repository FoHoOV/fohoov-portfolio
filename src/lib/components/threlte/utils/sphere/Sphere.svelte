<script lang="ts" module>
	import { generateReflectionTexture } from '$lib/utils';
	import { T, type Props as ThrelteProps } from '@threlte/core';
	import type { Snippet } from 'svelte';
	import {
		type ColorRepresentation,
		type Vector3,
		type Color,
		type Group,
		type Vector3Like,
		AddOperation
	} from 'three';

	export type Props = {
		position: Vector3 | Vector3Like;
		radius: number;
		sphereColor?: Color | ColorRepresentation;
		roughness?: number;
		metalness?: number;
		/**
		 * @default true
		 */
		enableReflection?: boolean;
		ref?: Group | undefined;
		children?: Snippet;
	} & Omit<ThrelteProps<typeof Group>, 'position' | 'ref' | 'children'>;
</script>

<script lang="ts">
	let {
		radius,
		position,
		sphereColor,
		roughness = 0.1,
		metalness = 0.98,
		ref = $bindable(undefined),
		enableReflection = true,
		children,
		...restProps
	}: Props = $props();

	const sphereEnvMap = $derived(enableReflection && ref ? generateReflectionTexture(ref) : null);
</script>

<T.Group bind:ref position={[position.x, position.y, position.z]} {...restProps}>
	<T.Mesh>
		<T.SphereGeometry args={[radius - 0.05]} />
		<T.MeshStandardMaterial
			color={sphereColor ?? 'black'}
			{roughness}
			{metalness}
			combine={AddOperation}
			envMap={sphereEnvMap?.texture}></T.MeshStandardMaterial>
	</T.Mesh>

	{@render children?.()}
</T.Group>
