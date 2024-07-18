import { useTask, useThrelte } from '@threlte/core';
import { CubeCamera, CubeTexture, RGBAFormat, WebGLCubeRenderTarget, type Mesh } from 'three';

/**
 * only use inside component life-cycle
 */
export function generateReflectionTexture(ref: Mesh) {
	let texture: CubeTexture | undefined = $state(undefined);
	const { renderer, scene } = useThrelte();
	const renderTarget = new WebGLCubeRenderTarget(256, {
		format: RGBAFormat
	});
	const cubeCamera = new CubeCamera(0.1, 100, renderTarget);

	useTask(() => {
		ref.visible = false;
		cubeCamera.position.copy(ref.position);
		cubeCamera.update(renderer, scene);
		ref.visible = true;
		texture = renderTarget.texture;
	});

	return {
		get texture() {
			return texture;
		}
	};
}
