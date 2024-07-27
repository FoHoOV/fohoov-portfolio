import type SkillSet from '$lib/components/threlte/SkillSet.svelte';
import type { ComponentProps } from 'svelte';
import { SvelteMap } from 'svelte/reactivity';

// the reason that we only include the types but don't add the component based on component-name
// is to prevent loading all component as soon as this module loads.
type SceneNameToComponent = {
	skillSet: SkillSet;
};

type Props<TSceneName extends keyof SceneNameToComponent> = {
	component: SceneNameToComponent[TSceneName];
	renderedComponent?: SceneNameToComponent[TSceneName];
	props: () => ComponentProps<SceneNameToComponent[TSceneName]>;
	beforeUnmount?: (component: SceneNameToComponent[TSceneName] | undefined) => Promise<void>;
};

export class ThrelteSceneManager {
	#scenes = new SvelteMap<keyof SceneNameToComponent, Props<keyof SceneNameToComponent>>();

	add<TSceneName extends keyof SceneNameToComponent>(key: TSceneName, props: Props<TSceneName>) {
		this.#scenes.set(key, props);
	}

	/**
	 * awaits `beforeUnmount` before unmounting the component.
	 */
	async remove(key: keyof SceneNameToComponent) {
		const current = this.#scenes.get(key);
		if (!current) {
			throw new Error(`${key} is not mounted via this store`);
		}

		if (current.beforeUnmount) {
			await current.beforeUnmount(current.renderedComponent);
			this.#scenes.delete(key);
		} else {
			this.#scenes.delete(key);
		}
	}

	get scenes$() {
		return this.#scenes.values();
	}
}
