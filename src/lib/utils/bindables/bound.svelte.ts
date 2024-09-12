import { isNoNull } from '$lib/utils/types';

export class Bounds<T> {
	public readonly toBeBounds = $state<(T | null)[]>([]);
	public readonly bounds = $derived.by<T[]>(() => {
		return this.toBeBounds.filter((x) => isNoNull(x));
	});
	public readonly length: number;

	constructor(length?: number) {
		this.length = length || 1;
		this.toBeBounds = Array(length).fill(null);
	}
}

export function bounds<T>(size: number) {
	return new Bounds<T>(size);
}
