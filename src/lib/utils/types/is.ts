export function isNoNull<T>(v: T | null): v is T {
	return v !== null;
}
