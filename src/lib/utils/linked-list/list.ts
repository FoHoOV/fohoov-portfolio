import { LinkedListItem } from '$lib/utils/linked-list/item';

export class LinkedList<T> implements Iterable<T> {
	#start: LinkedListItem<T> | null = null;
	#length: number = 0;

	static from<T>(size: number, generator: (index: number, linkedList: LinkedList<T>) => T) {
		if (size === 0) {
			throw new Error('size should be bigger than 0 when using this function');
		}

		const linkedList = new LinkedList<T>();
		let addedItem = linkedList.add(generator(0, linkedList));
		for (let i = 1; i < size; i++) {
			const item = new LinkedListItem(generator(i, linkedList));
			addedItem.next = item;
			addedItem = item;
			linkedList.#length += 1;
		}

		return linkedList;
	}

	/**
	 * @return the newly created item
	 */
	add(value: T) {
		const item = new LinkedListItem(value, null);
		if (!this.#start) {
			this.#start = item;
			this.#length += 1;
			return item;
		}

		let current = this.#start;
		while (true) {
			if (!current?.next) {
				break;
			}
			current = current.next;
		}
		current.next = item;
		this.#length += 1;
		return item;
	}

	remove(index: number) {
		if (index >= this.#length) {
			throw new Error(`index out of range: size = ${this.#length}`);
		}

		if (index == 0) {
			this.#start = this.#start?.next ?? null;
			this.#length -= 1;
			return;
		}

		const beforeIndex = this.at(index - 1);
		const atIndex = beforeIndex.next!;
		const afterIndex = atIndex?.next;

		beforeIndex.next = afterIndex;
		this.#length -= 1;
	}

	at(index: number) {
		if (index >= this.#length) {
			throw new Error(`index out of range: size = ${this.#length}`);
		}

		let result = this.#start!;
		for (let i = 0; i < index; i++) {
			result = result!.next!;
		}

		return result!;
	}

	[Symbol.iterator](): Iterator<T> {
		let current = this.#start;

		return {
			next: () => {
				const value = current?.value;
				current = current?.next ?? null;
				return { value: value as T, done: current === null };
			}
		};
	}

	includes(value: T) {
		for (const v of this) {
			if (v === value) {
				return true;
			}
		}
		return false;
	}

	get length() {
		return this.#length;
	}
}
