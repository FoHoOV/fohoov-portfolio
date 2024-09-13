export function isNoNull<T>(v: T | null): v is T {
	return v !== null;
}

export function isNotUndefined<T>(v: T | undefined): v is T {
	return v !== undefined;
}
