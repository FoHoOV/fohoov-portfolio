import { LinkedList } from '$lib';
import { type Vector3Like } from 'three';

export class RandomPosition {
	/**
	 * height, width or depth of cube
	 */
	#cubeHeight: number;
	/**
	 * includes the un-used indexes of this cube
	 */
	#unUsedCells: LinkedList<number>;

	constructor(cubeHeight: number) {
		this.#cubeHeight = cubeHeight;

		this.#unUsedCells = LinkedList.from(this.volume, (index) => {
			return index;
		});
	}

	noOfUsedCells() {
		return this.volume - this.#unUsedCells.length;
	}

	noOfAvailableCells() {
		return this.volume;
	}

	get volume() {
		return Math.pow(this.#cubeHeight, 3);
	}

	/**
	 * @example
	 * for 2x2: (voxel index1 to position):
	 * 1-> 0, 0, 0
	 * 2-> 1, 0 ,0
	 * 3-> 0, 1, 0
	 * 4-> 1, 1, 0
	 * 5-> 0, 0, 1
	 * 6-> 1, 0, 1
	 *
	 * @example
	 * for 3x3: (voxel index1 to position):
	 * 1-> 0, 0, 0
	 * 2-> 1, 0, 0
	 * 3-> 2, 0, 0
	 * 4-> 0, 1, 0
	 *
	 * this is like the number is positions for 2x2 are base2 and for 3x3 base3 and for nxn, baseN
	 * if add N to X then we have to reset to zero and add one to the next column,
	 * for demonstration purposes I used index 1 in here,
	 * but in the code we use index0 so we dont have to add 1 in the end.
	 */
	positionToIndex(voxel: Vector3Like) {
		return (
			voxel.x * Math.pow(this.#cubeHeight, 0) +
			voxel.y * Math.pow(this.#cubeHeight, 1) +
			voxel.z * Math.pow(this.#cubeHeight, 2)
		);
	}

	/**
	 * reverse of @see positionToIndex
	 */
	indexToPosition(index: number): Vector3Like {
		const resultAsString = index.toString(this.#cubeHeight).padStart(3, '0');
		return {
			x: parseInt(resultAsString[2]),
			y: parseInt(resultAsString[1]),
			z: parseInt(resultAsString[0])
		};
	}

	generate(): Vector3Like {
		if (this.#unUsedCells.length == 0) {
			throw new Error('number of empty cells are 0');
		}

		// an unused index that will get mapped to cube index
		const randomIndex = Math.floor(Math.random() * (this.#unUsedCells.length - 1));

		// index mapped to cube index
		const cellIndex = this.#unUsedCells.at(randomIndex).value;

		// same as marking cell as used
		this.#unUsedCells.remove(randomIndex);

		return this.indexToPosition(cellIndex);
	}
}
