// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
	x: infer R
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
) => any
	? R
	: never;
