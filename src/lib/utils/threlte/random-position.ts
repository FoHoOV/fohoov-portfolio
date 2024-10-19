import { LinkedList } from '$lib';
import { Vector3, type Vector3Like } from 'three';

export class RandomPosition {
	/**
	 * the matrix size (cubic matrix like n*n)
	 */
	#matrixSize: number;
	/**
	 * includes the un-used indexes of this cube
	 */
	#unUsedCells: LinkedList<number>;

	/**
	 * each items height
	 */
	readonly #itemBoxSize: number;

	/**
	 * if has a value, will use positions in this array first,
	 * then starts generating random positions
	 */
	#forcedUseCells: number[] = [];

	constructor(cubeHeight: number, itemBoxSize: number) {
		this.#matrixSize = cubeHeight;

		this.#unUsedCells = LinkedList.from(this.volume, (index) => {
			return index;
		});

		this.#itemBoxSize = itemBoxSize;
	}

	noOfUsedCells() {
		return this.volume - this.#unUsedCells.length;
	}

	noOfTotalCells() {
		return this.volume;
	}

	addForcedUseCell(index: number) {
		if (!this.#unUsedCells.includes(index)) {
			throw new Error(`position=${index} is already used`);
		}
		this.#forcedUseCells.push(index);
		return this;
	}

	get volume() {
		return Math.pow(this.#matrixSize, 3);
	}

	/**
	 * @example
	 * for 2x2: (voxel index1 to position):
	 * 1-> 0, 0, 0
	 * 2-> 1, 0, 0
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
	 *
	 */
	positionToIndex(voxel: Vector3Like) {
		return (
			voxel.x * Math.pow(this.#matrixSize, 0) +
			voxel.y * Math.pow(this.#matrixSize, 1) +
			voxel.z * Math.pow(this.#matrixSize, 2)
		);
	}

	/**
	 * reverse of @see positionToIndex
	 */
	indexToPosition(index: number): Vector3Like {
		const resultAsString = index.toString(this.#matrixSize).padStart(3, '0');
		return {
			x: parseInt(resultAsString[2]),
			y: parseInt(resultAsString[1]),
			z: parseInt(resultAsString[0])
		};
	}

	/**
	 * generate a random position while considering the itemBoxSize
	 */
	generate(): Vector3 {
		if (this.#unUsedCells.length == 0) {
			throw new Error('number of empty cells are 0');
		}

		// an unused index that will get mapped to cube index
		const randomIndex =
			this.#forcedUseCells.shift() ?? Math.floor(Math.random() * (this.#unUsedCells.length - 1));

		// index mapped to cube index
		const cellIndex = this.#unUsedCells.at(randomIndex).value;

		// same as marking cell as used
		this.#unUsedCells.remove(randomIndex);

		const position = this.indexToPosition(cellIndex);
		return new Vector3(position.x, position.y, position.z).multiplyScalar(this.#itemBoxSize);
	}

	get maxDistance() {
		return this.#matrixSize * this.#itemBoxSize;
	}
}
