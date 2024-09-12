import { isNoNull } from '$lib/utils/types';

export class Bound<T> {
	public readonly toBeBounds: (T | null)[] = $state([]);
	public readonly bounds: T[] = $derived.by(() => {
		return this.toBeBounds.filter((x) => isNoNull(x));
	});
	public readonly length: number;

	constructor(length?: number) {
		this.length = length || 1;
		this.toBeBounds = Array(length).fill(null);
	}
}

export function bound<T>(size?: number) {
	return new Bound<T>(size);
}
