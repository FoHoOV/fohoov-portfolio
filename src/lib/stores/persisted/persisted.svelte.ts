import { StorageTypes } from '$lib';

type PrimitiveStorageTypes = string | number | boolean;
type ObjectStorageTypes = Record<string, unknown>;

type Options<T extends PrimitiveStorageTypes | ObjectStorageTypes> = {
	initializer?: T;
	default?: T;
	storeInCookie?: boolean;
};

class _Persisted {
	/**
	 * stores to localStorage
	 */
	primitive$<T extends PrimitiveStorageTypes>(key: string, options?: Options<T>) {
		const storage = StorageTypes.localStorage.getItem(key);
		let reactiveValue = $state<string>(
			storage ? storage ?? options?.default?.toString() : options?.initializer?.toString() ?? ''
		);

		$effect.root(() => {
			$effect(() => {
				StorageTypes.localStorage.setItem(key, reactiveValue?.toString() ?? '');
			});
		});

		return {
			get current(): string {
				return reactiveValue;
			},
			set current(newValue: T) {
				reactiveValue = newValue?.toString() + '';
			}
		};
	}

	/**
	 * stores to localStorage
	 */
	object$<T extends ObjectStorageTypes>(key: string, options?: Options<T>) {
		const storage = StorageTypes.localStorage.getItem(key);
		const parsed: T = storage ? JSON.parse(storage) : options?.default;
		let reactiveValue = $state<T>(parsed ?? options?.initializer);

		$effect.root(() => {
			$effect(() => {
				StorageTypes.localStorage.setItem(key, JSON.stringify(reactiveValue));
			});
		});

		return {
			get current(): T {
				return reactiveValue;
			},
			set current(newValue: T) {
				reactiveValue = newValue;
			}
		};
	}

	/**
	 * stores to cookie
	 */
	cookie$<T extends ObjectStorageTypes>(key: string, options?: Options<T>) {
		const storage = StorageTypes.cookies.get(key);
		const parsed: T = storage ? JSON.parse(storage) : options?.default;
		let reactiveValue = $state<T>(parsed ?? options?.initializer);

		$effect.root(() => {
			$effect(() => {
				const expirationDate = new Date(Date.now());
				expirationDate.setDate(Date.now() + 100);
				StorageTypes.cookies.set(key, JSON.stringify(reactiveValue), {
					expires: expirationDate,
					path: '/'
				});
			});
		});

		return {
			get current(): T {
				return reactiveValue;
			},
			set current(newValue: T) {
				reactiveValue = newValue;
			}
		};
	}
}

export const persisted = new _Persisted();
