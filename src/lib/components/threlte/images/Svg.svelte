<script lang="ts" module>
	import { T, useLoader } from '@threlte/core';
	import { onMount } from 'svelte';
	import type { Side, Vector3Like } from 'three';
	import {
		DoubleSide,
		ShapeGeometry,
		MeshBasicMaterial,
		Color,
		Vector3,
		Group,
		Mesh,
		Shape,
		Path,
		BoxHelper,
		Box3
	} from 'three';
	import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';

	export type Props = {
		url: string;
		scalingFactor?: number;
		position?: Vector3 | Vector3Like;
		drawFillShapes?: boolean;
		drawStrokes?: boolean;
		depthWrite?: boolean;
		fillWireFrameShapes?: boolean;
		strokesWireFrame?: boolean;
		side?: Side;
		debug?: boolean;
	};
</script>

<script lang="ts">
	const {
		url,
		position = new Vector3(0, 0),
		scalingFactor = 0.05,
		drawFillShapes = true,
		drawStrokes = false,
		fillWireFrameShapes = false,
		strokesWireFrame = false,
		depthWrite = false,
		side = DoubleSide,
		debug = false
	}: Props = $props();

	const loader = useLoader(SVGLoader);

	let groupRef: Group | undefined = undefined;

	async function loadSvg(ref: Group): Promise<void> {
		const data = await loader.load(url);
		let renderOrder = 0;

		// Iterate over paths in the loaded SVG data
		for (const path of data.paths) {
			if (!path.userData) continue; // Skip if userData is not present

			// Handle fill shapes
			const fillColor = path.userData.style.fill;
			if (drawFillShapes && fillColor && fillColor !== 'none') {
				const material = createMaterial(
					fillColor,
					path.userData.style.fillOpacity,
					fillWireFrameShapes
				);
				const shapes = SVGLoader.createShapes(path);
				addShapesToRef(shapes, material, ref, renderOrder);
				renderOrder += shapes.length;
			}

			// Handle stroke shapes
			const strokeColor = path.userData.style.stroke;
			if (drawStrokes && strokeColor && strokeColor !== 'none') {
				const material = createMaterial(
					strokeColor,
					path.userData.style.strokeOpacity,
					strokesWireFrame
				);

				addStrokesToRef(path.subPaths, path.userData.style, material, ref, renderOrder);
				renderOrder += path.subPaths.length;
			}
		}

		setGroupPosition(ref);
		setGroupScaling(ref);

		if (debug) {
			ref.add(new BoxHelper(ref));
		}
	}

	function setGroupPosition(ref: Group) {
		// Handle position, ensuring compatibility with both Vector3 and object positions
		if (position instanceof Vector3) {
			ref.position.copy(position);
		} else {
			ref.position.set(position.x, position.y, position.z);
		}
		const helper = new Box3().setFromObject(ref);
		const size = new Vector3();
		helper.getSize(size);

		ref.position.x -= (size.x * scalingFactor) / 2;
		ref.position.y += (size.y * scalingFactor) / 2;
	}

	function setGroupScaling(ref: Group) {
		ref.scale.multiplyScalar(scalingFactor);
		ref.scale.y *= -1;
	}

	// Helper function to create materials
	function createMaterial(
		colorStyle: string,
		opacity: number,
		wireframe: boolean
	): MeshBasicMaterial {
		return new MeshBasicMaterial({
			color: new Color().setStyle(colorStyle),
			opacity: opacity,
			transparent: true,
			side: side,
			depthWrite: depthWrite,
			wireframe: wireframe
		});
	}

	// Helper function to add shapes to the reference object
	function addShapesToRef(
		shapes: Shape[],
		material: MeshBasicMaterial,
		ref: Group,
		renderOrder: number
	): void {
		for (const shape of shapes) {
			const geometry = new ShapeGeometry(shape);
			const mesh = new Mesh(geometry, material);
			mesh.renderOrder = renderOrder++;
			ref.add(mesh);
		}
	}

	// Helper function to add strokes to the reference object
	function addStrokesToRef(
		subPaths: Path[],
		style: any,
		material: MeshBasicMaterial,
		ref: Group,
		renderOrder: number
	): void {
		for (const subPath of subPaths) {
			const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), style);
			const mesh = new Mesh(geometry, material);
			mesh.renderOrder = renderOrder++;
			ref.add(mesh);
		}
	}

	onMount(() => {
		if (!groupRef) {
			throw new Error('for some reason groupRef is not bound yet');
		}

		loadSvg(groupRef);
	});
</script>

<T.Group bind:ref={groupRef}></T.Group>
