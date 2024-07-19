import type SkillSet from '$lib/components/threlte/SkillSet.svelte';
import type { ComponentProps } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

type SceneNameToComponent = {
	skillSet: SkillSet;
};

type Props<TSceneName extends keyof SceneNameToComponent> = {
	component: SceneNameToComponent[TSceneName];
	props: () => ComponentProps<SceneNameToComponent[TSceneName]>;
	beforeUnmount?: (component: SceneNameToComponent[TSceneName]) => Promise<void>;
};

export class ThrelteSceneManager {
	#scenes = new SvelteMap<keyof SceneNameToComponent, Props<keyof SceneNameToComponent>>();

	addComponent<TSceneName extends keyof SceneNameToComponent>(
		key: TSceneName,
		{ component, props, beforeUnmount }: Props<TSceneName>
	) {
		this.#scenes.set(key, {
			component: component,
			props,
			beforeUnmount
		});
	}

	/**
	 * awaits `beforeUnmount` before unmounting the component.
	 */
	async removeComponent(key: keyof SceneNameToComponent) {
		const current = this.#scenes.get(key);
		if (!current) {
			throw new Error(`${key} is not mounted via this store`);
		}

		if (current.beforeUnmount) {
			// TODO: this is not he rendered component instance (somehow get it from svelte:component?)
			await current.beforeUnmount(current.component);
			this.#scenes.delete(key);
		} else {
			this.#scenes.delete(key);
		}
	}

	get scenes$() {
		return this.#scenes.values();
	}
}
