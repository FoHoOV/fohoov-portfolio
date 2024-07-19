import { getContext, setContext } from '$lib/stores';
import type { ThrelteSceneManager } from './threlte-scene.svelte';

const THRELTE_SCENE_KEY = Symbol();

export function getThrelteSceneManager() {
	return getContext<ThrelteSceneManager>(THRELTE_SCENE_KEY);
}

export function setThrelteSceneManager(store: ThrelteSceneManager, setToRoot: boolean = true) {
	return setContext(store, THRELTE_SCENE_KEY, setToRoot);
}
