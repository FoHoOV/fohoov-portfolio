import { useTask } from '@threlte/core';
import type { Object3D } from 'three';

export type Options = {
	/**
	 * calls `lookAt` only if condition is true
	 */
	condition?: () => boolean;
};

export function lookAt(ref: Object3D, target: Object3D, options?: Options) {
	useTask(() => {
		if (!options?.condition?.()) {
			return;
		}
		ref.lookAt(target.position);
	});
}
