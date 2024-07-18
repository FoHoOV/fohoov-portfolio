import { Quaternion, Spherical, Vector3 } from 'three';

export type SphericalAngles = {
	phi: number;
	theta: number;
};

/**
 * calculates the center of a sphere that touches both pointA and pointB
 * @param pointA - the first point on the surface of the sphere
 * @param pointB - the second point on the surface of the sphere
 * @param radius - the radius of the sphere
 * @param  rotation - the rotation angle around the axis defined by pointA and pointB
 * @returns the center of the sphere
 */
export function calculateSphereCenter(
	pointA: Vector3,
	pointB: Vector3,
	radius: number,
	rotation: number
) {
	const distance = pointA.distanceTo(pointB);
	if (radius < distance / 2) {
		throw new Error(
			`radius must be at least half the distance between pointA and pointB: required min = "${distance / 2}"`
		);
	}

	const midpoint = new Vector3().addVectors(pointA, pointB).multiplyScalar(0.5);
	const perpendicularLength = Math.sqrt(radius * radius - (distance / 2) * (distance / 2));
	const direction = new Vector3().subVectors(pointB, pointA).normalize();

	const up = new Vector3(0, 1, 0);
	let perpendicular = new Vector3().crossVectors(direction, up).normalize();
	if (perpendicular.lengthSq() === 0) {
		perpendicular = new Vector3().crossVectors(direction, new Vector3(1, 0, 0)).normalize();
	}

	const quaternion = new Quaternion().setFromAxisAngle(direction, rotation);
	perpendicular.applyQuaternion(quaternion).multiplyScalar(perpendicularLength);

	const center = new Vector3().addVectors(midpoint, perpendicular);
	return center;
}

/**
 * moves the center by `rotations` in way that still touches `point`
 * @param center - the current center of our sphere
 * @param point - the point that center is rotating around
 * @param  rotation - the theta and phi rotation relative to origin
 * @returns adjusted center
 */
export function moveSphereAroundPoint(
	center: Vector3,
	point: Vector3,
	rotation?: { phi?: number; theta?: number }
) {
	// TODO: uncommenting this change the result even if rotations is null, result will be almost zero, but result will change
	// drastically
	if (!rotation?.phi && !rotation?.theta) {
		return center.clone();
	}
	const relativeCenter = new Spherical().setFromVector3(center.clone().sub(point));

	relativeCenter.phi = rotation?.phi ?? relativeCenter.phi;
	relativeCenter.theta = rotation?.theta ?? relativeCenter.theta;

	const rotatedCenter = new Vector3().setFromSpherical(relativeCenter);
	const adjustedCenter = new Vector3().addVectors(point, rotatedCenter);

	return adjustedCenter;
}

export function calculateSphericalPathBetweenPoints(
	start: Vector3,
	end: Vector3,
	radius: number,
	rotation: number
) {
	const center = calculateSphereCenter(start, end, radius, rotation);

	const sphericalStart = new Spherical().setFromVector3(start.clone().sub(center));
	const sphericalEnd = new Spherical().setFromVector3(end.clone().sub(center));

	const startingPoint: SphericalAngles = { theta: sphericalStart.theta, phi: sphericalStart.phi };
	const endingPoint: SphericalAngles = { theta: sphericalEnd.theta, phi: sphericalEnd.phi };
	const sphericalCurrent = new Spherical(radius, startingPoint.phi, startingPoint.phi);

	return {
		startingPoint: { ...startingPoint },
		endingPoint: { ...endingPoint },
		generatePositionFromSpherical: (phi: number, theta: number) => {
			sphericalCurrent.set(radius, phi, theta);
			return new Vector3().setFromSpherical(sphericalCurrent).add(center);
		},
		center
	};
}

export function calculateSphericalPathForOrbit(
	start: Vector3,
	center: Vector3,
	rotation: { phi?: number; theta?: number; axis?: 'theta' | 'phi' } = { axis: 'theta' },
	direction: '+' | '-' = '+'
) {
	const rotatedCenter = moveSphereAroundPoint(center, start, rotation);
	const sphericalRotatedCenter = new Spherical().setFromVector3(rotatedCenter);

	const relativeStartVector = start.clone().sub(rotatedCenter);
	const sphericalCurrent = new Spherical().setFromVector3(relativeStartVector);

	const startingPoint: SphericalAngles = {
		theta: sphericalCurrent.theta,
		phi: sphericalCurrent.phi
	};
	const endingPoint: SphericalAngles =
		rotation.axis == 'phi'
			? {
					theta: sphericalRotatedCenter.theta,
					phi: startingPoint.phi + Math.PI * 2 * (direction == '-' ? -1 : 1)
				}
			: {
					theta: startingPoint.theta + Math.PI * 2 * (direction == '-' ? -1 : 1),
					phi: sphericalRotatedCenter.phi
				};

	const startingAndEndingDistance: SphericalAngles = {
		theta: endingPoint.theta - startingPoint.theta,
		phi: endingPoint.phi - startingPoint.phi
	};

	const midPoints: SphericalAngles = {
		theta: (startingPoint.theta + endingPoint.theta) / 2,
		phi: (startingPoint.phi + endingPoint.phi) / 2
	};

	return {
		startingPoint: { ...startingPoint },
		endingPoint: { ...endingPoint },
		generatePositionFromSpherical: (phi: number, theta: number) => {
			if (rotation.axis == 'phi') {
				sphericalCurrent.phi = phi;

				const diff = theta - endingPoint.theta;
				if (Math.abs(diff) <= Math.abs(startingAndEndingDistance.theta) / 2) {
					sphericalCurrent.theta = 2 * midPoints.theta - theta;
				} else {
					sphericalCurrent.theta = theta;
				}
			} else {
				sphericalCurrent.theta = theta;

				const diff = phi - endingPoint.phi;
				if (Math.abs(diff) <= Math.abs(startingAndEndingDistance.phi) / 2) {
					sphericalCurrent.phi = 2 * midPoints.phi - phi;
				} else {
					sphericalCurrent.phi = phi;
				}
			}
			return new Vector3().setFromSpherical(sphericalCurrent).add(rotatedCenter);
		}
	};
}
