import { isNotUndefined } from '$lib/utils/types';

export class Bounds<T> {
	public readonly toBeBounds = $state<(T | undefined)[]>([]);
	public readonly bounds = $derived.by<T[]>(() => {
		return this.toBeBounds.filter((x) => isNotUndefined(x));
	});
	public readonly length: number;

	constructor(length: number) {
		this.length = length || 1;
		this.toBeBounds = Array(length).fill(undefined);
	}
}

export function bounds<T>(length: number) {
	return new Bounds<T>(length);
}
