<script lang="ts" module>
	import { T, useLoader, useParent, type Props as ThrelteProps } from '@threlte/core';
	import { ClampToEdgeWrapping, MeshStandardMaterial, Texture, Mesh } from 'three';
	import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

	function isMesh(value: unknown): value is Mesh {
		return typeof value == 'object' && value !== null && 'type' in value && value.type === 'Mesh';
	}
	export type Props = {
		url: string;
	} & Omit<ThrelteProps<typeof MeshStandardMaterial>, 'transparent' | 'map'>;
</script>

<script lang="ts">
	const { url, ...restProps }: Props = $props();

	const material = new MeshStandardMaterial();
	const parent = useParent();

	const meshGeometry = $derived.by(() => {
		const mesh = $parent;
		if (mesh === undefined) {
			return;
		}

		if (!isMesh(mesh)) {
			return;
		}

		const geometry = mesh.geometry;
		const scale = mesh.scale;
		// Support arbitrary plane geometries (for instance with rounded corners)
		if (geometry !== undefined && 'parameters' in geometry) {
			const { width, height } = geometry.parameters as { width: number; height: number };
			return { width, height, scale };
		}
		return { scale };
	});

	function adjustTextureScaling(texture: Texture, meshAspect: number, imageAspect: number) {
		let offsetX = 0,
			offsetY = 0,
			repeatX = 1,
			repeatY = 1;
		if (imageAspect > meshAspect) {
			const scale = meshAspect / imageAspect;
			repeatX = scale;
			offsetX = (1 - repeatX) / 2;
		} else {
			const scale = imageAspect / meshAspect;
			repeatY = scale;
			offsetY = (1 - repeatY) / 2;
		}

		texture.repeat.set(repeatX, repeatY);
		texture.offset.set(offsetX, offsetY);
	}

	async function getTexture() {
		const texture = await useLoader(TextureLoader).load(url);
		texture.wrapS = ClampToEdgeWrapping;
		texture.wrapT = ClampToEdgeWrapping;

		const imageAspect: number = texture.image.width / texture.image.height;

		if (!meshGeometry?.height || !meshGeometry?.width) {
			throw new Error("parent's mesh geometry height/width couldn't be calculated");
		}

		adjustTextureScaling(texture, meshGeometry.height / meshGeometry.width, imageAspect);

		return texture;
	}
</script>

{#await getTexture() then texture}
	<T is={material} transparent map={texture} metalness={1} roughness={0.4} {...restProps}></T>
{/await}
