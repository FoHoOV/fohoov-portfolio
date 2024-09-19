import type { ComponentExports } from '$lib/utils';
import type { ComponentProps, Component } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

type Props<TComponent extends Component<any, any>> = {
	component: TComponent;
	exports?: ComponentExports<TComponent>;
	props: () => ComponentProps<TComponent>;
	beforeUnmount?: (exports: ComponentExports<TComponent> | undefined) => Promise<void>;
};

export class ThrelteSceneManager {
	#scenes = new SvelteMap<symbol, Props<Component<any, any>>>();

	add<TComponent extends Component<any, any>>(
		key: symbol,
		props: Omit<Props<TComponent>, 'exports'>
	) {
		this.#scenes.set(key, { exports: undefined, ...props });
	}

	/**
	 * awaits `beforeUnmount` before unmounting the component.
	 */
	async remove(key: symbol) {
		const current = this.#scenes.get(key);
		if (!current) {
			throw new Error(`${key.toString()} is not mounted via this store`);
		}

		if (current.beforeUnmount) {
			await current.beforeUnmount(current.exports);
		}

		this.#scenes.delete(key);
	}

	get scenes$() {
		return this.#scenes;
	}
}
