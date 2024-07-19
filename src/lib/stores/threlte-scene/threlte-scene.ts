import type SkillSet from '$lib/components/threlte/SkillSet.svelte';
import type { Component, ComponentProps } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

export type Scenes = {
	skillSet: SkillSet;
};

export class ThrelteSceneManager {
	#components = new SvelteMap<
		keyof Scenes,
		{
			component: ComponentProps<Component>;
			props: () => ComponentProps<Component>;
			beforeUnmount?: () => Promise<void>;
		}
	>();

	addComponent<TScene extends keyof Scenes>(
		key: TScene,
		component: Scenes[TScene],
		props: () => ComponentProps<Scenes[TScene]>
	) {
		this.#components.set(key, {
			component,
			props
		});
	}

	/**
	 * awaits `beforeUnmount` before unmounting the component.
	 */
	async removeComponent(key: keyof Scenes) {
		const current = this.#components.get(key);
		if (!current) {
			throw new Error(`${key} is not mounted via this store`);
		}

		if (current.beforeUnmount) {
			await current.beforeUnmount();
			this.#components.delete(key);
		} else {
			this.#components.delete(key);
		}
	}

	get components$() {
		return this.#components;
	}
}
