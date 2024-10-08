<script lang="ts" module>
	import { T, useLoader } from '@threlte/core';
	import { onMount } from 'svelte';
	import type { Side, Vector3Like } from 'three';
	import {
		DoubleSide,
		ShapeGeometry,
		MeshBasicMaterial,
		MeshStandardMaterial,
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

	type SvgMaterial = MeshBasicMaterial | MeshStandardMaterial;
	export type SvgMaterialTypes = 'standard' | 'basic';

	export type Props = {
		url: string;
		size?: number | { width: number; height: number };
		position?: Vector3 | Vector3Like;
		drawFillShapes?: boolean;
		drawStrokes?: boolean;
		depthWrite?: boolean;
		fillWireFrameShapes?: boolean;
		strokesWireFrame?: boolean;
		side?: Side;
		debug?: boolean;
		materialType?: SvgMaterialTypes;
	};
</script>

<script lang="ts">
	const {
		url,
		position = new Vector3(0, 0),
		size = 1,
		drawFillShapes = true,
		drawStrokes = false,
		fillWireFrameShapes = false,
		strokesWireFrame = false,
		depthWrite = false,
		side = DoubleSide,
		debug = false,
		materialType = 'basic'
	}: Props = $props();

	const loader = useLoader(SVGLoader);

	// the reason we added a wrapperRef is because everything in groupRef is scaled down/up, so nothing means 1-1 with parent values
	let wrapperRef: Group | undefined = undefined;
	let groupRef: Group | undefined = undefined;

	async function loadSvg(wrapperRef: Group, groupRef: Group): Promise<void> {
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
				addShapesToRef(shapes, material, groupRef, renderOrder);
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

				addStrokesToRef(path.subPaths, path.userData.style, material, groupRef, renderOrder);
				renderOrder += path.subPaths.length;
			}
		}

		setGroupTransforms(groupRef);

		if (debug) {
			wrapperRef.add(new BoxHelper(wrapperRef));
		}
	}

	function setGroupTransforms(ref: Group) {
		const boundingBox = new Box3();
		setGroupScaling(ref, boundingBox.setFromObject(ref));
		setGroupPosition(ref);
		centerGroup(ref, boundingBox.setFromObject(ref));
	}

	function setGroupPosition(ref: Group) {
		// Apply position
		if (position instanceof Vector3) {
			ref.position.copy(position);
		} else {
			ref.position.set(position.x, position.y, position.z);
		}
	}

	function centerGroup(ref: Group, boundingBox: Box3) {
		const size = new Vector3();
		boundingBox.getSize(size);
		ref.position.x -= size.x / 2;
		ref.position.y += size.y / 2;
	}

	function setGroupScaling(ref: Group, boundingBox: Box3) {
		const actualSize = new Vector3();
		boundingBox.getSize(actualSize);

		if (!size) {
			// Default scaling
			ref.scale.set(1, 1, -1);
			return;
		}

		// Determine the scaling factors
		if (typeof size === 'number') {
			// Uniform scaling
			const maxActualSize = Math.max(actualSize.x, actualSize.y);
			const scalingFactor = size / maxActualSize;
			ref.scale.set(scalingFactor, -scalingFactor, scalingFactor);
		} else {
			// Non-uniform scaling
			const scaleX = size.width / actualSize.x;
			const scaleY = size.height / actualSize.y;
			ref.scale.set(scaleX, -scaleY, 1);
		}
	}

	// Helper function to create materials
	function createMaterial(colorStyle: string, opacity: number, wireframe: boolean): SvgMaterial {
		return new (materialType == 'basic' ? MeshBasicMaterial : MeshStandardMaterial)({
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
		material: SvgMaterial,
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
		material: SvgMaterial,
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
		if (!wrapperRef || !groupRef) {
			throw new Error('for some reason refs is not bound yet');
		}

		loadSvg(wrapperRef, groupRef);
	});
</script>

<T.Group bind:ref={wrapperRef}>
	<T.Group bind:ref={groupRef}></T.Group>
</T.Group>
