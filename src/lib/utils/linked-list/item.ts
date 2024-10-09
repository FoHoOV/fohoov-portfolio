export class LinkedListItem<T> {
	value: T;
	next: LinkedListItem<T> | null;

	constructor(value: T, next?: LinkedListItem<T> | null) {
		this.value = value;
		this.next = next ?? null;
	}
}
