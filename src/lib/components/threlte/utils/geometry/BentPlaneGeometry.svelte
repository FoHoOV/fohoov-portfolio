<script lang="ts" module>
	import { Vector2, PlaneGeometry } from 'three';
	import { T, type Props as ThrelteProps } from '@threlte/core';
	import type { BufferAttribute } from 'three';
	import type { Snippet } from 'svelte';

	export type Props = {
		radius: number;
		children?: Snippet;
	} & ThrelteProps<typeof PlaneGeometry>['parameters'];
</script>

<script lang="ts">
	const { radius, children, ...restProps }: Props = $props();

	class BentPlaneGeometry extends PlaneGeometry {
		constructor(radius: number, ...args: ConstructorParameters<typeof PlaneGeometry>) {
			super(...args);

			const parameters = this.parameters;
			const halfWidth = parameters.width * 0.5;

			const leftPoint = new Vector2(-halfWidth, 0);
			const topPoint = new Vector2(0, radius);
			const rightPoint = new Vector2(halfWidth, 0);

			const vectorLeftToTop = new Vector2().subVectors(leftPoint, topPoint);
			const vectorTopToRight = new Vector2().subVectors(topPoint, rightPoint);
			const vectorLeftToRight = new Vector2().subVectors(leftPoint, rightPoint);

			const circumRadius =
				(vectorLeftToTop.length() * vectorTopToRight.length() * vectorLeftToRight.length()) /
				(2 * Math.abs(vectorLeftToTop.cross(vectorLeftToRight)));

			const circleCenter = new Vector2(0, radius - circumRadius);

			const baseVector = new Vector2().subVectors(leftPoint, circleCenter);
			const baseAngle = baseVector.angle() - Math.PI * 0.5;
			const arcAngle = baseAngle * 2;

			const uvAttribute = this.attributes.uv as BufferAttribute;
			const positionAttribute = this.attributes.position as BufferAttribute;

			const transformedPoint = new Vector2();

			for (let i = 0; i < uvAttribute.count; i += 1) {
				const uvRatio = 1 - uvAttribute.getX(i);
				const y = positionAttribute.getY(i);

				transformedPoint.copy(rightPoint).rotateAround(circleCenter, arcAngle * uvRatio);

				positionAttribute.setXYZ(i, transformedPoint.x, y, -transformedPoint.y);
			}

			positionAttribute.needsUpdate = true;
		}
	}
</script>

<T is={BentPlaneGeometry} args={[radius, ...Object.values(restProps)]}>
	{@render children?.()}
</T>
